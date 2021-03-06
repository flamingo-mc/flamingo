import { UserLayerStyleModel } from './user-layer-style.model';
import { AttributeTypeEnum } from '../../shared/models/attribute-type.enum';

export interface ScopedUserLayerStyleModel extends UserLayerStyleModel {
  attribute: string;
  attributeType: AttributeTypeEnum;
  value: string;
}
