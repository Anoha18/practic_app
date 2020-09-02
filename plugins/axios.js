export default ({ $axios, redirec }) => {
  $axios.onError((error) => {
    console.log('HERE');
    console.error(error);
  });
};
