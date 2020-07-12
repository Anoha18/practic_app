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
    async addMarker(e) {
      const latlng = e.latlng;
      const markersLength = this.markers.length;

      if (markersLength <= 1) {
        const coords = [latlng.lat, latlng.lng];
        this.markers.push({ coords });
      } else {
        this.markers.splice(-1, 1);
        const coords = [latlng.lat, latlng.lng];
        this.markers.push({ coords });
      }

      if (this.markers.length === 2) {
        await this.getWay();
      }
    },
    handleUpdateLatLng(index, latlng) {
      this.markers[index].coords = [latlng.lat, latlng.lng];
    },
    async getWay() {
      const marker1 = this.markers[0].coords;
      const marker2 = this.markers[1].coords;
      let response;

      try {
        response = await this.$axios.get(`${this.osrmUrl}/route/v1/driving/${marker1[1]},${marker1[0]};${marker2[1]},${marker2[0]}`, {
          params: {
            overview: false,
            alternatives: true,
            steps: true
          }
        });
      } catch (error) {
        console.error(error);
        return { error: error.message };
      }

      const { data } = response;

      if (!data || data.code !== 'Ok') { return; }

      this.parseRoutes(data.routes);
    },
    parseRoutes(routes) {
      if (!routes && !Array.isArray(routes)) { return; }
      let index = 0;

      if (this.polylineList.length) { this.polylineList = []; }

      for (const route of routes) {
        const legs = route.legs;
        const polyline = {
          id: index + 100,
          coords: [],
          color: index === 0 ? 'red' : 'blue'
        };

        for (const leg of legs) {
          const steps = leg.steps;

          for (const step of steps) {
            const maneuver = step.maneuver;

            if (maneuver.location && maneuver.location.length) {
              polyline.coords.push(maneuver.location.reverse());
            }
          }
        }

        this.polylineList.push(polyline);
        index += 1;
      }
    }
  }
};
</script>

<template>
  <client-only>
    <l-map
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
