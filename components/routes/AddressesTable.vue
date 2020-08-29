<script>
export default {
  props: {
    addressList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        { text: '№', sortable: true, value: 'id' },
        { text: 'Название', align: 'start', sortable: true, value: 'name' },
        { text: 'Адрес', value: 'address' },
        { text: 'Вес', value: 'weight' },
        { text: 'Цена', value: 'price' },
        { text: 'Время начала работы', value: 'time_start' },
        { text: 'Время окончания работы', value: 'time_end' },
        { text: 'Приоритет', value: 'priority' },
        { text: '', value: 'actions', sortable: false }
      ]
    };
  }
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="addressList"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
