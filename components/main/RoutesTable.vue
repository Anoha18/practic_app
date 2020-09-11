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
        { text: 'Время начала', value: 'time_start' },
        { text: 'Время окончания', value: 'time_end' },
        // { text: 'База', value: 'base' },
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
    <template v-slot:[`item.name`]="{ item }">
      <div v-if="item.priority_name === 'Высокий'" class="route-table__icon-container">
        <img src="~assets/images/svg/fire.svg">
      </div>
      <nuxt-link :to="'/routes/' + item.id">
        {{ item.name }}
      </nuxt-link>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
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
    <template v-slot:[`item.addresses`]="{ item }">
      <nuxt-link :to="`/routes/${item.id}/addresses`">
        Адреса({{ item.address_count || 0 }})
      </nuxt-link>
    </template>
  </v-data-table>
</template>

<style lang="scss">
  .route-table__icon-container {
    display: inline-block;

    img {
      object-fit: cover;
      height: 20px;
      width: 20px;
    }
  }

</style>
