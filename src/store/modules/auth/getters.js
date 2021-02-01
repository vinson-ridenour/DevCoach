export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token; // converts to true
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
