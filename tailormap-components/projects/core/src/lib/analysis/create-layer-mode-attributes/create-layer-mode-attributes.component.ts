import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnalysisState } from '../state/analysis.state';
import {
  selectCriteria, selectIsCreatingCriteria, selectIsSelectingDataSource, selectSelectedDataSource,
} from '../state/analysis.selectors';
import { map, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { AnalysisSourceModel } from '../models/analysis-source.model';
import { CriteriaModel } from '../models/criteria.model';
import { CriteriaHelper } from '../criteria/helpers/criteria.helper';
import { showCriteriaForm } from '../state/analysis.actions';
import { CriteriaTypeEnum } from '../models/criteria-type.enum';

@Component({
  selector: 'tailormap-create-layer-mode-attributes',
  templateUrl: './create-layer-mode-attributes.component.html',
  styleUrls: ['./create-layer-mode-attributes.component.css'],
})
export class CreateLayerModeAttributesComponent implements OnInit, OnDestroy {

  private destroyed = new Subject();

  public selectedDataSource: AnalysisSourceModel;
  public criteria: CriteriaModel;
  public criteriaMode = CriteriaTypeEnum;
  public creatingCriteria$: Observable<boolean>;
  public hasActiveSidePanel$: Observable<boolean>;

  constructor(
    private store$: Store<AnalysisState>,
  ) { }

  public ngOnInit(): void {
    this.store$.select(selectSelectedDataSource).pipe(takeUntil(this.destroyed)).subscribe(selectedDataSource => {
      this.selectedDataSource = selectedDataSource;
    });
    this.store$.select(selectCriteria).pipe(takeUntil(this.destroyed)).subscribe(criteria => {
      this.criteria = criteria;
    });
    this.creatingCriteria$ = this.store$.select(selectIsCreatingCriteria);
    this.hasActiveSidePanel$ = combineLatest([ this.store$.select(selectIsSelectingDataSource), this.creatingCriteria$ ])
      .pipe(map(([ selectingSource, creatingCriteria ]) => selectingSource || creatingCriteria));
  }

  public ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public setCriteria(mode: CriteriaTypeEnum) {
    this.store$.dispatch(showCriteriaForm({ criteriaMode: mode }));
  }

  public hasCriteria() {
    return !!this.criteria && CriteriaHelper.validGroups(this.criteria.groups);
  }

  public editCriteria() {
    this.store$.dispatch(showCriteriaForm({ criteriaMode: this.criteria.type }));
  }

}
