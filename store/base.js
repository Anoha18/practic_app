export const actions = {
  async getBaseList({ commit, getters }) {
    try {
      const { error, result } = await this.$axios.$get('/api/base/list');

      if (error) {
        console.error(error);
        return commit('SET_GLOBAL_BOTTOM_SHEET', {
          ...getters.globalBottomSheet,
          ...{
            visible: true,
            text: 'Произошла ошибка при загрузке списка баз. Сообщение ошибки: ' + error
          }
        });
      }

      return { result };
    } catch (error) {
      console.error(error);
      return commit('SET_GLOBAL_BOTTOM_SHEET', {
        ...getters.globalBottomSheet,
        ...{
          visible: true,
          text: 'Произошла ошибка при загрузке списка баз. Сообщение ошибки: ' + error
        }
      });
    }
  }
};
