export const state = () => ({
  user: null,
  token: null
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

export const actions = {
  async authUser({ commit }, authData) {
    const result = await this.$axios.$post('/api/auth/local', authData);
    console.log(result);
  }
};

export const getters = {
  user: s => s.user,
  token: s => s.token
};
