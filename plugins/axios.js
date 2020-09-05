export default ({ $axios, redirect }) => {
  $axios.onError((error) => {
    const { response } = error;
    const { status, statusText } = response;
    console.error(`AXIOS ERROR: ${status || ''} - ${statusText || ''}`);

    if (+status === 401) {
      return redirect('/login');
    }
  });
};
