export const state = () => ({
  nominatimUrl: 'https://nominatim.openstreetmap.org',
  osrmUrl: 'http://localhost:5000/route/v1'
});

export const getters = {
  nominatimUrl: s => s.nominatimUrl,
  osrmUrl: s => s.osrmUrl
};
