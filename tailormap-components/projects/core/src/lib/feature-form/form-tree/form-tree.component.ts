import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormTreeMetadata } from './form-tree-models';
import { Feature } from '../../shared/generated';
import { FormTreeHelpers } from './form-tree-helpers';
import { Store } from '@ngrx/store';
import { FormState } from '../state/form.state';
import * as FormActions from '../state/form.actions';
import { selectFeatures } from '../state/form.selectors';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { TreeService } from '../../shared/tree/tree.service';
import { TreeModel } from '../../shared/tree/models/tree.model';
import { TransientTreeHelper } from '../../shared/tree/helpers/transient-tree.helper';
import { selectFormConfigs } from '../../application/state/application.selectors';

@Component({
  providers: [TreeService],
  selector: 'tailormap-form-tree',
  templateUrl: './form-tree.component.html',
  styleUrls: ['./form-tree.component.css'],
})
export class FormTreeComponent implements OnInit, OnChanges, OnDestroy {

  private destroyed = new Subject();

  @Input()
  public isCopy = false;

  private selectedFeature: Feature;

  @Input()
  public set feature (feature: Feature) {
    if (feature && this.transientTreeHelper) {
      this.transientTreeHelper.selectNode(feature.objectGuid);
    }
    this.selectedFeature = feature;
  }

  @Output()
  public relatedFeatureChecked: EventEmitter<Map<string, boolean>> = new EventEmitter();

  @Input()
  public featuresToCopy = [];

  @Input()
  public hasCheckboxes = false;

  @Input()
  public isBulk = false;
  private transientTreeHelper: TransientTreeHelper<FormTreeMetadata>;

  constructor(
    private store$: Store<FormState>,
    private treeService: TreeService) {
    this.treeService.selectionStateChangedSource$.pipe(
      takeUntil(this.destroyed),
      map(nodeId => this.treeService.getNode(nodeId)),
      filter(node => !node.metadata.isFeatureType),
    ).subscribe(node => {
      this.store$.dispatch(FormActions.setFeature({feature: node.metadata.feature}));
    });
  }

  public ngOnInit() {
    this.transientTreeHelper = new TransientTreeHelper(
      this.treeService,
      true,
      node => {
        return !node.metadata.isFeatureType && this.selectedFeature.objectGuid === node.metadata.objectGuid;
      },
      this.hasCheckboxes,
    );

    combineLatest([
      this.store$.select(selectFeatures),
      this.store$.select(selectFormConfigs),
    ])
      .pipe(
        takeUntil(this.destroyed),
        filter(([ features, formConfigs]) => !!features && features.length > 0 && !!formConfigs),
      )
      .subscribe(([ features, formConfigs]) => {
        const tree: TreeModel<FormTreeMetadata> [] = FormTreeHelpers.convertFeatureToTreeModel(features, formConfigs);
        this.transientTreeHelper.createTree(tree);
        if (this.selectedFeature) {
          this.transientTreeHelper.selectNode(this.selectedFeature.objectGuid);
        }
      });

    this.treeService.checkStateChangedSource$.pipe(takeUntil(this.destroyed)).subscribe( event => {
      const relIds = new Map<string, boolean>();
      event.forEach((checked, id) => {
        const node = this.treeService.getNode(id);
        if (node.metadata.feature) {
          relIds.set(node.metadata.feature.objectGuid, checked);
        }
      });
      this.relatedFeatureChecked.emit(relIds);
    });
  }

  public ngOnDestroy() {
    this.transientTreeHelper.destroy();
    this.destroyed.next();
    this.destroyed.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public closePanel() {
    this.store$.dispatch(FormActions.setTreeOpen({treeOpen: false}));
  }
}
