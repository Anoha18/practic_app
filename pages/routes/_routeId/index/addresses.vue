<script>
import AddressesTable from '~/components/routes/AddressesTable';
import AddAddressModal from '~/components/routes/AddAddressModal';

export default {
  components: {
    AddressesTable,
    AddAddressModal
  },
  middleware: ['checkAuth'],
  asyncData({ params }) {
    const { routeId } = params;
    return {
      addressList: [
        {
          id: 1,
          name: '123',
          address: 'Чебоксары',
          weight: '100',
          price: '2000',
          time_start: '8:00',
          time_end: '21:00',
          priority: 'Важно'
        }
      ],
      routeId
    };
  },
  data() {
    return {
      addModalVisible: false
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

    <add-address-modal :route-id="+routeId" :visible="addModalVisible" @onClose="addModalVisible = false" />
  </div>
</template>
