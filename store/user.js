export const state = () => ({
  user: null,
  access_token: null
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, access_token) {
    state.access_token = access_token;
  }
};

export const actions = {
  async authUser({ commit }, authData) {
    let respone;
    try {
      respone = await this.$axios.$post('/api/auth/local', authData);
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }

    const { error, user, info } = respone;

    if (error) { return { error }; }
    if (info) { return { info }; }

    commit('SET_USER', user);
    commit('SET_TOKEN', user.access_token);

    return { user };
  }
};

export const getters = {
  user: s => s.user,
  access_token: s => s.access_token
};
