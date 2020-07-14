import Vue from 'vue';
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LPolyline,
  LControl
} from 'vue2-leaflet';
import 'leaflet-routing-machine';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-polyline', LPolyline);
Vue.component('l-control', LControl);
