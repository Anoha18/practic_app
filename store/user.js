import JsCookie from 'js-cookie';
import Cookie from 'cookie';
import JwtDecode from 'jwt-decode';

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
  async authUser({ commit, dispatch }, authData) {
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
    dispatch('setToken', user.access_token);

    return { user };
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, 'Bearer');
    commit('SET_TOKEN', token);
  },
  async autoLogin({ commit, dispatch }, cookieStr) {
    if (!cookieStr) { return; }

    const cookies = Cookie.parse(cookieStr);
    const { access_token } = cookies;

    if (!access_token) { return; }
    dispatch('setToken', access_token);

    const jwtData = JwtDecode(access_token);
    const { user_id } = jwtData;
    let response;
    try {
      response = await this.$axios.$get(`/api/users/${user_id}`);
    } catch (error) {
      return console.error(error);
    }

    const { user } = response;
    if (!user) { return; }

    user.access_token = access_token;
    commit('SET_USER', user);
  },
  async logout({ commit }) {
    let response;
    try {
      response = await this.$axios.$get('/api/auth/logout');
    } catch (error) {
      console.error(error);
      return { error };
    }
    const { result } = response;

    if (!result) { return { result }; }

    this.$axios.setToken(false);
    commit('SET_TOKEN', null);
    commit('SET_USER', null);

    return { result };
  }
};

export const getters = {
  user: s => s.user,
  access_token: s => s.access_token
};
