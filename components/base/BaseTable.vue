<script>
export default {
  props: {
    baseTable: {
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
    :items="baseTable"
  >
    <template v-slot:[`item.name`]="{ item }">
      {{ item.name || '' }}
    </template>
    <template v-slot:[`item.address`]="{ item }">
      <p
        :style="{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: '500px',
          margin: 0
        }"
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
