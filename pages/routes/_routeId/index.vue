<script>
export default {
  middleware: [
    ({ route, redirect }) => {
      if (route.name === 'routes-routeId') {
        return redirect(`/routes/${route.params.routeId}/addresses`);
      }
    }
  ],
  asyncData({ params }) {
    const { routeId } = params;

    return {
      routeId
    };
  }
};
</script>

<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Маршрут 1</v-toolbar-title>
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
