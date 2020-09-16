export const state = () => ({
  route: null,
  addressList: [],
  base: null
});

export const mutations = {
  SET_ROUTE(state, route) {
    state.route = route;
  },
  SET_ADDRESS_LIST(state, addressList) {
    state.addressList = addressList;
  },
  SET_BASE(state, base) {
    state.base = base;
  }
};

export const actions = {
  async getRouteById({ commit, dispatch }, routeId) {
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
    await dispatch('getBaseByRouteId', routeId);
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
  },

  async getBaseByRouteId({ commit }, routeId) {
    let response;
    try {
      response = await this.$axios.$get('/api/base/by', {
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

    commit('SET_BASE', result);
    return { result };
  }
};

export const getters = {
  route: s => s.route,
  addressList: s => s.addressList,
  base: s => s.base
};
