import { AttributeListTabModel } from '../models/attribute-list-tab.model';
import { AttributeListFeatureTypeData } from '../models/attribute-list-feature-type-data.model';
import { AttributeTypeHelper } from '../../../application/helpers/attribute-type.helper';
import { AttributeTypeEnum } from '../../../shared/models/attribute-type.enum';
import { AttributeFilterHelper } from '../../../shared/helpers/attribute-filter.helper';

export class AttributeListFilterHelper {

  public static getFilter(
    tab: AttributeListTabModel,
    featureType: number,
    tabFeatureData: AttributeListFeatureTypeData[],
    extraLayerFilters?: string,
  ): string {
    const filters = new Map<number, string>();
    tabFeatureData.forEach(data => {
      const query = data.filter.map(filter => AttributeFilterHelper.convertFilterToQuery(filter)).join(' AND ');
      if (query !== '') {
        filters.set(data.featureType, query);
      }
    });
    const isRelatedFeature = tab.featureType !== featureType;
    const mainFeatureData = tabFeatureData.find(data => data.featureType === tab.featureType);
    return AttributeListFilterHelper.getQueryForFeatureType(
      tab,
      featureType,
      filters,
      isRelatedFeature,
      mainFeatureData,
      extraLayerFilters,
    );
  }

  private static getQueryForFeatureType(
    tab: AttributeListTabModel,
    featureType: number,
    filters: Map<number, string>,
    isRelatedFeature: boolean,
    mainFeatureData: AttributeListFeatureTypeData,
    extraLayerFilters?: string,
  ) {
    const featureFilter: string[] = tab.relatedFeatures.map<string>(relation => {
      if (relation.foreignFeatureType === featureType) {
        return '';
      }
      const relationFilter = filters.get(relation.foreignFeatureType);
      if (relationFilter) {
        const filter = `RELATED_FEATURE(${tab.featureType},${relation.foreignFeatureType},(${relationFilter}))`;
        if (isRelatedFeature) {
          return `RELATED_FEATURE(${featureType},${tab.featureType},(${filter}))`;
        }
        return filter;
      }
      return '';
    });
    if (filters.has(featureType)) {
      featureFilter.push(filters.get(featureType));
    }
    if (isRelatedFeature && filters.has(tab.featureType)) {
      featureFilter.push(`RELATED_FEATURE(${featureType},${tab.featureType},(${filters.get(tab.featureType)}))`);
    }
    if (isRelatedFeature && extraLayerFilters) {
      featureFilter.push(`RELATED_FEATURE(${featureType},${tab.featureType},(${extraLayerFilters})`);
    }
    if (!isRelatedFeature && extraLayerFilters) {
      featureFilter.push(extraLayerFilters);
    }
    if (isRelatedFeature && mainFeatureData.checkedFeatures.length > 0) {
      const checkedRowsFilter = AttributeListFilterHelper.getQueryForCheckedRows(tab, featureType, mainFeatureData);
      if (checkedRowsFilter) {
        featureFilter.push(checkedRowsFilter);
      }
    }
    return featureFilter.filter(f => !!f).join(' AND ');
  }

  private static getQueryForCheckedRows(
    tab: AttributeListTabModel,
    featureType: number,
    mainFeatureData: AttributeListFeatureTypeData,
  ) {
    const currentRelation = tab.relatedFeatures.find(r => r.foreignFeatureType === featureType);
    const selectedRowsFilter = [];
    if (currentRelation) {
      currentRelation.relationKeys.forEach(relation => {
        const checkedFeatureKeys = new Set<string>();
        mainFeatureData.checkedFeatures.forEach(checkedFeature => {
          if (checkedFeature[relation.leftSideName]) {
            checkedFeatureKeys.add(AttributeTypeHelper.getExpression(`${checkedFeature[relation.leftSideName]}`, AttributeTypeEnum.STRING));
          }
        });
        if (checkedFeatureKeys.size !== 0) {
          selectedRowsFilter.push(`${relation.rightSideName} IN (${Array.from(checkedFeatureKeys).join(',')})`);
        }
      });
    }
    if (selectedRowsFilter.length === 0) {
      return '';
    }
    return `(${selectedRowsFilter.join(' AND ')})`;
  }

}
