<script>
import SearchAddress from '~/components/map/SearchAddress';

export default {
  components: {
    // SearchAddress
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      zoom: 14,
      center: [56.134909, 47.246361],
      draggable: true,
      marker: {
        lat: null,
        lng: null,
        address: null
      },
      visibleMap: false
    };
  },
  computed: {
    nominatimUrl() {
      return this.$store.getters.nominatimUrl;
    },
    activeSelect() {
      const {
        lat, lng, address
      } = this.marker;
      if (!lat || !lng || !address) {
        return false;
      }
      return true;
    }
  },
  watch: {
    async visible(val) {
      if (val && !this.visibleMap) {
        await this.$nextTick();
        await this.$nextTick();
        this.visibleMap = true;
      }
    }
  },
  methods: {
    async addMarker(e) {
      const { latlng } = e;

      this.marker.lat = latlng.lat;
      this.marker.lng = latlng.lng;
      const { data, error } = await this.reverseQuery(latlng.lat, latlng.lng);

      if (error) { console.error(error); }

      this.marker.address = data;

      this.changeCenterByMarker();
    },
    changeCenterByMarker() {
      this.center = [this.marker.lat, this.marker.lng];
    },
    closeModal() {
      this.$emit('onClose');
    },
    async reverseQuery(lat, lon) {
      try {
        const { data } = await this.$axios.get(this.nominatimUrl + '/reverse', {
          params: {
            lat,
            lon,
            format: 'json'
            // addressdetails: 1
          }
        });

        return {
          data
        };
      } catch (error) {
        console.error(error);
        return {
          error: error.message
        };
      }
    },
    async handleUpdateLatLng(latlng) {
      this.marker.lat = latlng.lat;
      this.marker.lng = latlng.lng;

      const { data, error } = await this.reverseQuery(latlng.lat, latlng.lng);

      if (error) { console.error(error); }

      this.marker.address = data;
    },
    handleSelectAddress(address) {
      if (!address) {
        this.marker.lat = null;
        this.marker.lng = null;
        this.marker.address = null;
        return;
      }

      this.marker.address = address;
      this.marker.lat = address.lat;
      this.marker.lng = address.lon;
      this.changeCenterByMarker();
    },
    select() {
      this.$emit('onSelect', this.marker);
      this.closeModal();
    }

  }
};
</script>

<template>
  <v-dialog
    :value="visible"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @click:outside="closeModal"
  >
    <v-card height="100px" tile>
      <v-toolbar>
        <v-toolbar-title>
          Укажите адрес
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            text
            @click="closeModal"
          >
            Отменить
          </v-btn>
          <v-btn
            text
            :disabled="!activeSelect"
            @click="select"
          >
            Выбрать
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text
        :style="{height: '100%', width: '100%'}"
      >
        <l-map
          v-if="visibleMap"
          ref="map"
          :style="{height: '100%', width: '100%'}"
          :zoom="zoom"
          :center="center"
          language="ru"
          :options="{zoomControl: false}"
          @click="addMarker"
        >
          <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <l-control position="topright">
            <search-address :selected-address="marker.address" :coords="marker.lng && marker.lat ? marker : null" :style="{width: '500px'}" @onSelectAddress="handleSelectAddress" />
          </l-control>
          <l-marker
            v-if="marker.lng && marker.lat"
            :lat-lng="[marker.lat, marker.lng]"
            :draggable="draggable"
            @update:lat-lng="handleUpdateLatLng"
          >
            <l-popup>
              {{ marker.address && marker.address.display_name }}
            </l-popup>
          </l-marker>
        </l-map>
      </v-card-text>
    </v-card>
    <!-- <client-only> -->
    <!-- </client-only> -->
  </v-dialog>
</template>
