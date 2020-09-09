export const state = () => ({
  route: null,
  addressList: []
});

export const mutations = {
  SET_ROUTE(state, route) {
    state.route = route;
  },
  SET_ADDRESS_LIST(state, addressList) {
    state.addressList = addressList;
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

  async getAddressList({ commit }, routeId) {
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

    commit('SET_ADDRESS_LIST', result || []);
    return { addressList: result };
  }
};

export const getters = {
  route: s => s.route,
  addressList: s => s.addressList
};
