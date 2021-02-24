import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormState } from '../state/form.state';
import { combineLatest, Observable, of } from 'rxjs';
import { selectCurrentFeature, selectFeatures } from '../state/form.selectors';
import { catchError, concatMap, map, take, tap } from 'rxjs/operators';
import { FeatureInitializerService } from '../../shared/feature-initializer/feature-initializer.service';
import { WorkflowHelper } from '../../workflow/workflows/workflow.helper';
import * as wellknown from 'wellknown';
import { GeometryConfirmService } from '../../user-interface/geometry-confirm-buttons/geometry-confirm.service';
import { VectorLayer } from '../../../../../bridge/typings';
import { GeoJSONGeometry } from 'wellknown';
import { Feature, FeatureControllerService, Geometry } from '../../shared/generated';
import { TailorMapService } from '../../../../../bridge/src/tailor-map.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EditFeatureGeometryService {

  private readonly drawingVectorLayer: VectorLayer;

  constructor(
    private store$: Store<FormState>,
    private featureInitializerService: FeatureInitializerService,
    private featureControllerService: FeatureControllerService,
    private geometryConfirmService: GeometryConfirmService,
    private tailorMapService: TailorMapService,
    private snackbar: MatSnackBar,
  ) {
    this.drawingVectorLayer = this.tailorMapService.getViewerController().createVectorLayer('EditFeatureGeometryService');
  }

  public updateCurrentFeatureGeometry$(): Observable<GeoJSONGeometry | Geometry | null> {
    this.clearDrawing();
    return this.store$.select(selectCurrentFeature)
      .pipe(
        take(1),
        concatMap(feature => this.updateGeometry$(feature)),
        concatMap(accepted => {
          if (!accepted) {
            return of(null);
          }
          return this.saveUpdatedGeometry$()
        }),
        tap(() => {
          this.clearDrawing();
        }),
      );
  }

  private updateGeometry$(feature: Feature): Observable<boolean> {
    const geom = this.featureInitializerService.retrieveGeometry(feature);
    if (!geom) {
      return of(null);
    }
    this.drawingVectorLayer.readGeoJSON(geom);
    return this.geometryConfirmService.open$(WorkflowHelper.findTopRight(geom));
  }

  private saveUpdatedGeometry$(): Observable<GeoJSONGeometry | Geometry | null> {
    return combineLatest([
      this.store$.select(selectCurrentFeature),
      this.store$.select(selectFeatures),
    ])
      .pipe(
        take(1),
        concatMap(([ feature, allFeatures ]) => {
          const geomField = this.featureInitializerService.retrieveGeometryField(feature);
          if (!geomField) {
            return of(null);
          }
          const wkt = this.drawingVectorLayer.getActiveFeature().config.wktgeom;
          const updatedGeom = wellknown.parse(wkt);
          const updatedFeature: Feature = {
            ...feature,
            [geomField]: updatedGeom,
          };
          const parentId = allFeatures[0] ? allFeatures[0].objectGuid : null;
          return this.featureControllerService.save({ parentId, body: updatedFeature })
            .pipe(
              map(() => updatedGeom),
              catchError(() => {
                this.snackbar.open('Opslaan van geometrie is mislukt, probeer opnieuw');
                return of(null);
              }),
            );
        }),
      );
  }

  private clearDrawing() {
    this.geometryConfirmService.hide();
    this.drawingVectorLayer.removeAllFeatures();
    this.tailorMapService.getViewerController().mapComponent.getMap().update();
  }

}
