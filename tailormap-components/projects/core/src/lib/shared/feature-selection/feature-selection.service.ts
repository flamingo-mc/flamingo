import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Feature, FeatureControllerService } from '../generated';
import { MapClickedEvent } from '../models/event-models';
import { Observable, of, Subject } from 'rxjs';
import { selectFormConfigFeatureTypeNames, selectFormConfigs } from '../../application/state/application.selectors';
import { concatMap, map, take } from 'rxjs/operators';
import { ApplicationService } from '../../application/services/application.service';
import { APPLICATION_SERVICE } from '@tailormap/models';
import { FeatureSelectionComponent } from './feature-selection.component';
import { MatDialog } from '@angular/material/dialog';
import { LayerUtils } from '../layer-utils/layer-utils.service';

@Injectable({
  providedIn: 'root',
})
export class FeatureSelectionService implements OnDestroy {

  private destroyed = new Subject();
  private featureSelectionPopupOpen = false;

  constructor(
    private store$: Store,
    private dialog: MatDialog,
    private layerUtils: LayerUtils,
    @Inject(APPLICATION_SERVICE) private applicationService: ApplicationService,
    private featureControllerService: FeatureControllerService,
  ) {}

  public ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public selectFeatureForClick$(
    data: MapClickedEvent,
    useSelectedLayerFilter?: boolean,
    allowedFeatureTypes?: string[],
  ): Observable<Feature | null> {
    const x = data.x;
    const y = data.y;
    const scale = data.scale;

    return this.store$.select(selectFormConfigFeatureTypeNames)
      .pipe(
        take(1),
        concatMap(allFeatureTypes => {
          const featureTypes: string[] = this.layerUtils.getFeatureTypesAllowed(allFeatureTypes, useSelectedLayerFilter);
          const filteredFeatureTypes = allowedFeatureTypes
            ? featureTypes.filter(f => allowedFeatureTypes.includes(f))
            : featureTypes;
          return this.featureControllerService.featuretypeOnPoint({
            application: this.applicationService.getApplicationId(),
            featureTypes: filteredFeatureTypes,
            x,
            y,
            scale,
          });
        }),
        concatMap((features: Feature[]) => {
          let selectedFeature$ = of(null);
          if (features && features.length > 1) {
            selectedFeature$ = this.featureSelection$(features);
          }
          else if (features && features.length === 1) {
            selectedFeature$ = of(features[0]);
          }
          this.featureSelectionPopupOpen = false;
          return selectedFeature$;
        }),
      );
  }

  private featureSelection$(features: Feature[]): Observable<Feature | null> {
    if (this.featureSelectionPopupOpen) {
      return of(null);
    }
    this.featureSelectionPopupOpen = true;
    return this.store$.select(selectFormConfigs)
      .pipe(
        take(1),
        concatMap(formConfigs => {
          return FeatureSelectionComponent.openFeatureSelectionPopup(this.dialog, features, formConfigs)
            .afterClosed()
            .pipe(map(selectedFeature => selectedFeature || null));
        }),
      );
  }

}
