<script>
import Sidebar from '~/components/defaultLayout/Sidebar';
import Navbar from '~/components/defaultLayout/Navbar';
import GlobalSnackbar from '~/components/GlobalSnackbar';

export default {
  components: {
    Sidebar,
    Navbar,
    GlobalSnackbar
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: true
    };
  },
  computed: {
    headerTitle() {
      return this.$store.getters.headerTitle;
    }
  }
};
</script>

<template>
  <v-app dark>
    <sidebar :clipped="clipped" :drawer="drawer" :mini-variant="miniVariant" @onChangeDrawer="(val) => drawer = val" />
    <navbar :title="headerTitle" :mini-variant="miniVariant" :clipped="clipped" @onChangeMiniVariant="(val) => miniVariant = val" />
    <v-main>
      <v-container :style="{ minHeight: '100%', height: '100%', minWidth: '100%', padding: '0'}">
        <nuxt />
      </v-container>
    </v-main>

    <global-snackbar />
  </v-app>
</template>
