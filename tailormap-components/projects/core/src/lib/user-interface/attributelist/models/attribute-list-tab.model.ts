import { AttributeListColumnModel } from './attribute-list-column-models';
import { RowData } from '../attributelist-common/attributelist-models';
import { RelatedFeatureType } from '../../../shared/attribute-service/attribute-models';
import { AttributeListFilterModel } from './attribute-list-filter.model';

export interface AttributeListTabModel {
  layerId: string;
  layerAlias: string;
  layerName: string;
  loadingData: boolean;
  loadingError?: string;
  columns: AttributeListColumnModel[];
  relatedFeatures: RelatedFeatureType[];
  // leftSideRelations: string[];
  // rightSideRelations: string[];
  filter: AttributeListFilterModel[];
  rows: RowData[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  sortedColumn?: string;
  sortDirection: 'ASC' | 'DESC';
}
