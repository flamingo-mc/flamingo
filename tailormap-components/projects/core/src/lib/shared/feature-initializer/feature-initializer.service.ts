/* eslint @typescript-eslint/naming-convention: [ "error", { "selector": ["objectLiteralProperty","classProperty"], "format": ["camelCase", "UPPER_CASE", "snake_case"] } ] */

import { Injectable } from '@angular/core';
import { Feature } from '../generated';
import { FormHelpers } from '../../feature-form/form/form-helpers';
import * as wellknown from 'wellknown';
import { GeoJSONGeometry } from 'wellknown';


@Injectable({
  providedIn: 'root',
})
export class FeatureInitializerService {

  public static enum;

  public static readonly STUB_OBJECT_GUID_NEW_OBJECT = '-1';

  constructor() {
  }

  public retrieveGeometry(feature: Feature): GeoJSONGeometry {
    const wkt = feature.defaultGeometry;
    if(wkt != null){
      return wellknown.parse(wkt);
    }
    return null;
  }

  public create(type: string, params: any): Feature {
    params.clazz = type.toLowerCase();
    params.objecttype = FormHelpers.snakecaseToCamel(type);
    params.fid = FeatureInitializerService.STUB_OBJECT_GUID_NEW_OBJECT;
    switch (type) {
      case 'wegvakonderdeel':
        const wv: Feature = {
          a1_rafeling: 0,
          a3_dwarsonvlakheid: 0,
          a4_oneffenheden: 0,
          a5_scheurvorming: 0,
          a7_randschade: 0,
          aanlegjaar: 0,
          aanzien: null,
          afbeelding: null,
          b3_oneffenheden: 0,
          b4_scheurvorming: 0,
          b7_voegvulling: 0,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bestek_nr: null,
          binnen_kom: null,
          breedte: 0,
          bronhouder: null,
          buurt: null,
          categorie: null,
          cbs_berekening: 0,
          cbs_code: null,
          children: undefined,
          clazz: null,
          comfort: null,
          constructieopbouw: null,
          d1_afwatering: 0,
          d5_zetting: 0,
          domein: null,
          duurzaamheid: null,
          e1_dwarsonvlakheid: 0,
          e2_oneffenheden: 0,
          e3_voegwijdte: 0,
          eind_tijd: null,
          fid: 0,
          formaat_verharding: null,
          functie_weg: null,
          functie_weg_plus: null,
          functieondsteunwegdeel: null,
          fysiekvkondsteunwd: null,
          fysiekvkondsteunwdplus: null,
          fysiekvoorkomenweg: null,
          fysiekvoorkomenwegplus: null,
          gemeente: null,
          geometrie: undefined,
          hoofdcategorie: null,
          id: 0,
          imgeo_id: null,
          in_onderzoek: null,
          inspectiedatum: null,
          ka1_rafeling: null,
          ka3_dwarsonvlakheid: null,
          ka4_oneffenheden: null,
          ka5_scheurvorming: null,
          ka7_randschade: null,
          kb3_oneffenheden: null,
          kb4_scheurvorming: null,
          kb7_voegvulling: null,
          ke1_dwarsonvlakheid: null,
          ke2_oneffenheden: null,
          ke3_voegwijdte: null,
          kl_standaard_opmerking_wegen: null,
          kl_weginspecteur: null,
          kl_weginspectie_mogelijk: null,
          lengte: 0,
          lus_vri: null,
          m1_stroefheid: null,
          m3_deflectie: null,
          m4_structurelewaarde: null,
          m5_doorlatendheid: null,
          m6_lastoverdracht: null,
          o1_vlakheid: 0,
          o2_materiaalverlies: 0,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          ondergrond: null,
          onderhoudjaar: 0,
          openbare_ruimte: null,
          oppervlakte: 0,
          optalud: null,
          planningen: undefined,
          profielnr: null,
          rayon: null,
          real_verlichting_egem: 0,
          real_verlichting_uo: 0,
          reg_begin: null,
          reg_eind: null,
          relatieve_hoogteligging: 0,
          rijstrook: null,
          status: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_cbs_code: null,
          std_constructieopbouw: null,
          std_domein: null,
          std_ondergrond: null,
          std_rijstrook: null,
          std_structuurelement: null,
          std_verhardingsfunctie: null,
          std_verhardingssoort: null,
          strooiroute: null,
          structuurelement: null,
          subcategorie: null,
          tekening: null,
          toelichting: null,
          toelichting1: null,
          type_sportbedrijf: null,
          veiligheid: null,
          vereiste_verlichting: null,
          verhardingsfunctie: null,
          verhardingssoort: null,
          verhardingstype: null,
          voeglengte: 0,
          volgnr: null,
          volgnr_dwarsprofiel: null,
          w1_langsonvlakheid: 0,
          w2_spoorvorming: 0,
          w3_comfort: 0,
          weginspecties: undefined,
          wegtype: null,
          wegvak_id: null,
          wegvakonderdeelnr: null,
          wijk: null,
          wijz_inv: null,
          woonplaats: null,
          workflow_status: null,
          x62_cluster_aard: null,
          x62_ligging_spec: null,
          x62_lus_pollar: null,
          x62_lus_slagboom: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          x62_std_wijz_inv: null,
          ...params,
        };
        return wv;
      case 'wegvakonderdeelplanning':
        const wvp: Feature = {
          belang: 0,
          binnen_kom: false,
          calc_plan_code: '',
          calc_plan_id: '',
          calc_plan_name: '',
          children: undefined,
          clazz: '',
          data_guid: '',
          dekkingscode: '',
          eenheidsprijs: 0,
          frequentie: 0,
          gepland_uitgevoerd: false,
          hoeveelheid: 0,
          id: 0,
          jaarvanuitvoering: 0,
          kosten: 0,
          kosten_per_eenheid: 0,
          kostenfactor: 0,
          maatregel_kopie: '',
          maatregel_wvko: '',
          maatregelgroep: '',
          maatregeltype: '',
          memo: '',
          objectGuid: '',
          objecttype: '',
          planstatus: '',
          std_verhardingssoort: '',
          toeslagen: '',
          vaste_kosten: 0,
          verhardingstype: '',
          wegtype: '',
          wegvakonderdeel_id: '',
          ...params,
        };
        return wvp;
      case 'rioolput':
        const rp: Feature = {
          aanlegjaar: 0,
          aansluitend_stelseltype: null,
          aant_aansl_inw_recr: 0,
          aant_aansl_inwoner: 0,
          aantal_aansl_bedrijven: 0,
          aantal_aansl_diversen: 0,
          aantal_aansl_horeca: 0,
          aantal_aansl_kolken: 0,
          aantal_aansl_woningen: 0,
          aantal_aansl_woonboten: 0,
          aantal_pompen: 0,
          afbeelding: null,
          afspraak_waterschap: null,
          afwijkendedieptelegging: 0,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bergend_oppervlak: 0,
          bestek: null,
          bestek_nr: null,
          bouwjaar_pomp: 0,
          bovengrondszichtbaar: null,
          breedte: 0,
          breedte_toegang: 0,
          bronhouder: null,
          buurt: null,
          categorie: null,
          children: undefined,
          clazz: null,
          continue_lozing: 0,
          dab_scheur: 0,
          dac_breuk_instorting: 0,
          dad_defect_metselwerk: 0,
          daf_schade_oppervlak: 0,
          datum_maaiveldhoogte: null,
          dba_wortels: 0,
          dbd_binnendringen_grond: 0,
          dbf_infiltratie: 0,
          diameter: 0,
          diameter_doorlaat: 0,
          diameter_persaansluiting: 0,
          diepte: 0,
          domein: null,
          drempel_breedte: 0,
          drempelhoogte_nap: 0,
          eind_tijd: null,
          fid: 0,
          funderingstype: null,
          geleiding: null,
          gem_emissie_jaar: 0,
          gem_emissie_jaar_bzv: 0,
          gemeente: null,
          geometrie: undefined,
          geonauwkeurigheidxy: 0,
          geotextiel_inf_deel: null,
          grondeigendom: null,
          grondsoort: null,
          grondwaterstand: 0,
          hoofdcategorie: null,
          hoogte_put: 0,
          hoogteligging_doorlaat: 0,
          hoogteligging_obl: 0,
          hoogwaterpeil: 0,
          hulpputcode: null,
          id: 0,
          imgeo_id: null,
          in_onderzoek: null,
          inschakelpeil: 0,
          inspectiedatum: null,
          int_putmateriaal: null,
          invoer: 0,
          kleptype: null,
          knoopnummer: null,
          laagwaterpeil: 0,
          lengte: 0,
          lengte_putdeel: 0,
          lengte_toegang: 0,
          leverancier_fabrikant: null,
          locatie: null,
          maaiveldhoogte: 0,
          maaiveldhoogte_actueel: 0,
          maaiveldhoogte_ontwerp: 0,
          mantoegankelijk: null,
          materiaal_gwsw: null,
          materiaal_inf_deel: null,
          materiaal_put: null,
          niv_buitenwater: 0,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          onderhoudsfirma: null,
          ontv_toelaatbaar_peilst: 0,
          ontv_waterpeil: 0,
          ontw_doorl_grond: 0,
          ontw_hgt_grondwaterstand: 0,
          ontw_oppervlak: 0,
          ontwerppeil_ontv_water: 0,
          openbare_ruimte: null,
          ophanginrichting: null,
          opp_water_straat: 0,
          pompcapaciteit: 0,
          pomptype: null,
          porositeit: 0,
          prognose_draaiuren: 0,
          putafmeting: null,
          putcode: null,
          putdekseltype: null,
          putdiepte: 0,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          reinigingscyclus: null,
          reinigingsjaar: null,
          relatieve_hoogteligging: 0,
          revisietekening: null,
          rioolputhfdtype_gwsw: null,
          rioolputsubtype_gwsw: null,
          rioolputtype: null,
          rioolputtype_gwsw: null,
          rl_voorziening_id: null,
          status: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_domein: null,
          std_funderingstype: null,
          std_grondsoort: null,
          std_kleptype: null,
          std_materiaal_put: null,
          std_putdekseltype: null,
          std_rioolputtype: null,
          std_structuurelement: null,
          stelsel_id: null,
          strategisch: null,
          structuurelement: null,
          subcategorie: null,
          sw_gebied_id: null,
          tekening: null,
          telemetrie: null,
          terugslagklep: null,
          toelichting: null,
          type_leidingelement: null,
          type_put_plus: null,
          uitschakelpeil: 0,
          verharding_wegdek: null,
          volgend_reinigingsjaar: null,
          vorm_gwsw: null,
          vorm_toegang: null,
          wanddikte: 0,
          waterpeil: 0,
          wijk: null,
          woonplaats: null,
          x62_cluster_aard: null,
          x62_funderingstype_gwsw: null,
          x62_infiltratieputtype: null,
          x62_lengte_deksel: 0,
          x62_lozingswerktype: null,
          x62_piek_emissie_10_jaar: 0,
          x62_piek_emissie_10_jaar_bzv: 0,
          x62_piek_emissie_2_jaar: 0,
          x62_piek_emissie_2_jaar_bzv: 0,
          x62_piek_emissie_5_jaar: 0,
          x62_piek_emissie_5_jaar_bzv: 0,
          x62_pompopstelling: null,
          x62_standaard_lozingswerktype: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_infiltratieputtype: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          ...params,
        };
        return rp;
      case 'mechleiding':
        const ml: Feature = {
          aanlegjaar: 0,
          aantal_buizen: 0,
          afbeelding: null,
          afwijkendedieptelegging: 0,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bemalingsgebied: null,
          bestek_nr: null,
          bovenliggende_verharding: null,
          breedte: 0,
          buistype: null,
          buurt: null,
          categorie: null,
          children: undefined,
          clazz: null,
          cons_onderdeel_id: null,
          detailverwijzing: null,
          diameter: 0,
          diepte_begin: 0,
          diepte_eind: 0,
          diepte_max: 0,
          domein: null,
          drukklasse: null,
          eind_tijd: null,
          eisvoorzorgsmaatregel: null,
          fid: 0,
          funderingstype: null,
          gemeente: null,
          geometrie: undefined,
          geonauwkeurigheidxy: 0,
          grondsoort: null,
          hoofdcategorie: null,
          hoogte: 0,
          id: 0,
          imgeo_id: null,
          lengte: 0,
          leverancier_fabrikant: null,
          lozingsput_id: null,
          materiaal_gwsw: null,
          materiaal_leiding: null,
          materiaal_rioolleiding: null,
          mech_leiding_id: null,
          mech_leidingtype_gwsw: null,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          ontluchtingspunten: 0,
          openbare_ruimte: null,
          persleidingtype: null,
          pompput_id: null,
          product_leiding: null,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          revisietekening: null,
          status: null,
          status_functioneren: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_buistype: null,
          std_domein: null,
          std_grondsoort: null,
          std_materiaal_rioolleiding: null,
          std_persleidingtype: null,
          std_stelseltype: null,
          std_structuurelement: null,
          stelsel_id: null,
          stelseltype: null,
          stroomgebied: null,
          structuurelement: null,
          subcategorie: null,
          sw_gebied_id: null,
          toegankelijk: null,
          toelichting: null,
          toelichting_imkl: null,
          type_leiding: null,
          verbindingstype: null,
          verhoogd_risico: null,
          vervuilingsgraad: 0,
          vorm: null,
          wanddikte: 0,
          wandruwheid: 0,
          wandruwheid_bb: 0,
          wandruwheid_bo: 0,
          waterslagvoorziening: null,
          wijk: null,
          wion_thema: null,
          woonplaats: null,
          x62_cluster_aard: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          ...params,
        };
        return ml;
      case 'vrijvleiding':
        const vl: Feature = {
          aanlegjaar: 0,
          aant_ie_bedrijven: 0,
          aant_ie_recreatie: 0,
          aantal_aansl_woningen: 0,
          aantal_buizen: 0,
          afbeelding: null,
          afvoer_dwa: 0,
          afvoer_rwa: 0,
          afwijkendedieptelegging: 0,
          baa_deformatie: 0,
          bab_scheur: 0,
          bac_breuk_instorting: 0,
          bad_defect_metselwerk: 0,
          bae_ontbrekend_metslspecie: 0,
          baf_oppervlakteschade: 0,
          bag_instekende_inlaat: 0,
          bah_defect_aansluiting: 0,
          bai_indring_afdichtingsmat: 0,
          bai_indring_afdichtingsring: 0,
          bai_indring_ander_afdichting: 0,
          baj_axiaal: 0,
          baj_hoekverdraaiing: 0,
          baj_radiaal: 0,
          baj_verpl_verbinding: 0,
          bak_defect_lining: 0,
          bal_defect_reparatie: 0,
          bam_lasfouten: 0,
          ban_poreuze_buis: 0,
          bba_wortels: 0,
          bbb_aangeh_afzettingen: 0,
          bbc_bezonken_afzettingen: 0,
          bbd_binnendringen_grond: 0,
          bbe_andere_obstakels: 0,
          bbf_infiltratie: 0,
          bbv: null,
          bdd_waterpeil: 0,
          begin_tijd: null,
          beginput_id: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bemalingsgebied: null,
          berging: 0,
          bestek: null,
          bestek_nr: null,
          bob_begin_actueel: 0,
          bob_begin_ontwerp: 0,
          bob_eind_actueel: 0,
          bob_eind_ontwerp: 0,
          bovenliggende_verharding: null,
          breedte: 0,
          buislengte: 0,
          buistype: null,
          buisverbinding: null,
          buisvorm: null,
          buurt: null,
          capaciteit_spoelvoorz: 0,
          categorie: null,
          children: undefined,
          clazz: null,
          datum_bob_begin: null,
          datum_bob_eind: null,
          detailverwijzing: null,
          diameter: 0,
          domein: null,
          drainagetype: null,
          eind_tijd: null,
          eindput_id: null,
          eisvoorzorgsmaatregel: null,
          fid: 0,
          functie_vrijv_leiding: null,
          funderingstype: null,
          gemeente: null,
          geometrie: undefined,
          geonauwkeurigheidxy: 0,
          geotextiel_inf_deel: null,
          grondeigendom: null,
          grondsoort: null,
          grondwaterstand: null,
          hoofdcategorie: null,
          hoogte: 0,
          id: 0,
          imgeo_id: null,
          infiltratieriooltype: null,
          inspectie_bestand: null,
          inspectiecode: null,
          inspectiedatum: null,
          inspectiejaar: null,
          inspectienaam: null,
          inspectietechniek: null,
          kast_id: null,
          kl_link: null,
          knoopnummer_beginput: 0,
          knoopnummer_eindput: 0,
          lengte: 0,
          leverancier_fabrikant: null,
          materiaal_gwsw: null,
          materiaal_inf_deel: null,
          materiaal_leiding: null,
          materiaal_rioolleiding: null,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          onderhoudjaar: 0,
          ontgravingsmethode: null,
          ontv_toelaatbaar_peilst: 0,
          ontv_waterpeil: 0,
          ontw_doorl_grond: 0,
          ontw_hgt_grondwaterstand: 0,
          ontw_oppervlak: 0,
          openbare_ruimte: null,
          oppervlak_gesloten_wegen: 0,
          oppervlak_groen: 0,
          oppervlak_open_wegen: 0,
          oppervlak_plat_dak: 0,
          oppervlak_schuin_dak: 0,
          orig_id: 0,
          product_leiding: null,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          revisietekening: null,
          riool_drainage: null,
          sleuf_breedte: 0,
          sleuf_inhoud: 0,
          soort_locatie: null,
          spiegelverhang_dwa: 0,
          spiegelverhang_rwa: 0,
          status: null,
          status_functioneren: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_buistype: null,
          std_buisverbinding: null,
          std_domein: null,
          std_drainagetype: null,
          std_funderingstype: null,
          std_grondsoort: null,
          std_infiltratieriooltype: null,
          std_materiaal_rioolleiding: null,
          std_stelseltype: null,
          std_strengtype: null,
          std_structuurelement: null,
          stelsel_id: null,
          stelseltype: null,
          strategisch: null,
          strengcode: null,
          strengtype: null,
          stroomgebied: null,
          structuurelement: null,
          subcategorie: null,
          sw_gebied_id: null,
          tekening: null,
          toegankelijk: null,
          toelichting: null,
          type_leiding: null,
          verbindingstype: null,
          verharding_wegdek: null,
          verhoogd_risico: null,
          verloren_berging: 0,
          vervuilingsgraad: 0,
          video_bestand: null,
          video_bestand_map: null,
          video_inspectie_bestand: null,
          vorm: null,
          vrijverval_leidingsubtype: null,
          vrijverval_leidingtype: null,
          wanddikte: 0,
          wandruwheid: 0,
          wandruwheid_bb: 0,
          wandruwheid_bo: 0,
          wijk: null,
          wion_thema: null,
          woonplaats: null,
          x62_aant_aansl_inwoner: 0,
          x62_bouwjaar_pomp: 0,
          x62_cluster_aard: null,
          x62_dikte_lining: 0,
          x62_funderingstype_gwsw: null,
          x62_ledigingspomp_id: null,
          x62_materiaal_lining: null,
          x62_pomptype: null,
          x62_soort_lining: null,
          x62_spoeltype: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_pomptype: null,
          x62_std_rayon: null,
          x62_std_spoeltype: null,
          x62_std_subcategorie: null,
          x62_stroomsnelheid_dwa: 0,
          x62_stroomsnelheid_rwa: 0,
          x62_telemetrie: null,
          x62_uniek_nummer: 0,
          x62_video_inspectie_bestanden: null,
          x62_waterpeil: 0,
          ...params,
        };
        return vl;
      case 'boom':
        const boom: Feature = {
          aanlegjaar: 0,
          aes: null,
          afbeelding: null,
          afbeelding_vta: null,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bestek_nr: null,
          bijzondere_boom: null,
          boombeschermer: null,
          boomconditie: null,
          boomhoogte: null,
          boomrooster: null,
          boomtype: null,
          boomveiligheidsklasse: null,
          bra: null,
          bronhouder: null,
          bsa: null,
          buurt: null,
          bva: null,
          bvk: null,
          bww: null,
          categorie: null,
          children: undefined,
          clazz: null,
          dhk: null,
          diameter: null,
          domein: null,
          eigenaar: null,
          eind_tijd: null,
          fid: 0,
          gak: null,
          gas: null,
          gaw: null,
          gemeente: null,
          geometrie: undefined,
          gietijzeren_boomkrans: null,
          grasspiegel: null,
          groenobject_id: null,
          gsw: null,
          hgk: null,
          his: null,
          hoofdcategorie: null,
          id: 0,
          imgeo_id: null,
          in_onderzoek: null,
          ink: null,
          ins: null,
          inspecteur_vta: null,
          inspectiedatum: null,
          inspectiefrequentie: null,
          inspecties: undefined,
          kva: null,
          latboomsoort: null,
          mbs: null,
          memo_advies: null,
          memo_kroon: null,
          memo_stam: null,
          memo_vta: null,
          memo_wortels: null,
          nedboomsoort: null,
          noa: null,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          omgevingsrisicoklasse: null,
          ontwikkelingsstadium: null,
          openbare_ruimte: null,
          opkroonhoogte: null,
          ovw: null,
          planningen: undefined,
          ploegindeling: null,
          pzk: null,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          relatieve_hoogteligging: 0,
          risicoklasse: null,
          rzk: null,
          rzs: null,
          rzw: null,
          scs: null,
          srs: null,
          standplaats: null,
          status: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_boomhoogte: null,
          std_boomtype: null,
          std_diameter: null,
          std_domein: null,
          std_ontwikkelingsstadium: null,
          std_opkroonhoogte: null,
          std_standplaats: null,
          std_structuurelement: null,
          structuurelement: null,
          subcategorie: null,
          toelichting: null,
          type_vegetatieobj_plus: null,
          urgentie_vta: null,
          utk: null,
          vergunningsplicht: null,
          wijk: null,
          woonplaats: null,
          x62_cluster_aard: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          ...params,
        };
        return boom;
      case 'boominspectie':
        const bi: Feature = {
          aes: null,
          afbeelding_vta: null,
          boom_id: null,
          boomconditie: null,
          bra: null,
          bsa: null,
          bva: null,
          bvk: null,
          bww: null,
          children: undefined,
          clazz: null,
          data_guid: null,
          dhk: null,
          fid: 0,
          gak: null,
          gas: null,
          gaw: null,
          gsw: null,
          hgk: null,
          his: null,
          id: 0,
          ink: null,
          ins: null,
          inspecteur_vta: null,
          inspectiedatum: null,
          inspectiefrequentie: null,
          kva: null,
          mbs: null,
          memo_advies: null,
          memo_kroon: null,
          memo_stam: null,
          memo_vta: null,
          memo_wortels: null,
          noa: null,
          objectGuid: null,
          objecttype: null,
          ovw: null,
          pzk: null,
          risicoklasse: null,
          rzk: null,
          rzs: null,
          rzw: null,
          scs: null,
          srs: null,
          urgentie_vta: null,
          utk: null,
          ...params,
        };
        return bi;
      case 'gras':
        const gras: Feature = {
          aanlegjaar: 0,
          afbeelding: null,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bestek_nr: null,
          bronhouder: null,
          buurt: null,
          categorie: null,
          children: undefined,
          clazz: null,
          domein: null,
          eind_tijd: null,
          fid: 0,
          functieondsteunwegdeel: null,
          fysiekvkbegrter: null,
          fysiekvkbegrterplus: null,
          fysiekvkondsteunwd: null,
          fysiekvkondsteunwdplus: null,
          gebruiksdruk: null,
          gemeente: null,
          geometrie: undefined,
          grastype: null,
          groenobject_id: null,
          harde_rand: 0,
          hoofdcategorie: null,
          id: 0,
          imgeo_id: null,
          in_onderzoek: null,
          maairegime: null,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          openbare_ruimte: null,
          oppervlakte: 0,
          optalud: null,
          orig_id: 0,
          ploegindeling: null,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          relatieve_hoogteligging: 0,
          schouwplicht: null,
          status: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_domein: null,
          std_gebruiksdruk: null,
          std_grastype: null,
          std_maairegime: null,
          std_structuurelement: null,
          structuurelement: null,
          subcategorie: null,
          toelichting: null,
          type_ondsteunwaterdeel: null,
          wijk: null,
          woonplaats: null,
          x62_cluster_aard: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          zachte_rand: 0,
          ...params,
        };
        return gras;
      case 'haag':
        const haag: Feature = {
          aanlegjaar: 0,
          aantal_knipbeurten: 0,
          aantal_zijden: null,
          afbeelding: null,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bestek_nr: null,
          breedte: 0,
          bronhouder: null,
          buurt: null,
          categorie: null,
          children: undefined,
          clazz: null,
          domein: null,
          eind_tijd: null,
          fid: 0,
          gebruiksdruk: null,
          gemeente: null,
          geometrie: undefined,
          groenobject_id: null,
          grondslag: null,
          haagtype: null,
          harde_rand: 0,
          hknipopp: 0,
          hoofdcategorie: null,
          hoogte: 0,
          hoogte_haag: null,
          id: 0,
          imgeo_id: null,
          in_onderzoek: null,
          knipopp: 0,
          lengte: 0,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          openbare_ruimte: null,
          oppervlakte: 0,
          ploegindeling: null,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          relatieve_hoogteligging: 0,
          status: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_domein: null,
          std_gebruiksdruk: null,
          std_grondslag: null,
          std_haagtype: null,
          std_structuurelement: null,
          structuurelement: null,
          subcategorie: null,
          toelichting: null,
          type_vegetatieobj_plus: null,
          wijk: null,
          woonplaats: null,
          x62_cluster_aard: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          zachte_rand: 0,
          ...params,
        };
        return haag;
      case 'natbeplanting':
        const natBeplanting: Feature = {
          aanlegjaar: 0,
          afbeelding: null,
          bbv: null,
          begin_tijd: null,
          beheercluster: null,
          beheerder: null,
          beheerder_vakgeb: null,
          bestek_nr: null,
          bronhouder: null,
          buurt: null,
          categorie: null,
          children: undefined,
          clazz: null,
          domein: null,
          eind_tijd: null,
          fid: 0,
          functieondsteunwegdeel: null,
          fysiekvkbegrterplus: null,
          fysiekvkondsteunwd: null,
          fysiekvkondsteunwdplus: null,
          fysiekvoorkomenbegrter: null,
          gebruiksdruk: null,
          gemeente: null,
          geometrie: undefined,
          groenobject_id: null,
          harde_rand: 0,
          hoofdcategorie: null,
          id: 0,
          imgeo_id: null,
          in_onderzoek: null,
          nat_bepl_type: null,
          objectGuid: null,
          object_begin_tijd: null,
          object_eind_tijd: null,
          object_guid: null,
          objecttype: null,
          openbare_ruimte: null,
          oppervlakte: 0,
          optalud: null,
          orig_id: 0,
          ploegindeling: null,
          rayon: null,
          reg_begin: null,
          reg_eind: null,
          relatieve_hoogteligging: 0,
          schouwplicht: null,
          status: null,
          std_beheercluster: null,
          std_beheerder_vakgeb: null,
          std_domein: null,
          std_gebruiksdruk: null,
          std_nat_bepl_type: null,
          std_structuurelement: null,
          structuurelement: null,
          subcategorie: null,
          toelichting: null,
          wijk: null,
          woonplaats: null,
          x62_cluster_aard: null,
          x62_std_categorie: null,
          x62_std_hoofdcategorie: null,
          x62_std_rayon: null,
          x62_std_subcategorie: null,
          zachte_rand: 0,
          ...params,
        };
        return natBeplanting;
      case 'weginspectie':
        const weginspectie: Feature = {
          a1_rafeling: 0,
          a3_dwarsonvlakheid: 0,
          a4_oneffenheden: 0,
          a5_scheurvorming: 0,
          a7_randschade: 0,
          children: undefined,
          clazz: null,
          data_guid: null,
          e1_dwarsonvlakheid: 0,
          fid: 0,
          id: 0,
          inspecteur: null,
          inspectiedatum: null,
          inspectieronde: null,
          objectGuid: null,
          objecttype: null,
          opmerking: null,
          wegvakonderdeel_id: null,
          ...params,
        };
        return weginspectie;
      default:
        throw new Error('Featuretype not implemented: ' + type);
    }
  }
}
