<script>
import AddressesTable from '~/components/routes/AddressesTable';
import AddAddressModal from '~/components/routes/AddAddressModal';

export default {
  components: {
    AddressesTable,
    AddAddressModal
  },
  middleware: ['checkAuth'],
  async asyncData({ params, store }) {
    const { routeId } = params;
    const { addressList } = await store.dispatch('route/getAddressList', routeId);
    return {
      addressList: addressList || [],
      routeId
    };
  },
  data() {
    return {
      addModalVisible: false
    };
  },
  computed: {
    route() {
      return this.$store.getters['route/route'];
    }
  },
  methods: {
    async reloadAddressList() {
      const { addressList } = await this.$store.dispatch('route/getAddressList', this.routeId);
      this.addressList = addressList;
    }
  },
  head() {
    return {
      title: `Маршрут №${this.routeId} - список адресов`
    };
  }
};
</script>

<template>
  <div :style="{padding: '15px 15px 0 15px', width: '100%', height: '100%'}">
    <div :style="{marginBottom: '10px'}">
      <v-btn rounded @click="addModalVisible = true">
        <v-icon dark>
          mdi-plus
        </v-icon>
        Добавить адрес
      </v-btn>
    </div>

    <v-card>
      <addresses-table :address-list="addressList" />
    </v-card>

    <add-address-modal :route-id="+routeId" :visible="addModalVisible" @onSaveAddress="reloadAddressList" @onClose="addModalVisible = false" />
  </div>
</template>
