export default ({ store, redirect }) => {
  if (!store.getters['user/access_token']) {
    return redirect('/login');
  }
};
