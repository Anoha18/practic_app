<script>
import { mdiArrowLeft } from '@mdi/js';

export default {
  middleware: [
    'checkAuth',
    ({ route, redirect }) => {
      if (route.name === 'routes-routeId') {
        return redirect(`/routes/${route.params.routeId}/addresses`);
      }
    }
  ],
  async asyncData({ params, store, error }) {
    const { routeId } = params;
    const { route, error: getRouteByIdError } = await store.dispatch('route/getRouteById', routeId);

    if (!route || getRouteByIdError) {
      return error({ statusCode: 404, message: 'Route not found' });
    }

    const title = `Маршрут №${routeId}`;
    store.commit('SET_HEADER_TITLE', title);

    return {
      routeId,
      title
    };
  },
  data() {
    return {
      mdiArrowLeft
    };
  },
  computed: {
    route() {
      return this.$store.getters['route/route'];
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
  <div>
    <v-toolbar class="route-toolbar" :height="150">
      <v-btn text @click="$router.go(-1)">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title :style="{marginLeft: '10px'}">
        {{ route.name || route.description || '' }}
      </v-toolbar-title>
      <v-spacer />
      <v-container>
        <v-row>
          <v-col v-if="route.description" :cols="2">
            Описание: {{ route.description }}
          </v-col>
          <v-col v-if="route.priority_name" :cols="2">
            Приоритет: {{ route.priority_name }}
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:extension>
        <v-row flex :style="{paddingLeft: '10px'}">
          <nuxt-link
            replace
            :to="`/routes/${routeId}/addresses`"
            class="tab-link"
            tag="div"
            exact-active-class="tab-link-active"
            active-class="tab-link-active"
          >
            Адреса
          </nuxt-link>
        </v-row>
      </template>
    </v-toolbar>

    <nuxt-child />
  </div>
</template>

<style lang="scss">
  .route-toolbar {
    .v-toolbar__content {
      flex-wrap: wrap;
      align-items: top;
    }
  }
</style>
