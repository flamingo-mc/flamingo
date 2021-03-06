import { AnalysisState } from '../analysis.state';
import { CreateLayerModeEnum } from '../../models/create-layer-mode.enum';
import { CriteriaTypeEnum } from '../../models/criteria-type.enum';
import { CriteriaOperatorEnum } from '../../models/criteria-operator.enum';
import { AttributeTypeEnum } from '../../../application/models/attribute-type.enum';
import { ScopedUserLayerStyleModel } from '../../models/scoped-user-layer-style.model';

export const analysisStateTestData: AnalysisState = {
  createLayerMode: CreateLayerModeEnum.ATTRIBUTES,
  selectDataSource: false,
  selectedDataSource: {
    layerId: 9,
    featureType: 302,
    label: 'gb_wegvakonderdeel',
    geometryAttribute: 'geometrie',
    geometryType: AttributeTypeEnum.GEOMETRY_LINESTRING,
  },
  createCriteriaMode: null,
  criteria: {
    type: CriteriaTypeEnum.SIMPLE,
    operator: CriteriaOperatorEnum.AND,
    groups: [
      {
        id: 'criteria-group-1',
        operator: CriteriaOperatorEnum.AND,
        criteria: [
          {
            id: 'criteria-1',
            source: 302,
            attribute: 'aanlegjaar',
            attributeType: AttributeTypeEnum.NUMBER,
            condition: '=',
            value: '2000',
          },
        ],
      },
    ],
  },
  layerName: 'test laag 2000',
};

export const analysisStateTestDataWithCreatedLayer: AnalysisState = {
  createLayerMode: CreateLayerModeEnum.ATTRIBUTES,
  selectDataSource: false,
  selectedDataSource: {
    layerId: 57,
    featureType: 55,
    label: 'gb_boom',
    geometryAttribute: 'geometrie',
    geometryType: AttributeTypeEnum.GEOMETRY,
  },
  layerName: 'Bomen uit 2010',
  createCriteriaMode: null,
  criteria: {
    type: CriteriaTypeEnum.SIMPLE,
    operator: CriteriaOperatorEnum.AND,
    groups: [
      {
        id: 'criteria-group-1',
        operator: CriteriaOperatorEnum.AND,
        criteria: [
          {
            id: 'criteria-1',
            source: 55,
            attribute: 'aanlegjaar',
            attributeType: AttributeTypeEnum.NUMBER,
            condition: '=',
            value: '2010',
          },
        ],
      },
    ],
  },
  styles: [{
    id: 'style-test-1',
    label: 'gb_boom',
    active: true,
    fillOpacity: 62,
    fillColor: 'rgb(255, 105, 105)',
    strokeColor: 'rgb(255, 105, 105)',
    strokeOpacity: 100,
    strokeWidth: 2,
    marker: 'star',
    markerSize: 8,
    markerFillColor: 'rgb(57, 73, 171)',
    markerStrokeColor: 'rgb(30, 30, 30)',
  }],
  isCreatingLayer: false,
  createLayerErrorMessage: '',
  createdAppLayer: '69',
};

export const analysisStateTestDataWithThematicSelection: AnalysisState = {
  createLayerMode: CreateLayerModeEnum.THEMATIC,
  selectDataSource: false,
  selectedDataSource: {
    layerId: 57,
    featureType: 55,
    label: 'gb_boom',
    geometryAttribute: 'geometrie',
    geometryType: AttributeTypeEnum.GEOMETRY_POINT,
  },
  layerName: 'Bomen uit 2010',
  isCreatingLayer: false,
  createLayerErrorMessage: '',
  selectedThematicAttribute: {
    filterable: false,
    longname: 'gb_wegvakonderdeel.structuurelement',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    folder_label: '',
    visible: true,
    editable: false,
    defaultValue: '',
    selectable: false,
    disallowNullValue: false,
    type: 'string',
    disableUserEdit: false,
    allowValueListOnly: false,
    editHeight: '',
    automaticValue: false,
    valueList: 'static',
    name: 'structuurelement',
    featureType: 302,
    editAlias: '',
    id: 1151,
    passportAlias: 'structuurelement',
  },
  loadingStyles: false,
  loadStylesErrorMessage: '',
  styles: [
    {
      id: 'style-1',
      label: 'Bedrijventerreinen',
      active: true,
      fillOpacity: 100,
      fillColor: 'rgb(255, 105, 105)',
      strokeColor: 'rgb(255, 105, 105)',
      strokeOpacity: 100,
      strokeWidth: 2,
      marker: 'circle',
      markerSize: 8,
      markerFillColor: 'rgb(255, 105, 105)',
      markerStrokeColor: 'rgb(30, 30, 30)',
      value: 'Bedrijventerreinen',
      attribute: 'structuurelement',
      attributeType: 'STRING',
    },
    {
      id: 'style-2',
      label: 'Buitengebied',
      active: true,
      fillOpacity: 100,
      fillColor: 'rgb(255, 105, 105)',
      strokeColor: 'rgb(255, 105, 105)',
      strokeOpacity: 100,
      strokeWidth: 2,
      marker: 'circle',
      markerSize: 8,
      markerFillColor: 'rgb(255, 105, 105)',
      markerStrokeColor: 'rgb(30, 30, 30)',
      value: 'Buitengebied',
      attribute: 'structuurelement',
      attributeType: 'STRING',
    },
    {
      id: 'style-3',
      label: 'Buitenranden',
      active: true,
      fillOpacity: 100,
      fillColor: 'rgb(255, 105, 105)',
      strokeColor: 'rgb(255, 105, 105)',
      strokeOpacity: 100,
      strokeWidth: 2,
      marker: 'circle',
      markerSize: 8,
      markerFillColor: 'rgb(255, 105, 105)',
      markerStrokeColor: 'rgb(30, 30, 30)',
      value: 'Buitenranden',
      attribute: 'structuurelement',
      attributeType: 'STRING',
    },
    {
      id: 'style-4',
      label: 'Centrum',
      active: true,
      fillOpacity: 100,
      fillColor: 'rgb(255, 105, 105)',
      strokeColor: 'rgb(255, 105, 105)',
      strokeOpacity: 100,
      strokeWidth: 2,
      marker: 'circle',
      markerSize: 8,
      markerFillColor: 'rgb(255, 105, 105)',
      markerStrokeColor: 'rgb(30, 30, 30)',
      value: 'Centrum',
      attribute: 'structuurelement',
      attributeType: 'STRING',
    },
    {
      id: 'style-5',
      label: 'Hoofdwegen',
      active: true,
      fillOpacity: 100,
      fillColor: 'rgb(255, 105, 105)',
      strokeColor: 'rgb(255, 105, 105)',
      strokeOpacity: 100,
      strokeWidth: 2,
      marker: 'circle',
      markerSize: 8,
      markerFillColor: 'rgb(255, 105, 105)',
      markerStrokeColor: 'rgb(30, 30, 30)',
      value: 'Hoofdwegen',
      attribute: 'structuurelement',
      attributeType: 'STRING',
    },
    {
      id: 'style-6',
      label: 'Woonwijken',
      active: true,
      fillOpacity: 100,
      fillColor: 'rgb(255, 105, 105)',
      strokeColor: 'rgb(255, 105, 105)',
      strokeOpacity: 100,
      strokeWidth: 2,
      marker: 'circle',
      markerSize: 8,
      markerFillColor: 'rgb(255, 105, 105)',
      markerStrokeColor: 'rgb(30, 30, 30)',
      value: 'Woonwijken',
      attribute: 'structuurelement',
      attributeType: 'STRING',
    },
  ] as ScopedUserLayerStyleModel[],
};
