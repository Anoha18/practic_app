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
        { text: 'Вес (кг)', value: 'weight' },
        { text: 'Цена, ₽', value: 'price' },
        { text: 'Время начала', value: 'time_start' },
        { text: 'Время окончания', value: 'time_end' },
        { text: 'Приоритет', value: 'priority_name' },
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
    <template v-slot:[`item.name`]="{ item }">
      <img v-if="item.priority_name === 'Высокий'" :style="{width: '20px', height: '20px'}" src="~assets/images/svg/fire.svg">
      {{ item.name || '' }}
    </template>
    <template v-slot:[`item.address`]="{ item }">
      <p
        :style="{textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap',
                 overflow: 'hidden',
                 maxWidth: '500px'}"
      >
        {{ item.address }}
      </p>
    </template>
    <template v-slot:[`item.actions`]>
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
