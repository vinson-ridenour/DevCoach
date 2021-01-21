export default {
  // rootGetters - ?
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token; // converts to true, will set this to false once we set token to null in logout action
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};
