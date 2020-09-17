import Cookie from 'cookie';
import JwtDecode from 'jwt-decode';

export const state = () => ({
  user: null,
  access_token: null,
  refresh_token: null
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, access_token) {
    state.access_token = access_token;
  },
  SET_REFRESH_TOKEN(state, refresh_token) {
    state.refresh_token = refresh_token;
  }
};

export const actions = {
  async authUser({ commit, dispatch }, authData) {
    let respone;
    try {
      respone = await this.$axios.$post('/api/auth/local', authData);
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }

    const { error, user, info } = respone;

    if (error) { return { error }; }
    if (info) { return { info }; }

    commit('SET_USER', user);
    dispatch('setToken', user.access_token);
    commit('SET_REFRESH_TOKEN', user.refresh_token);

    return { user };
  },
  setToken({ commit }, token) {
    this.$axios.setToken(token, 'Bearer');
    commit('SET_TOKEN', token);
  },
  async autoLogin({ commit, dispatch }, cookieStr) {
    if (!cookieStr) { return; }

    const cookies = Cookie.parse(cookieStr);
    const { access_token, refresh_token } = cookies || {};
    commit('SET_REFRESH_TOKEN', refresh_token || null);

    if (access_token) {
      dispatch('setToken', access_token);
      const jwtData = JwtDecode(access_token);
      const { user_id } = jwtData;

      const { user } = await dispatch('getUserById', user_id);

      if (!user) { return; }

      user.access_token = access_token;
      commit('SET_USER', user);
    } else if (!access_token && refresh_token) {
      const { user } = await dispatch('refreshToken');
      if (user) {
        commit('SET_USER', user);
      }
    }
  },
  async logout({ commit }) {
    let response;
    try {
      response = await this.$axios.$get('/api/logout');
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }
    const { result } = response;

    if (!result) { return { result }; }

    this.$axios.setToken(false);
    commit('SET_TOKEN', null);
    commit('SET_USER', null);
    commit('SET_REFRESH_TOKEN', null);
    this.$cookies.remove('access_token');
    this.$cookies.remove('refresh_token');

    return { result };
  },
  // обновление токена
  async refreshToken({ commit, dispatch, getters }) {
    const refresh_token = getters.refresh_token;

    if (!refresh_token) { return { error: 'Not found refresh token' }; }
    let response;
    try {
      response = await this.$axios.$post('/api/auth/token/refresh', {
        refresh_token
      });
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }

    const { user, error } = response;

    if (error) {
      this.$axios.setToken(false);
      commit('SET_TOKEN', null);
      commit('SET_REFRESH_TOKEN', null);
      this.$cookies.remove('access_token');
      this.$cookies.remove('refresh_token');
      return { error };
    }

    const { access_token, refresh_token: new_refresh_token } = user;
    dispatch('setToken', access_token);
    commit('SET_REFRESH_TOKEN', new_refresh_token);
    this.$cookies.set('access_token', access_token);
    this.$cookies.set('refresh_token', new_refresh_token);

    return {
      access_token,
      refresh_token: new_refresh_token,
      user
    };
  },
  // получение пользоватля по id
  async getUserById({ commit }, userId) {
    let response;
    try {
      response = await this.$axios.$get(`/api/users/${userId}`);
    } catch (error) {
      console.error(error.message);
      return { error: error.message };
    }

    const { user } = response || {};
    return { user: user || null };
  }
};

export const getters = {
  user: s => s.user,
  access_token: s => s.access_token,
  refresh_token: s => s.refresh_token
};
