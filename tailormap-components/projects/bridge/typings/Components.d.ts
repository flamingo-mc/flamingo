import {
  App,
  AppLayer,
  GeoService,
  MapComponent,
  VectorLayer,
} from './Mapcomponents';

declare interface LayerSelectedEvent{
  appLayer: AppLayer;
  layerName: string;
  nodeId: string;
  service: number;
}

type deactivationEvent = ( ) => void;

declare interface ViewerController {

  app: App;
  mapComponent: MapComponent;

  isDebug: () => boolean;

  getService: (serviceId: number) => GeoService;
  getAppLayerById: (appLayerId: number) => AppLayer;
  getAppLayer: (serviceId: number, layerName: string) => AppLayer;

  getFilterName: (name: string) => string;
  setFilterString: (filter: string, appLayer: AppLayer, name: string) => void;

  addListener: <T1, T2 = undefined>(eventName: string, handler: (event: T1, arg1: T2) => void) => void;
  getComponentsByClassNames: (classNames: string[]) => TailormapComponent[];

  registerSnappingLayer: (vectorLayer: VectorLayer) => void;

  getVisibleLayers(): number[];
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  getVisibleLayers(castToStrings: false): number[];
  getVisibleLayers(castToStrings: true): string[];

  addUserLayer(appLayer: AppLayer, levelId: string, service: GeoService): void;
  removeUserLayer(appLayer: AppLayer): void;

  createVectorLayer(name: string): VectorLayer;
}
declare interface TailormapComponent{
  getContentContainer: () => string;
  addListener: (eventName: string, handler: deactivationEvent) => void;
}

declare interface ExtPopupWindow {
  isVisible: () => boolean;
}

declare interface SplitComponent extends TailormapComponent{
  showWindow: () => void;
  popup: ExtPopupWindow;
}


declare interface MergeComponent extends TailormapComponent{
  showWindow: () => void;
  mode: string;
  popup: ExtPopupWindow;
}
