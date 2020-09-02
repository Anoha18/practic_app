<script>
export default {
  computed: {
    theme() { return this.$store.getters.theme; }
  }
};
</script>

<template>
  <v-app :dark="theme === 'dark'">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
