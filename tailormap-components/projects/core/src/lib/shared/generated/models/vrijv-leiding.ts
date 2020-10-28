/* tslint:disable */
import { Feature } from './feature';
import { Geometry } from './geometry';
export interface VrijvLeiding extends Feature {
  aanlegjaar?: number;
  aant_ie_bedrijven?: number;
  aant_ie_recreatie?: number;
  aantal_aansl_woningen?: number;
  aantal_buizen?: number;
  afbeelding?: string;
  afvoer_dwa?: number;
  afvoer_rwa?: number;
  afwijkendedieptelegging?: number;
  baa_deformatie?: number;
  bab_scheur?: number;
  bac_breuk_instorting?: number;
  bad_defect_metselwerk?: number;
  bae_ontbrekend_metslspecie?: number;
  baf_oppervlakteschade?: number;
  bag_instekende_inlaat?: number;
  bah_defect_aansluiting?: number;
  bai_indring_afdichtingsmat?: number;
  bai_indring_afdichtingsring?: number;
  bai_indring_ander_afdichting?: number;
  baj_axiaal?: number;
  baj_hoekverdraaiing?: number;
  baj_radiaal?: number;
  baj_verpl_verbinding?: number;
  bak_defect_lining?: number;
  bal_defect_reparatie?: number;
  bam_lasfouten?: number;
  ban_poreuze_buis?: number;
  bba_wortels?: number;
  bbb_aangeh_afzettingen?: number;
  bbc_bezonken_afzettingen?: number;
  bbd_binnendringen_grond?: number;
  bbe_andere_obstakels?: number;
  bbf_infiltratie?: number;
  bbv?: string;
  bdd_waterpeil?: number;
  begin_tijd?: string;
  beheercluster?: string;
  beheerder?: string;
  beheerder_vakgeb?: string;
  bemalingsgebied?: string;
  berging?: number;
  bestek?: string;
  bestek_nr?: string;
  bob_begin_actueel?: number;
  bob_begin_ontwerp?: number;
  bob_eind_actueel?: number;
  bob_eind_ontwerp?: number;
  bovenliggende_verharding?: string;
  breedte?: number;
  buislengte?: number;
  buistype?: string;
  buisverbinding?: string;
  buisvorm?: string;
  buurt?: string;
  capaciteit_spoelvoorz?: number;
  categorie?: string;
  datum_bob_begin?: string;
  datum_bob_eind?: string;
  detailverwijzing?: string;
  diameter?: number;
  domein?: string;
  drainagetype?: string;
  eind_tijd?: string;
  eisvoorzorgsmaatregel?: string;
  fid?: number;
  functie_vrijv_leiding?: string;
  funderingstype?: string;
  gemeente?: string;
  geometrie?: Geometry;
  geonauwkeurigheidxy?: number;
  geotextiel_inf_deel?: string;
  grondeigendom?: string;
  grondsoort?: string;
  grondwaterstand?: string;
  hoofdcategorie?: string;
  hoogte?: number;
  id?: number;
  imgeo_id?: string;
  infiltratieriooltype?: string;
  inspectie_bestand?: string;
  inspectiecode?: string;
  inspectiedatum?: string;
  inspectiejaar?: string;
  inspectienaam?: string;
  inspectietechniek?: string;
  kast_id?: string;
  kl_link?: string;
  knoopnummer_beginput?: number;
  knoopnummer_eindput?: number;
  lengte?: number;
  leverancier_fabrikant?: string;
  materiaal_gwsw?: string;
  materiaal_inf_deel?: string;
  materiaal_leiding?: string;
  materiaal_rioolleiding?: string;
  object_begin_tijd?: string;
  object_eind_tijd?: string;
  object_guid?: string;
  onderhoudjaar?: number;
  ontgravingsmethode?: string;
  ontv_toelaatbaar_peilst?: number;
  ontv_waterpeil?: number;
  ontw_doorl_grond?: number;
  ontw_hgt_grondwaterstand?: number;
  ontw_oppervlak?: number;
  openbare_ruimte?: string;
  oppervlak_gesloten_wegen?: number;
  oppervlak_groen?: number;
  oppervlak_open_wegen?: number;
  oppervlak_plat_dak?: number;
  oppervlak_schuin_dak?: number;
  orig_id?: number;
  product_leiding?: string;
  rayon?: string;
  reg_begin?: string;
  reg_eind?: string;
  revisietekening?: string;
  riool_drainage?: string;
  sleuf_breedte?: number;
  sleuf_inhoud?: number;
  soort_locatie?: string;
  spiegelverhang_dwa?: number;
  spiegelverhang_rwa?: number;
  status?: string;
  status_functioneren?: string;
  std_beheercluster?: string;
  std_beheerder_vakgeb?: string;
  std_buistype?: string;
  std_buisverbinding?: string;
  std_domein?: string;
  std_drainagetype?: string;
  std_funderingstype?: string;
  std_grondsoort?: string;
  std_infiltratieriooltype?: string;
  std_materiaal_rioolleiding?: string;
  std_stelseltype?: string;
  std_strengtype?: string;
  std_structuurelement?: string;
  stelsel_id?: string;
  stelseltype?: string;
  strategisch?: string;
  strengcode?: string;
  strengtype?: string;
  stroomgebied?: string;
  structuurelement?: string;
  subcategorie?: string;
  sw_gebied_id?: string;
  tekening?: string;
  toegankelijk?: string;
  toelichting?: string;
  type_leiding?: string;
  verbindingstype?: string;
  verharding_wegdek?: string;
  verhoogd_risico?: string;
  verloren_berging?: number;
  vervuilingsgraad?: number;
  video_bestand?: string;
  video_bestand_map?: string;
  video_inspectie_bestand?: string;
  vorm?: string;
  vrijverval_leidingsubtype?: string;
  vrijverval_leidingtype?: string;
  wanddikte?: number;
  wandruwheid?: number;
  wandruwheid_bb?: number;
  wandruwheid_bo?: number;
  wijk?: string;
  wion_thema?: string;
  woonplaats?: string;
  x62_aant_aansl_inwoner?: number;
  x62_bouwjaar_pomp?: number;
  x62_cluster_aard?: string;
  x62_dikte_lining?: number;
  x62_funderingstype_gwsw?: string;
  x62_ledigingspomp_id?: string;
  x62_materiaal_lining?: string;
  x62_pomptype?: string;
  x62_soort_lining?: string;
  x62_spoeltype?: string;
  x62_std_categorie?: string;
  x62_std_hoofdcategorie?: string;
  x62_std_pomptype?: string;
  x62_std_rayon?: string;
  x62_std_spoeltype?: string;
  x62_std_subcategorie?: string;
  x62_stroomsnelheid_dwa?: number;
  x62_stroomsnelheid_rwa?: number;
  x62_telemetrie?: string;
  x62_uniek_nummer?: number;
  x62_video_inspectie_bestanden?: string;
  x62_waterpeil?: number;
}
