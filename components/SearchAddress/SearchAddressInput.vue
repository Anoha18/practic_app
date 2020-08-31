<script>
import SearchAddressMapModal from './SearchAddressMapModal';

export default {
  components: {
    SearchAddressMapModal
  },
  props: {
    address: {
      type: String,
      default: null
    },
    coords: {
      type: Object,
      default: null
    },
    label: {
      type: String,
      default: 'Адрес'
    },
    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      displayNameLimit: 40,
      searchText: this.address,
      model: null,
      timeout: null,
      addressList: [],
      loading: false,
      selectedAddress: null,
      visibleSearchMapModal: false
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
    },
    async coords(val) {
      if (val) {
        const { data } = await this.reverseQuery(val.lat, val.lng);
        this.addressList = [data];

        this.selectedAddress = data;
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const { coords } = this;
      if (coords) {
        const { data } = await this.reverseQuery(coords.lat, coords.lng);

        this.addressList = [data];
        this.selectedAddress = data;
      }
    },

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
      console.log(value);
      this.$emit('onSelectAddress', value);
    },
    handleSelectedAddressModal(value) {
      if (!value) { return; }

      this.addressList = [value.address];
      this.selectedAddress = value.address;
      this.searchText = value.address.display_name;
      this.handleChangeSearch(value);
    }
  }
};
</script>

<template>
  <div class="search-address__container">
    <v-autocomplete
      ref="searchEl"
      v-model="selectedAddress"
      :label="label"
      :items="addressList"
      :loading="loading"
      :search-input.sync="searchText"
      hide-no-data
      hide-selected
      hide-details
      item-text="display_name"
      placeholder="Начните печатать адрес для поиска"
      return-object
      clearable
      dense
      :required="required"
      :rules="rules"
      @change="(value) => value ? handleChangeSearch({address: value, lat: +value.lat, lng: +value.lon}) : handleChangeSearch(null)"
    />

    <v-btn class="search-address__btn" @click="visibleSearchMapModal = true">
      Карта
    </v-btn>

    <search-address-map-modal :visible="visibleSearchMapModal" @onSelect="handleSelectedAddressModal" @onClose="visibleSearchMapModal = false" />
  </div>
</template>

<style lang="scss" scoped>
  .search-address__container {
    display: flex;
  }

  .search-address__btn {
    margin-left: 10px;
  }
</style>
