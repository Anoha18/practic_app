<script>
import { mdiCrosshairsGps, mdiMagnify } from '@mdi/js';

export default {
  data() {
    return {
      mdiCrosshairsGps,
      mdiMagnify
    };
  },
  methods: {
    handleChangeText(text) {
      console.log('text: ', text);
    }
  }
};
</script>

<template>
  <v-toolbar
    dense
    floating
  >
    <v-text-field
      hide-details
      :prepend-icon="mdiMagnify"
      single-line
      @keydown="handleChangeText"
    />
    <!-- @change="handleChangeText" -->

    <v-btn icon>
      <v-icon>{{ mdiCrosshairsGps }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>
