<script>
export default {
  computed: {
    globalBottomSheet() {
      return this.$store.getters.globalBottomSheet;
    }
  },
  methods: {
    handleClose(val) {
      console.log(val);
    },
    handleCloseBottomSheet() {
      this.$store.commit('SET_GLOBAL_BOTTOM_SHEET', {
        text: '',
        visible: false
      });
    }
  }
};
</script>

<template>
  <div class="text-center">
    <v-bottom-sheet :value="globalBottomSheet.visible" inset @click:outside="handleCloseBottomSheet">
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          text
          color="error"
          @click="handleCloseBottomSheet"
        >
          Закрыть
        </v-btn>
        <div :style="{color: globalBottomSheet.colorText}" class="my-3" v-html="globalBottomSheet.text || 'Ошибка.<br>Обратитесь в службу поддержки'" />
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
