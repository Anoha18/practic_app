<script>
import { mdiCrosshairsGps, mdiMagnify } from '@mdi/js';

export default {
  props: {
    address: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      displayNameLimit: 40,
      mdiCrosshairsGps,
      mdiMagnify,
      searchText: this.address,
      model: null,
      timeout: null,
      addressList: [],
      loading: false,
      selectedAddress: null
    };
  },
  computed: {
    nominatimUrl() {
      return this.$store.getters.nominatimUrl;
    }
  },
  watch: {
    async searchText(newVal) {
      await this.handleUpdateSearchText(newVal);
    },
    address(value) {
      this.searchText = value;
    }
  },
  methods: {
    async searchQuery(value) {
      try {
        const { data } = await this.$axios.get(this.nominatimUrl + '/search/', {
          params: {
            q: value,
            format: 'json'
            // addressdetails: 1
          }
        });

        return {
          data
        };
      } catch (error) {
        console.error(error);
        return {
          error: error.message
        };
      }
    },
    async handleUpdateSearchText(value) {
      if (!value) { return; }
      this.loading = true;

      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      await this.$nextTick();

      this.timeout = setTimeout(async() => {
        const { data, error } = await this.searchQuery(value);
        this.loading = false;

        if (error) { return; }

        this.addressList = data;
      }, 300);
    },
    getCurrentLocation() {
      const vm = this;

      navigator.geolocation.getCurrentPosition(async({ coords }) => {
        const { data, error } = await this.reverseQuery(coords.latitude, coords.longitude);

        if (error) { return console.error(error); }

        this.addressList = [data];
        this.$refs.searchEl.focus();
      }, error => console.error(error));
    },
    async reverseQuery(lat, lon) {
      try {
        const { data } = await this.$axios.get(this.nominatimUrl + '/reverse', {
          params: {
            lat,
            lon,
            format: 'json'
            // addressdetails: 1
          }
        });

        return {
          data
        };
      } catch (error) {
        console.error(error);
        return {
          error: error.message
        };
      }
    },
    handleChangeSearch(value) {
      this.$emit('onSelect', value);
    }
  }
};
</script>

<template>
  <v-toolbar dense bottom>
    <v-autocomplete
      ref="searchEl"
      v-model="selectedAddress"
      :items="addressList"
      :loading="loading"
      :search-input.sync="searchText"
      hide-no-data
      hide-selected
      hide-details
      item-text="display_name"
      placeholder="Начните печатать для поиска"
      :prepend-icon="mdiMagnify"
      return-object
      clearable
      @change="handleChangeSearch"
    />

    <v-btn icon @click="getCurrentLocation">
      <v-icon>{{ mdiCrosshairsGps }}</v-icon>
    </v-btn>

    <!-- <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn> -->
  </v-toolbar>
</template>
