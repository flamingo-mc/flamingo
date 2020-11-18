import {
  App,
  AppLayer,
  GeoService,
  layerVisibilityEvent,
  MapComponent,
} from './Mapcomponents';
import { LayerVisibilityEvent } from '../../core/src/lib/shared/models/event-models';


declare interface LayerSelectedEvent{
  appLayer: AppLayer;
  layerName: string;
  nodeId: string;
  service: number
}

type layerEventHandler = ( payload: LayerSelectedEvent) => void;

declare interface ViewerController {

  app: App;
  mapComponent: MapComponent;

  isDebug: () => boolean;

  getService: (serviceId: number) => GeoService;
  getAppLayerById: (appLayerId: number) => AppLayer;
  getAppLayer: (serviceId: number, layerName: string) => AppLayer;

  addListener: (eventName: string, handler: layerEventHandler) => void;
  getComponentsByClassNames: (classNames : string[]) => TailormapComponent[];

  getVisibleLayers(): number[];
  // tslint:disable-next-line:unified-signatures
  getVisibleLayers(castToStrings: false): number[];
  getVisibleLayers(castToStrings: true): string[];
}

declare interface TailormapComponent{
  getContentContainer: () => string;
}

declare interface SplitComponent extends TailormapComponent{
  showWindow: () => void;
}

declare interface MergeComponent extends TailormapComponent{
  showWindow: () => void;
}
