import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import {
  MatSort,
  Sort,
} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AttributelistTable,
  RowClickData,
  RowData,
} from '../attributelist-common/attributelist-models';
import { AttributeDataSource } from '../attributelist-common/attributelist-datasource';
import { AttributelistFilter } from '../attributelist-common/attributelist-filter';
import { AttributelistTableOptionsFormComponent } from '../attributelist-table-options-form/attributelist-table-options-form.component';
import { AttributelistService } from '../attributelist.service';
import { AttributelistStatistic } from '../attributelist-common/attributelist-statistic';
import { AttributeService } from '../../../shared/attribute-service/attribute.service';
import { CheckState } from '../attributelist-common/attributelist-enums';
import { Feature } from '../../../shared/generated';
import { FormconfigRepositoryService } from '../../../shared/formconfig-repository/formconfig-repository.service';
import { LayerService } from '../layer.service';
import { StatisticTypeInMenu } from '../attributelist-common/attributelist-statistic-models';
import { StatisticService } from '../../../shared/statistic-service/statistic.service';
import { StatisticType } from '../../../shared/statistic-service/statistic-models';
import { ValueService } from '../../../shared/value-service/value.service';
import { TailorMapService } from '../../../../../../bridge/src/tailor-map.service';
import { HighlightService } from '../../../shared/highlight-service/highlight.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { AttributelistColumn } from '../attributelist-common/attributelist-column-models';
import { Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import { fromArray } from 'rxjs/internal/observable/fromArray';
import { AttributelistTreeComponent } from '../attributelist-tree/attributelist-tree.component';
import { AttributelistNode, SelectedTreeData, TreeDialogData } from '../attributelist-tree/attributelist-tree-models';
import { AttributelistColumnController } from '../attributelist-common/attributelist-column-controller';
import { FormComponent } from '../../../feature-form/form/form.component';
// import { LiteralMapKey } from '@angular/compiler';

@Component({
  selector: 'tailormap-attributelist-table',
  templateUrl: './attributelist-table.component.html',
  styleUrls: ['./attributelist-table.component.css'],
  animations: [
    trigger('onDetailsExpand', [
      state('void', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
      state('*', style({height: '*', visibility: 'visible'})),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AttributelistTableComponent implements AttributelistTable, OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;

  // Table reference for 'manually' rendering.
  @ViewChild('table') public table: MatTable<any>;

  @ViewChild(MatMenuTrigger)
  private statisticsMenu: MatMenuTrigger;

  @Output()
  public pageChange = new EventEmitter();

  @Output()
  public rowClick = new EventEmitter<RowClickData>();

  @Output()
  public tabChange = new EventEmitter();

  public columnController: AttributelistColumnController;

  public dataSource = new AttributeDataSource(this.layerService,
                                              this.attributeService,
                                              this.tailorMapService,
                                              this.formconfigRepoService);
  public checkedRows = [];
  public treeData: AttributelistNode[] = [];

  private selectedTreeData: SelectedTreeData;

  private filterMap = new Map<number, AttributelistFilter>();

  private isRelatedRefresh = false;

  private rowsChecked = false;

  public statistic = new AttributelistStatistic(
    this.statisticsService,
    this.dataSource,
    );

  // Number of checked rows.
  public nrChecked = 0;

  // State of checked rows ('All','None','Some').
  public checkState = CheckState.None;

  private tabIndex = -1;

  /**
   * Declare enums to use in template
   */
  public eStatisticType = StatisticType;
  public eStatisticTypeInMenu = StatisticTypeInMenu;

  public keys = Object.keys;

  public values = Object.values;

  public contextMenuPosition = { x: '0px', y: '0px' };

  private destroyed = new Subject();

  // private standardFormWorkflow = new StandardFormWorkflow();

  constructor(private attributeService: AttributeService,
              private layerService: LayerService,
              private statisticsService: StatisticService,
              private tailorMapService: TailorMapService,
              private valueService: ValueService,
              public attributelistService: AttributelistService,
              private formconfigRepoService: FormconfigRepositoryService,
              private highlightService: HighlightService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    // console.log('=============================');
    // console.log('#Table - constructor');
  }

  public ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public ngOnInit(): void {
    this.attributelistService.selectedTreeData$.pipe(takeUntil(this.destroyed)).subscribe(selectedTreeData => {
      if (!selectedTreeData.isChild) {
        this.dataSource.params.featureTypeId = -1;
        this.dataSource.params.featureTypeName = '';
        this.dataSource.params.featureFilter = '';
        this.dataSource.params.valueFilter = '';
      } else {
        this.dataSource.params.featureTypeId = selectedTreeData.params.featureType;
        this.dataSource.params.featureFilter = selectedTreeData.params.filter;
        this.dataSource.params.featureTypeName = selectedTreeData.name;
      }
      this.selectedTreeData = selectedTreeData;
      this.isRelatedRefresh = false;
      this.dataSource.loadTableData(this, selectedTreeData);
    });
  }

  public ngAfterViewInit(): void {
    // console.log('#Table - ngAfterViewInit');

    // Set datasource paginator.
    this.dataSource.paginator = this.paginator;
    // Set datasource sort.
    this.dataSource.sorter = this.sort;

    // Prevent ExpressionChangedAfterItHasBeenCheckedErrors using setTimeout
    // maybe loadData and paginator settings in ngOnInit would be better
    setTimeout(() => {
      // console.log('#Table - ngAfterViewInit - paginator settings');

      // Hide the paginator pagesize combo.
      this.paginator.hidePageSize = true;

      // Init the paginator with the startup page index.
      this.paginator.pageIndex = 0;
    }, 0)
  }

  public onAfterLoadData(): void {
    // console.log('#Table - onAfterLoadData');

    // Update paginator total number of rows (needed!)
    this.paginator.length = this.dataSource.totalNrOfRows;

    // Update the table rows.
    this.table.renderRows();

    this.filterMap.get(this.dataSource.params.featureTypeId).initFiltering(this.getColumnNames());

    this.statistic.initStatistics(this.getColumnNames());
    if (this.isRelatedRefresh) {
      if (this.rowsChecked) {
        this.dataSource.setAllRowsChecked();
      }
      this.onObjectOptionsClick();
    }
    this.updateCheckedInfo();

    // FOR TESTING. SHOW TABLE OPTIONS FORM AT STARTUP.
    // this.onTableOptionsClick(null);
  }

  public getActiveColumns(includeSpecial: boolean): AttributelistColumn[] {
    return this.dataSource.columnController.getActiveColumns(includeSpecial);
  }

  /**
   * Return the column names. Include special column names.
   */
  public getColumnNames(): string[] {
    const colNames = this.dataSource.columnController.getVisibleColumnNames(true);
    // console.log(colNames);
    return colNames;
  }

  /**
   * Returns numeric when statistic functions like min, max, average are possible
   */
  public getStatisticFunctionColumnType(name: string): string {
    return this.statistic.getStatisticFunctionColumnType(name);
  }

  public getColumnWidth(name: string): string {
    // console.log('#Table - getColumnWidth - ' + name);
    return '180px';
  }

  /**
   * Returns if the bar with the button should be visible.
   */
  public getFooterBarVisible(): string {
    if (this.nrChecked === 0) {
      return 'none';
    } else {
      return 'block';
    }
  }

  /**
   * Fired when the checkbox in the header is clicked.
   */
  public onHeaderCheckClick(): void {
    const currCheckState = this.checkState;
    if (currCheckState === CheckState.All) {
      this.dataSource.checkNone();
    } else {
      this.dataSource.checkAll();
    }
    // Update check info.
    this.updateCheckedInfo();
  }

  public onObjectOptionsClick(): void {
    this.treeData = [];
    this.dataSource.getCheckedRowsAsFeatures();
    const filterForFeatureTypes = new Map<number, string>();
    let filter = '';
    const relatedFeatures = [];
    let checkedFeatures = this.dataSource.getCheckedRowsAsAttributeListFeature();
    checkedFeatures.forEach((row) => {
      const related = row.related_featuretypes;
      related.forEach((r) => {
        if (filterForFeatureTypes.has(r.id)) {
          filter = filterForFeatureTypes.get(r.id);
          const value = r.filter.split('=')[1].split(' ')[1];
          filterForFeatureTypes.set(r.id, filter += ', ' + value );
        } else {
          const column = r.filter.split('=')[0].split(' ')[0];
          const value = r.filter.split('=')[1].split(' ')[1];
          filterForFeatureTypes.set(r.id, column + ' IN (' + value);
          relatedFeatures.push(r);
        }
      });
    });
    filterForFeatureTypes.forEach((value, key) => {
      filterForFeatureTypes.set(key, value + ')');
    });

    const layer = this.layerService.getLayerByTabIndex(this.tabIndex);
    if (layer.name === '') {
      return;
    }
    // Set params layer name and id.
    this.dataSource.params.layerName = layer.name;
    this.dataSource.params.layerId = layer.id;
    let numberOfFeatures = this.dataSource.getNrChecked();
    if (this.dataSource.getNrChecked() > 0 ) {
      this.rowsChecked = true;
    } else {
      this.rowsChecked = false;
    }
    if (checkedFeatures.length <= 0) {
      numberOfFeatures = this.dataSource.totalNrOfRows;
      checkedFeatures = this.dataSource.getfirstRowAsAttributeListFeature();
      checkedFeatures[0].related_featuretypes.forEach((rel) => {
        relatedFeatures.push(rel);
      })
    }

    this.treeData.push({
      name: layer.alias ? layer.alias : layer.name,
      numberOfFeatures,
      features: checkedFeatures,
      params: {
        application: this.layerService.getAppId(),
        appLayer: layer.id},
      isChild: false,
      columnNames: this.dataSource.columnController.getPassPortColumnsAsColumns(),
      children: [],
    });
    fromArray(relatedFeatures).pipe(concatMap(feature => {
      this.dataSource.params.valueFilter = this.filterMap.get(feature.id).getValueFilter();
      this.dataSource.params.featureTypeId = feature.id;
      this.dataSource.params.featureTypeName = feature.foreignFeatureTypeName;
      this.dataSource.params.featureFilter = filterForFeatureTypes.get(feature.id);
      return this.dataSource.loadDataForAttributeTree$();
    })).subscribe({
      next: (result) => {
        this.setTreeData(result);
      },
      complete: () => {
        this.dataSource.params.featureTypeId = -1;
        this.dataSource.params.featureTypeName = '';
        this.dataSource.params.featureFilter = '';
        if (this.isRelatedRefresh) {
          this.isRelatedRefresh = false;
          this.attributelistService.updateTreeData(this.treeData);
          if (this.selectedTreeData.isChild) {
            if (this.treeData[0].children.length > 0) {
              this.treeData[0].children.forEach((data) => {
                if (data.params.featureType === this.selectedTreeData.params.featureType) {
                  this.selectedTreeData = {
                    features: data.features,
                    params: data.params,
                    isChild: data.isChild,
                    name: data.name,
                    columnNames: data.columnNames,
                    numberOfFeatures: data.numberOfFeatures,
                  }
                }
              });
            } else {
              this.selectedTreeData = null;
            }
          } else {
            this.selectedTreeData = {
              features: this.treeData[0].features,
              params: this.treeData[0].params,
              isChild: this.treeData[0].isChild,
              name: this.treeData[0].name,
              columnNames: this.treeData[0].columnNames,
              numberOfFeatures: this.treeData[0].numberOfFeatures,
            }
          }
          this.attributelistService.setSelectedTreeData(this.selectedTreeData);
        } else {
          this.openDialog();
        }
      },
    })
  }

  public setTreeData(values: AttributelistNode) {
    this.treeData[0].children.push(values);
  }

  public openDialog() {
    const dialogData : TreeDialogData = {
      rowsChecked: this.nrChecked,
      tree: this.treeData,
    };
    const dialogRef = this.dialog.open(AttributelistTreeComponent, {
      width: '400px',
      data: dialogData,
      position: {
        right: '50px',
      },
      hasBackdrop: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.params.featureTypeId = -1;
      this.dataSource.params.featureTypeName = '';
      this.dataSource.params.featureFilter = '';
      this.dataSource.params.valueFilter = '';
      this.dataSource.columnController = new AttributelistColumnController();
      this.initFilterMap();
      this.refreshTable();
    });
    dialogRef.afterOpened().subscribe( result => {
      // this.isAttributeTreeOpen = true;
    });
  }

  public afterEditing(optionFeatures: Feature[]): void {
    this.dataSource.setCheckedRows(optionFeatures);
    this.updateTable();
  }

  public onPageChange(event): void {
    // console.log('#Table - onPageChange');

    // Fire page change event.
    this.pageChange.emit();

    // Clear highligthing.
    this.highlightService.clearHighlight();

    // Update the table.
    this.updateTable();
  }

  /**
   * Fired when a checkbox is clicked.
   */
  public onRowCheckClick(row: RowData): void {
    // console.log('#Table - onRowCheckClick');
    // console.log(row);
    // Toggle the checkbox in the checked row.
    this.dataSource.toggleChecked(row);
    // Update check info.
    this.updateCheckedInfo();
  }

  /**
   * Fired when a expand/collapse icon/char is clicked.
   */
  public onRowExpandClick(row: RowData): void {
    // console.log('#Table - onRowExpandClick');
    // console.log(row);
    if (row.hasOwnProperty('_detailsRow')) {
      // Toggle the expanded/collapsed state of the row.
      row._detailsRow.toggle();
    }
  }

  /**
   * Fired when a row is clicked.
   */
  public onRowClick(row: RowData): void {
    // console.log('#Table - onRowClicked');
    // console.log(row);

    // OM TE TESTEN!!!
    // if (row.__fid.indexOf('.2')>=0) {
    //   row.__fid = '';
    // }

    // Get zoomto buffer size.
    const zoomToBuffer = this.attributelistService.config.zoomToBuffer;

    // Highlight and zoom to clicked feature.
    const appLayer = this.layerService.getLayerByTabIndex(this.tabIndex);
    this.highlightService.highlightFeature(row.__fid, appLayer.id, true, zoomToBuffer);
  }

  /**
   * Fired when a column header is clicked.
   */
  public onSortClick(sort: Sort): void {
    // Reset the paginator page index.
    this.paginator.pageIndex = 0;
    // Update the table.
    this.updateTable();
  }

  /**
   * Fired when a column filter is clicked.
   */
  public onFilterClick(columnName: string): void {
    // this.dataSource.columnController.columnNamesToColumns()
    this.filterMap.get(this.dataSource.params.featureTypeId).setFilter(this, columnName);
  }

  public onClearFilter() {
    this.filterMap.get(this.dataSource.params.featureTypeId).clearFilter(this);
  }

  /**
   * After setting filter(s) refresh the table
   */
  public refreshTable(): void {
    if (this.dataSource.params.hasDetail()) {
      if (this.dataSource.params.valueFilter) {
        let filter = 'RELATED_LAYER(' +
          this.dataSource.params.layerId + ',' +
          this.dataSource.params.featureTypeId + ',(' +
          this.dataSource.params.valueFilter;
        if (this.dataSource.params.featureFilter) {
          filter += ' AND ' +
            this.dataSource.params.featureFilter + '))';
        } else {
          filter += '))';
        }
        this.filterMap.get(-1).setRelatedFilter(filter);
      }
      this.dataSource.params.featureTypeId = -1;
      this.dataSource.params.featureTypeName = '';
      this.dataSource.params.featureFilter = '';
      if (this.filterMap.get(-1).getRelatedFilter()) {
        this.dataSource.params.valueFilter = this.filterMap.get(-1).getRelatedFilter();
        if (this.filterMap.get(-1).getValueFilter()) {
          this.dataSource.params.valueFilter += 'AND ' + this.filterMap.get(-1).getValueFilter();
        }
      }
      this.dataSource.columnController.setPassportColumnNames(this.treeData[0].columnNames);
      this.isRelatedRefresh = true;
    } else {
      this.isRelatedRefresh = false;
    }
    this.paginator.pageIndex = 0;
    this.updateTable();
    this.setFilterInAppLayer();
    this.statistic.refreshStatistics(this.dataSource.params.layerId, this.dataSource.params.valueFilter);
  }

  private setFilterInAppLayer() {
    const viewerController = this.tailorMapService.getViewerController();
    const appLayer = viewerController.getAppLayerById(this.filterMap.get(this.dataSource.params.featureTypeId).layerFilterValues.layerId);
    const cql = this.dataSource.params.valueFilter;
    viewerController.setFilterString(cql, appLayer, 'ngattributelist');
  }

  /**
   * Check if a filter is active on a column
   */
  public getIsFilterActive(columnName): boolean {
    if (this.filterMap.size <= 0) {
      return false;
    }
    const colObject = this.filterMap.get(this.dataSource.params.featureTypeId).layerFilterValues.columns.find(c => c.name === columnName);
    let result: boolean;
    if (colObject) {
      result = colObject.status;
    } else {
      result = false;
    }
    return result;
  }

  /**
   * Fired when a cell on footer row is clicked.
   */
  public onStatisticsMenu(event: MouseEvent, colName: string) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.statisticsMenu.menuData = { colName };
    this.statisticsMenu.menu.focusFirstItem('mouse');
    this.statisticsMenu.openMenu()
  }

  public onStatisticsMenuClick(colName: string, statisticType: StatisticType) {
    this.statistic.setStatistics(colName, statisticType, this.dataSource.params.layerId, this.dataSource.params.valueFilter);
  }

  public getStatisticTypeInMenu(colName: string): string {
    return this.statistic.getStatisticTypeInMenu(colName);
  }

  public getStatisticResult(colName: string): string {
    return this.statistic.getStatisticResult(colName);
  }

  public isStatisticsProcessing(colName: string): boolean {
    return this.statistic.isStatisticsProcessing(colName);
  }

  public onStatisticsHelp(): void {
    this.snackBar.open('Open contextmenu in de betreffende kolom voor statistiche functies', 'Sluiten', {
      duration: 5000,
    });
    return;
  }
  /**
   * Shows a popup to set visible columns.
   */
  public onTableOptionsClick(evt: MouseEvent): void {

    // Get the target for setting the dialog position.
    let target = null;
    if (evt !== null) {
      target = new ElementRef(evt.currentTarget);
    }

    // Create and set the dialog config.
    const config = new MatDialogConfig();

    // Show transparent backdrop, click outside dialog for closing.
    config.backdropClass = 'cdk-overlay-backdrop';

    // Possible additional settings:
    //     config.hasBackdrop = false;     // Don't show a gray mask.
    //     config.maxHeight = '100px';
    //     config.height = '300px';
    //     config.panelClass = 'attributelist-table-options-form';

    config.data = {
      trigger: target,
      columnController: this.dataSource.columnController,
    };
    const dialogRef = this.dialog.open(AttributelistTableOptionsFormComponent, config);
    dialogRef.afterClosed().subscribe(value => {
      // Collapse all rows.
      this.dataSource.resetExpanded();
    });
  }

  public onTest(): void {
    // console.log('#Table.onTest');
    // this.table.renderRows();

    // // Get passport field/column names.
    // console.log(this.formconfigRepoService.getAllFormConfigs());
    // const passportName = 'wegvakonderdeel';
    // this.formconfigRepoService.formConfigs$.subscribe(formConfigs => {
    //     const formConfig = formConfigs.config[passportName];
    //     console.log(formConfig);
    //   },
    //   ()=>{},
    //   ()=> {
    //     console.log('onTest - complete');
    // });
  }

  public setTabIndex(tabIndex: number): void {
    // console.log('#Table - setTabIndex');
    // Set corresponding tab index.
    this.tabIndex = tabIndex;
    // console.log('table.comp setTabIndex: ' + this.tabIndex)
    // Get layer.
    const layer = this.layerService.getLayerByTabIndex(this.tabIndex);
    // console.log('table.comp layername: ' + layer.name)
    // console.log(layer);
    if (layer.name === '') {
      return;
    }
    // Set params layer name and id.
    this.dataSource.params.layerName = layer.name;
    this.dataSource.params.layerId = layer.id;
    // Update table.
    this.initFilterMap();
    this.updateTable();
  }

  private updateCheckedInfo(): void {
    // Update the number checked.
    this.nrChecked = this.dataSource.getNrChecked();
    // Update the check state.
    this.checkState = this.dataSource.getCheckState(this.nrChecked);
  }

  private updateTable(): void {
    // (Re)load data. Fires the onAfterLoadData method.
    this.dataSource.loadData(this);
    this.columnController = this.dataSource.columnController;
    // Update check info (number checked/check state).
    this.updateCheckedInfo();
  }

  public initFilterMap(): void {
    this.dataSource.getMetaData$().subscribe((response) => {
      this.setFilterMap(-1);
      response.relations.forEach((rel) => {
        this.setFilterMap(rel.foreignFeatureType);
      });
    });
  }

  public setFilterMap(featureTypeId: number) {
    this.filterMap.set(featureTypeId, new AttributelistFilter(
      this.dataSource,
      this.valueService,
      this.dialog,
    ));
  }

  public openPassportDialog(): void {
    const formFeatures = this.dataSource.getCheckedRowsAsFeatures();
    if (formFeatures.length <= 0) {
      this.snackBar.open('Er zijn geen features geselecteerd', '', {
        duration: 5000,
      });
      return;
    }
    const dialogRef = this.dialog.open(FormComponent, {
      width: '1050px',
      height: '800px',
      disableClose: true,
      data: {
        formFeatures,
        isBulk: formFeatures.length > 1,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
    });
  }
}
