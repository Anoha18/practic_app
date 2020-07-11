<script>
export default {
  data() {
    return {
      zoom: 14,
      center: [56.134909, 47.246361],
      draggable: true,
      popupContent: 'Sentian HQ',
      markers: []
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

      if (markersLength === 2) {
        await this.getWay();
      }
    },
    handleUpdateLatLng(index, latlng) {
      this.markers[index].coords = [latlng.lat, latlng.lng];
    },
    async getWay() {
      const marker1 = this.markers[0].coords;
      const marker2 = this.markers[1].coords;

      await this.$axios.get(`${this.osrmUrl}/route/v1/driving/${marker1[1]},${marker1[0]};${marker2[1]},${marker2[0]}`, {
        params: {
          overview: false,
          alternatives: true
        }
      });
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
    </l-map>
  </client-only>
</template>
