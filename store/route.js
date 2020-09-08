export const state = () => ({
  route: null
});

export const mutations = {
  SET_ROUTE(state, route) {
    state.route = route;
  }
};

export const actions = {
  async getRouteById({ commit }, routeId) {
    let response;
    try {
      response = await this.$axios.$get(`/api/routes/${routeId}`);
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }

    const { result, error } = response;

    if (error) { return { error }; }

    commit('SET_ROUTE', result);
    return { route: result };
  },

  async getAddressList(_, routeId) {
    let response;
    try {
      response = await this.$axios.$get('/api/addresses/list', {
        params: { routeId }
      });
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }

    const { result, error } = response;
    if (error) {
      console.error(error);
      return { error };
    }

    return { addressList: result };
  }
};

export const getters = {
  route: s => s.route
};
