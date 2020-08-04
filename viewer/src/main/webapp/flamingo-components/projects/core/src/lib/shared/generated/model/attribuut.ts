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
import { Domein } from './domein';

export interface Attribuut { 
    muteerbaar?: boolean;
    object_naam?: string;
    tabel_naam?: string;
    kolom_naam?: string;
    id?: number;
    domein?: Domein;
    naam?: string;
}