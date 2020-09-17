export default ({ $axios, redirect, store }) => {
  $axios.onError(async(error) => {
    const { response, config } = error || {};
    const { status, statusText } = response || {};
    console.error(`AXIOS ERROR: ${status || ''} - ${statusText || ''}`);
    console.log('AXIOS ERROR RESPONSE: ', response);
    console.log('AXIOS ERROR CONFIG: ', config);
    if (+status === 401) {
      const { user, access_token, error } = await store.dispatch('user/refreshToken');

      if (error) { return redirect('/login'); }
      store.commit('user/SET_USER', user);
      store.dispatch('user/setToken', access_token);
      config.headers.Authorization = 'Bearer ' + access_token;
      return $axios.request(config);
    }

    throw new Error(error);
  });

  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${store.getters['user/access_token']}`;
  });
};
