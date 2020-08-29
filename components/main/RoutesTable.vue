<script>
export default {
  props: {
    routeList: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      headers: [
        { text: 'Наименование', align: 'start', sortable: true, value: 'name' },
        { text: 'Дата', value: 'date' },
        { text: 'База', value: 'base' },
        { text: 'Адреса', value: 'addresses' },
        { text: '', value: 'actions', sortable: false }
      ]
    };
  }
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="routeList"
  >
    <template v-slot:item.name="{ item }">
      <nuxt-link :to="'/routes/' + item.id">
        {{ item.name }}
      </nuxt-link>
    </template>
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
