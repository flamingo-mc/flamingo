/**
 * GBI Form REST API
 * \"REST API for GBI Forms\"
 *
 * OpenAPI spec version: 1.0.0
 * Contact: meinetoonen@b3partners.nl
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Pageable } from './pageable';
import { Sort } from './sort';
import { Wegvakonderdeel } from './wegvakonderdeel';

export interface PageWegvakonderdeel { 
    number?: number;
    size?: number;
    last?: boolean;
    numberOfElements?: number;
    totalPages?: number;
    pageable?: Pageable;
    sort?: Sort;
    content?: Array<Wegvakonderdeel>;
    first?: boolean;
    totalElements?: number;
    empty?: boolean;
}