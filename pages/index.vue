<script>
import Map from '~/components/map/Map';

export default {
  components: {
    Map
  },
  head: {
    title: 'Главная'
  }
};
</script>

<template>
  <div :style="{height: '100%'}">
    <Map />
  </div>
</template>
