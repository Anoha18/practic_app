export const state = () => ({
  nominatimUrl: 'https://nominatim.openstreetmap.org',
  osrmUrl: 'http://localhost:5000/route/v1',
  headerTitle: ''
});

export const mutations = {
  SET_HEADER_TITLE(state, headerTitle) {
    state.headerTitle = headerTitle;
  }
};

export const getters = {
  nominatimUrl: s => s.nominatimUrl,
  osrmUrl: s => s.osrmUrl,
  headerTitle: s => s.headerTitle
};
