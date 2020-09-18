<script>
import GlobalSnackbar from '~/components/GlobalSnackbar';
import GlobalBottomSheet from '~/components/GlobalBottomSheet';

export default {
  components: {
    GlobalSnackbar,
    GlobalBottomSheet
  },
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
    <global-snackbar />
    <global-bottom-sheet />
  </v-app>
</template>
