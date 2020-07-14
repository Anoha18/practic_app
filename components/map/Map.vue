<script>
export default {
  data() {
    return {
      zoom: 14,
      center: [56.134909, 47.246361],
      draggable: true,
      popupContent: 'Sentian HQ',
      markers: [],
      polylineList: []
    };
  },
  computed: {
    osrmUrl() {
      return this.$store.getters['osrm/url'];
    }
  },
  methods: {
    addMarker(e) {
      const latlng = e.latlng;
      const markersLength = this.markers.length;

      const coords = L.latLng(latlng.lat, latlng.lng);
      if (markersLength > 1) {
        this.markers.splice(-1, 1);
      }

      this.markers.push({ coords });

      if (this.markers.length !== 2) { return; }

      this.getRotes();
    },
    handleUpdateLatLng(index, latlng) {
      console.log('index: ', index);
      console.log('latlng: ', latlng);
      this.markers[index].coords = L.latLng(latlng.lat, latlng.lng);
      this.getRotes();
    },

    getRotes() {
      const marker1Coords = this.markers[0].coords;
      const marker2Coords = this.markers[1].coords;

      const wayPoint1 = new L.Routing.Waypoint();
      const wayPoint2 = new L.Routing.Waypoint();
      wayPoint1.latLng = marker1Coords;
      wayPoint2.latLng = marker2Coords;

      const router = L.Routing.osrmv1({
        serviceUrl: this.osrmUrl
      });
      console.log('router: ', router);
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
        console.log('routing distance: ' + distance);
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
      @click="addMarker"
    >
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-marker
        v-for="(marker, index) in markers"
        :key="index"
        :lat-lng="marker.coords"
        :draggable="draggable"
        @update:lat-lng="(latlng) => handleUpdateLatLng(index, latlng)"
      >
        <l-popup :content="popupContent" />
      </l-marker>
      <l-polyline v-for="polyline in polylineList" :key="polyline.id" :lat-lngs="polyline.coords" :color="polyline.color" />
    </l-map>
  </client-only>
</template>
