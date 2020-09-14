<script>
export default {
  asyncData({ store }) {
    const title = 'Базы';
    store.commit('SET_HEADER_TITLE', title);

    return {
      title
    };
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>

<template>
  <div>
    1
  </div>
</template>
