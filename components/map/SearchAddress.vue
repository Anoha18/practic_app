<script>
import { mdiCrosshairsGps, mdiMagnify } from '@mdi/js';

export default {
  data() {
    return {
      mdiCrosshairsGps,
      mdiMagnify,
      searchText: null,
      model: null
    };
  },
  computed: {
    nominatimUrl() {
      return this.$store.getters.nominatimUrl;
    }
  },
  methods: {
    queryData() {
      let timeout;
      const vm = this;

      return function(value, callback) {
        if (!value) { return; }

        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        async function getAddress() {
          try {
            const { data } = await vm.$axios.get(vm.nominatimUrl + '/search/', {
              params: {
                q: value,
                format: 'json'
                // addressdetails: 1
              }
            });

            callback(data);
          } catch (error) {
            console.error(error);
          }
        }

        timeout = setTimeout(async() => await getAddress(), 300);
      };
    },
    habdleUpdate(val) {
      this.queryData()(val, data => console.log(data));
    }
  }
};
</script>

<template>
  <v-toolbar
    dense
    floating
  >
    <!-- :search-input.sync="searchText" -->
    <v-autocomplete
      hide-details
      :prepend-icon="mdiMagnify"
      single-line
      hide-no-data
      @update:search-input="habdleUpdate"
    />

    <v-btn icon>
      <v-icon>{{ mdiCrosshairsGps }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>
