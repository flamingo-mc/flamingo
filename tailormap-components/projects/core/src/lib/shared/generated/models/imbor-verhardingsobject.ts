/* tslint:disable */
/* eslint-disable */
import { Feature } from './feature';
import { Geometry } from './geometry';
export interface ImborVerhardingsobject extends Feature {
  aangemaaktdoor?: string;
  aanleghoogte?: number;
  aanofvrijliggend?: string;
  aanschafprijs?: number;
  aantaldeklagen?: number;
  aantalonderlagen?: number;
  aantaltussenlagen?: number;
  afmeting?: string;
  begingarantieperiode?: string;
  beheergebied?: string;
  beheervak_id?: string;
  belasting?: string;
  bergendvermogen?: number;
  bgt_functie?: string;
  bgt_opmerking?: string;
  bgt_status?: string;
  bgt_type?: string;
  bgtfysiekvoorkomen?: string;
  bor_functie?: string;
  bor_fysiekvoorkomen?: string;
  bor_type?: string;
  breedte?: number;
  bronhouder?: string;
  buurt?: string;
  conditiescore?: string;
  conversieid?: string;
  dikteconstructie?: number;
  draagkrachtig?: boolean;
  eindegarantieperiode?: string;
  eindregistratie?: string;
  formaat?: string;
  gebiedstype?: string;
  gebruiksfunctie?: string;
  geluidsreducerend?: boolean;
  gemeente?: string;
  gemengdebestrating?: string;
  geometrie?: Geometry;
  gewijzigddoor?: string;
  grondsoort?: string;
  grondsoortplus?: string;
  id?: number;
  imborIdentificatie?: string;
  imgeo_identificatie?: string;
  imgeofysiekvoorkomen?: string;
  inonderzoek?: boolean;
  inwinning?: string;
  jaarconserveren?: number;
  jaaruitgevoerdonderhoud?: number;
  jaarvanaanleg?: number;
  kleur?: string;
  kwaliteitsniveauactueel?: string;
  kwaliteitsniveaugewenst?: string;
  legverband?: string;
  lengte?: number;
  lengtekunstgras?: number;
  lengtevoegen?: number;
  levensduur?: number;
  lv_publicatiedatum?: string;
  materiaal?: string;
  maximalevalhoogte?: number;
  memo?: string;
  modaliteit?: string;
  mutatiedatum?: string;
  objectbegintijd?: string;
  objecteindtijd?: string;
  objectnummer?: string;
  omtrek?: number;
  ondergrondcode?: string;
  onderhoudsplichtige?: string;
  openbareruimte?: string;
  opleverdatum?: string;
  oppervlakte?: number;
  optalud?: boolean;
  plaatsorientatie?: string;
  plus_functie?: string;
  plus_type?: string;
  postcode?: string;
  praktischeindjaar?: number;
  relatievehoogteligging?: number;
  rijstrook?: string;
  soortvoeg?: string;
  stadsdeelofkern?: string;
  status?: string;
  taludsteilte?: string;
  technischelevensduur?: number;
  theoretischeindjaar?: number;
  tijdstipregistratie?: string;
  type?: string;
  typebeheerder?: string;
  typebeheerderplus?: string;
  typeconstructie?: string;
  typeeigenaar?: string;
  typeeigenaarplus?: string;
  typefundering?: string;
  typeligging?: string;
  typeplus?: string;
  typeplus2?: string;
  typerijstrook?: string;
  typevoeg?: string;
  typevoegvulling?: string;
  vegen?: string;
  verhoogdeligging?: boolean;
  verwijderdatum?: string;
  vulmateriaalkunstgras?: string;
  waterdoorlatendheid?: string;
  waterschap?: string;
  wegas?: string;
  wegcategoriedv?: string;
  wegcategoriedvplus?: string;
  wegfunctie?: string;
  wegnummer?: string;
  wegtypebestaand?: string;
  wegvak?: string;
  wegvaknummer?: string;
  wijk?: string;
  woonplaats?: string;
  zettingsgevoeligheid?: string;
  zettingsgevoeligheidplus?: string;
}
