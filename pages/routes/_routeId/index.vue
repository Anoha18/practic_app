<script>
import { mdiArrowLeft } from '@mdi/js';

export default {
  middleware: [
    ({ route, redirect }) => {
      if (route.name === 'routes-routeId') {
        return redirect(`/routes/${route.params.routeId}/addresses`);
      }
    }
  ],
  asyncData({ params, store }) {
    const { routeId } = params;
    const title = 'Маршрут 1';
    store.commit('SET_HEADER_TITLE', title);

    return {
      routeId
    };
  },
  data() {
    return {
      mdiArrowLeft
    };
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
    <v-toolbar>
      <v-btn text @click="$router.go(-1)">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <v-toolbar-title :style="{marginLeft: '10px'}">
        Маршрут 1
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
        </v-row>
      </template>
    </v-toolbar>

    <nuxt-child />
  </div>
</template>
