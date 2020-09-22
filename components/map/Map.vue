<script>
import SearchAddress from './SearchAddress';
import RequestList from '~/components/request_list/RequestList';

export default {
  components: {
    SearchAddress,
    RequestList
  },
  data() {
    return {
      zoom: 14,
      center: [56.134909, 47.246361],
      draggable: true,
      markers: [],
      polylineList: [],
      gettingRoutes: false
    };
  },
  computed: {
    osrmUrl() {
      return this.$store.getters.osrmUrl;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const query = this.$route.query || null;
      this.zoom = (query && +query.zoom) || this.zoom;
      this.center = (query && query.center && JSON.parse(query.center)) || this.center;
      const marker1 = (query && query.marker1 && JSON.parse(query.marker1)) || null;
      const marker2 = (query && query.marker2 && JSON.parse(query.marker2)) || null;

      if (marker1) {
        this.markers.push({ coords: L.latLng(marker1[0], marker1[1]) });
      }

      if (marker2) {
        this.markers.push({ coords: L.latLng(marker2[0], marker2[1]) });
      }

      if (this.markers.length === 2) { this.getRoutes(); }
    },
    addMarker(e) {
      const latlng = e.latlng;
      const markersLength = this.markers.length;

      const coords = L.latLng(latlng.lat, latlng.lng);
      if (markersLength > 1) {
        this.markers.splice(-1, 1);
      }

      this.markers.push({ coords });
      this.saveIntoQueryMarkers();

      if (this.markers.length !== 2 || this.gettingRoutes) { return; }

      this.getRoutes();

      this.gettingRoutes = true;
    },
    saveIntoQueryMarkers() {
      const marker1 = this.markers[0] || null;
      const marker2 = this.markers[1] || null;

      this.$router.replace({
        query: {
          ...this.$route.query,
          ...{
            marker1: marker1 ? JSON.stringify([marker1.coords.lat, marker1.coords.lng]) : undefined,
            marker2: marker2 ? JSON.stringify([marker2.coords.lat, marker2.coords.lng]) : undefined
          }
        }
      });
    },
    handleUpdateLatLng(index, latlng) {
      this.markers[index].coords = L.latLng(latlng.lat, latlng.lng);

      if (this.markers.length !== 2) { return; }

      this.getRoutes();
    },

    getRoutes() {
      const marker1Coords = this.markers[0].coords;
      const marker2Coords = this.markers[1].coords;

      const wayPoint1 = new L.Routing.Waypoint();
      const wayPoint2 = new L.Routing.Waypoint();
      wayPoint1.latLng = marker1Coords;
      wayPoint2.latLng = marker2Coords;

      const router = L.Routing.osrmv1({
        serviceUrl: this.osrmUrl
      });
      const vm = this;
      router.route([wayPoint1, wayPoint2], (error, routes) => {
        if (error) {
          return console.error(error);
        }

        vm.polylineList = [];

        let index = 0;
        for (const route of routes) {
          const polyline = {
            id: index + 100,
            coords: route.coordinates,
            color: index === 0 ? 'red' : 'blue'
          };

          vm.polylineList.push(polyline);
          index += 1;
        }

        const distance = routes[0].summary.totalDistance;
      });
    },
    handleUpdateZoom(zoom) {
      this.zoom = +zoom;

      return this.$router.push({
        query: {
          ...this.$route.query,
          ...{ zoom }
        }
      });
    },
    handleUpdateCenter(center) {
      this.center = [center.lat, center.lng];

      return this.$router.push({
        query: {
          ...this.$route.query,
          ...{ center: JSON.stringify([center.lat, center.lng]) }
        }
      });
    },

    handleSelectAddress(address, indexMarker) {
      if (!address) {
        this.deleteMarker(indexMarker);
        return;
      }

      const coord = {
        latlng: {
          lat: address.lat,
          lng: address.lon
        }
      };

      if (this.markers[indexMarker]) {
        this.handleUpdateLatLng(indexMarker, coord.latlng);
      } else {
        this.addMarker(coord);
      }
    },

    deleteMarker(indexMarker) {
      this.markers.splice(indexMarker, 1);
      this.polylineList = [];

      const query = {};
      query[`marker${indexMarker}`] = undefined;
      this.$router.push({
        query: {
          ...this.$route.query,
          ...query
        }
      });
    }
  }
};
</script>

<template>
  <client-only>
    <l-map
      ref="map"
      :style="{height: '100%'}"
      :zoom="zoom"
      :center="center"
      language="ru"
      :options="{zoomControl: false}"
      @click="addMarker"
      @update:zoom="handleUpdateZoom"
      @update:center="handleUpdateCenter"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-control-zoom position="bottomright" />
      <l-control position="topright">
        <search-address :coords="(markers[0] && markers[0].coords) || null" :style="{width: '500px'}" @onSelectAddress="(address) => handleSelectAddress(address, 0)" />
        <br>
        <search-address :coords="(markers[1] && markers[1].coords) || null" :style="{width: '500px'}" @onSelectAddress="(address) => handleSelectAddress(address, 1)" />
      </l-control>
      <l-control :options="{height: '100%'}" :style="{width: '550px', height: '100%', paddingBottom: '30px'}" position="topleft">
        <v-card :style="{maxHeight: '100%', height: '100%'}">
          <v-card-text :style="{maxHeight: '100%',height: '100%'}">
            <request-list :style="{maxHeight: '100%',height: '100%'}" />
          </v-card-text>
        </v-card>
      </l-control>
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker.coords"
        :draggable="draggable"
        @update:lat-lng="(latlng) => handleUpdateLatLng(index, latlng)"
      />
      <l-polyline v-for="polyline in polylineList" :key="polyline.id" :lat-lngs="polyline.coords" :color="polyline.color" />
    </l-map>
  </client-only>
</template>

<style lang="scss">
  .leaflet-top.leaflet-left {
    height: 100% !important;
  }
</style>
