<script>
import { mdiMapMarkerDistance } from '@mdi/js';
import AddAddressModal from '~/components/routes/AddAddressModal';

export default {
  components: {
    AddAddressModal
  },
  middleware: ['checkAuth'],
  async asyncData({ params, store }) {
    const { routeId } = params;
    if (!store.getters['route/addressList'].length) {
      await store.dispatch('route/getAddressList', routeId);
    }
    return {
      routeId
    };
  },
  data() {
    return {
      mdiMapMarkerDistance,
      zoom: 14,
      center: [56.134909, 47.246361],
      draggable: false,
      polylineList: [],
      gettingRoutes: false,
      totalDistance: null,
      addModalVisible: false
    };
  },
  computed: {
    osrmUrl() {
      return this.$store.getters.osrmUrl;
    },
    addressList() {
      const addressList = this.$store.getters['route/addressList'];
      return addressList.map(address => ({ ...{ coords: [address.lat, address.lng] }, ...address }));
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
    getRoute() {
      const wayPointList = [];
      const { addressList } = this;
      const vm = this;

      for (const address of addressList) {
        const { coords } = address;
        const wayPoint = new L.Routing.Waypoint();
        wayPoint.latLng = L.latLng(coords);
        wayPointList.push(wayPoint);
      }

      const router = L.Routing.osrmv1({
        // serviceUrl: this.osrmUrl
      });

      router.route(wayPointList, (error, routes) => {
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

        vm.totalDistance = routes[0].summary.totalDistance;
      });
    },
    async reloadAddressList() {
      await this.$store.dispatch('route/getAddressList', this.routeId);
    }
  },
  head() {
    return {
      title: `Маршрут №${this.routeId} - Карта`
    };
  }
};
</script>

<template>
  <div class="container-route__map">
    <client-only>
      <l-map
        ref="map"
        :style="{height: '100%', position: 'absolute'}"
        :zoom="zoom"
        :center="center"
        language="ru"
        :options="{zoomControl: false}"
        @update:zoom="handleUpdateZoom"
        @update:center="handleUpdateCenter"
      >
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-control-zoom position="bottomright" />
        <l-control position="topright">
          <v-btn @click="addModalVisible = true">
            <v-icon dark>
              mdi-plus
            </v-icon>
            Добавить адрес
          </v-btn>
          <v-btn v-if="addressList.length > 1" @click="getRoute">
            <v-icon>{{ mdiMapMarkerDistance }}</v-icon>
            Построить маршрут
          </v-btn>
          <v-card v-if="totalDistance" class="mt-2">
            <v-card-title>Дистанция:</v-card-title>
            <v-card-text>{{ totalDistance }} м</v-card-text>
          </v-card>
        </l-control>
        <l-marker
          v-for="address in addressList"
          :key="address.id"
          :lat-lng="address.coords"
          :draggable="draggable"
        >
          <l-popup>
            <span :style="{fontWeight: 'bold'}">№{{ address.id }}</span> <br>
            <span :style="{fontWeight: 'bold'}">Наименование:</span> {{ address.name || '-' }} <br>
            <span :style="{fontWeight: 'bold'}">Комментарий:</span> {{ address.comment || '-' }} <br>
            <span :style="{fontWeight: 'bold'}">Адрес:</span> {{ address.address }}
          </l-popup>
        </l-marker>
        <l-polyline v-for="polyline in polylineList" :key="polyline.id" :lat-lngs="polyline.coords" :color="polyline.color" />
      </l-map>
    </client-only>

    <add-address-modal :route-id="+routeId" :visible="addModalVisible" @onSaveAddress="reloadAddressList" @onClose="addModalVisible = false" />
  </div>
</template>

<style lang="scss">
  .container-route__map {
    width: 100%;
    height: 100%;
    flex: 1 1;
    position: relative;
  }
</style>
