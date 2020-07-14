export const state = () => ({
  url: 'http://localhost:5000/route/v1'
});

export const getters = {
  url: s => s.url
};
