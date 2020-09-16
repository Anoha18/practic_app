export default ({ $axios, redirect, store }) => {
  $axios.onError(async(error) => {
    const { response, config } = error || {};
    const { status, statusText } = response || {};
    // console.log('RESPONSE: ', response);
    // console.log('REQUEST: ', request);
    console.error(`AXIOS ERROR: ${status || ''} - ${statusText || ''}`);
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
};
