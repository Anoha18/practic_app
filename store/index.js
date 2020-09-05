export const state = () => ({
  nominatimUrl: 'https://nominatim.openstreetmap.org',
  osrmUrl: 'http://localhost:5000/route/v1',
  headerTitle: '',
  theme: 'dark'
});

export const mutations = {
  SET_HEADER_TITLE(state, headerTitle) {
    state.headerTitle = headerTitle;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const { cookie } = req.headers;

    await dispatch('user/autoLogin', cookie);
  }
};

export const getters = {
  nominatimUrl: s => s.nominatimUrl,
  osrmUrl: s => s.osrmUrl,
  headerTitle: s => s.headerTitle,
  theme: s => s.theme
};
