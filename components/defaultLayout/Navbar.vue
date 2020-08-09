<script>
export default {
  props: {
    clipped: {
      type: Boolean,
      required: true
    },
    miniVariant: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    handleChangeMiniVariant() {
      this.$emit('onChangeMiniVariant', !this.miniVariant);
    }
  }
};
</script>

<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-btn
      icon
      @click.stop="handleChangeMiniVariant"
    >
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-avatar color="blue" :size="35">
      <span class="white--text">ВА</span>
    </v-avatar>
    <div class="ml-3">
      Владислав Анохин
    </div>
  </v-app-bar>
</template>
