<script>
export default {
  middleware: ['checkAuth'],
  asyncData({ params }) {
    const { routeId } = params;

    return {
      routeId
    };
  },
  computed: {
    route() {
      return this.$store.getters['route/route'];
    },
    base() {
      return this.$store.getters['route/base'];
    }
  },
  head() {
    return {
      title: `Маршрут №${this.routeId} - Описание`
    };
  }
};
</script>

<template>
  <div class="container-info">
    <v-card>
      <v-card-title>
        {{ route.name || '-' }}
      </v-card-title>
      <v-card-subtitle>
        {{ route.description || '-' }}
      </v-card-subtitle>
      <v-card-text>
        <div>База: №{{ base.id }} {{ base.name ? '- ' + base.name : '' }}</div>
        <div>Дата: {{ route.date || '-' }}</div>
        <div>Время начала: {{ route.time_start || '-' }}</div>
        <div>Время окончания: {{ route.time_end || '-' }}</div>
        <div>Количество адресов: {{ route.address_count || 0 }}</div>
        <div>Общая сумма: {{ route.total_price || 0 }} ₽</div>
        <div>Общий вес: {{ route.total_weight || 0 }} кг.</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
  .container-info {
    padding: 15px 15px 0 15px;
    width: 100%;
    height: 100%;
    flex: 1 1;
  }
</style>
