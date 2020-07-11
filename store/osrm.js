export const state = () => ({
  url: 'http://localhost:5000'
});

export const getters = {
  url: s => s.url
};
