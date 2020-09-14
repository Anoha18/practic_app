export const state = () => ({
  nominatimUrl: 'https://nominatim.openstreetmap.org',
  osrmUrl: 'http://localhost:5000/route/v1',
  headerTitle: '',
  theme: 'dark',
  globalSnackbar: {
    visible: false,
    text: '',
    timeout: 3000,
    top: true,
    color: 'success'
  },
  globalBottomSheet: {
    visible: false,
    text: '',
    colorText: 'red'
  }
});

export const mutations = {
  SET_HEADER_TITLE(state, headerTitle) {
    state.headerTitle = headerTitle;
  },
  SET_GLOBAL_SNACKBAR(state, globalSnackbar) {
    state.globalSnackbar = globalSnackbar;
  },
  SET_GLOBAL_BOTTOM_SHEET(state, globalBottomSheet) {
    state.globalBottomSheet = {
      ...state.globalBottomSheet,
      ...globalBottomSheet
    };
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
  theme: s => s.theme,
  globalSnackbar: s => s.globalSnackbar,
  globalBottomSheet: s => s.globalBottomSheet
};
