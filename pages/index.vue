<script>
import RouteTable from '~/components/main/RoutesTable';
import AddRouteModal from '~/components/main/AddRouteModal';
// import Map from '~/components/map/Map';

export default {
  components: {
    RouteTable,
    AddRouteModal
    // Map
  },
  middleware: ['checkAuth'],
  async asyncData({ store, $axios }) {
    const title = 'Мои маршруты';
    store.commit('SET_HEADER_TITLE', title);

    const { result, error } = await $axios.$get('/api/routes/list');

    return {
      title,
      routeList: result || []
      // [
      //   { id: 1, name: '1', date: '24.08.2020', base: 'База', addresses: 3 },
      //   { id: 2, name: '1', date: '24.08.2020', base: 'База', addresses: 3 },
      //   { id: 3, name: '1', date: '24.08.2020', base: 'База', addresses: 3 },
      //   { id: 4, name: '1', date: '24.08.2020', base: 'База', addresses: 3 }
      // ]
    };
  },
  data() {
    return {
      addModalVisible: false
    };
  },
  methods: {
    async reloadRouteList() {
      try {
        const { result, error } = await this.$axios.$get('/api/routes/list');
        if (error) {
          return console.error(error);
        }

        this.routeList = result || [];
      } catch (error) {
        console.error(error);
      }
    }
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<template>
  <div :style="{height: '100%', padding: '15px 15px 0 15px'}">
    <v-row>
      <v-col>
        <v-btn rounded @click="addModalVisible = true">
          <v-icon dark>
            mdi-plus
          </v-icon>
          Добавить маршрут
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <route-table :route-list="routeList" />
      </v-col>
    </v-row>

    <add-route-modal :visible="addModalVisible" @reloadRouteList="reloadRouteList" @onClose="addModalVisible = false" />
  </div>
</template>
