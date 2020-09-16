<script>
export default {
  props: {
    baseList: {
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
        { text: 'Часы работы', value: 'time' },
        { text: '', value: 'actions', sortable: false }
      ]
    };
  }
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="baseList"
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
    <template v-slot:[`item.time`]="{ item }">
      {{ item.time_start || '' }} - {{ item.time_end || '' }}
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
