<script>
import { mdiClose } from '@mdi/js';

export default {
  data() {
    return {
      mdiClose
    };
  },
  computed: {
    globalSnackbar() {
      return this.$store.getters.globalSnackbar;
    }
  },
  methods: {
    closeSnackbar() {
      this.$store.commit('SET_GLOBAL_SNACKBAR', {
        ...this.$store.getters.globalSnackbar,
        ...{
          visible: false,
          text: '',
          timeout: 3000,
          top: true,
          color: 'success'
        }
      });
    }
  }
};
</script>

<template>
  <v-snackbar
    :value="globalSnackbar.visible"
    :color="globalSnackbar.color"
    :timeout="globalSnackbar.timeout"
    :top="globalSnackbar.top"
    @input="closeSnackbar"
  >
    {{ globalSnackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        :icon="true"
        @click="closeSnackbar"
      >
        <v-icon>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
