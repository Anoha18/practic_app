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
  <div class="route-content-container">
    <v-toolbar class="route-toolbar" :height="45">
      <v-btn text @click="$router.go(-1)">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title :style="{marginLeft: '10px'}">
        {{ route.name || route.description || '' }}
      </v-toolbar-title>
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
          <nuxt-link
            replace
            :to="`/routes/${routeId}/map`"
            class="tab-link"
            tag="div"
            exact-active-class="tab-link-active"
            active-class="tab-link-active"
          >
            Карта
          </nuxt-link>
          <nuxt-link
            replace
            :to="`/routes/${routeId}/info`"
            class="tab-link"
            tag="div"
            exact-active-class="tab-link-active"
            active-class="tab-link-active"
          >
            Описание
          </nuxt-link>
        </v-row>
      </template>
    </v-toolbar>

    <nuxt-child />
  </div>
</template>

<style lang="scss">
  .route-toolbar {
    flex: 0 0;

    // .v-toolbar__content {
    //   flex-wrap: wrap;
    //   align-items: top;
    // }
  }

  .route-content-container {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    min-height: 100%;
  }
</style>
