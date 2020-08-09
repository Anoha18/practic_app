<script>
import Sidebar from '~/components/defaultLayout/Sidebar';
import Navbar from '~/components/defaultLayout/Navbar';

export default {
  components: {
    Sidebar,
    Navbar
  },
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: true,
      title: 'Вывоз ТБО в Чувашской Республике'
    };
  }
};
</script>

<template>
  <v-app dark>
    <sidebar :clipped="clipped" :drawer="drawer" :mini-variant="miniVariant" />
    <navbar :title="title" :mini-variant="miniVariant" :clipped="clipped" @onChangeMiniVariant="(val) => miniVariant = val" />
    <v-main>
      <v-container :style="{ minHeight: '100%', height: '100%', minWidth: '100%', padding: '0'}">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
