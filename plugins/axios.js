export default ({ $axios, redirect }) => {
  $axios.onError((error) => {
    console.log('HERE');
    console.log(error.response);
  });
};
