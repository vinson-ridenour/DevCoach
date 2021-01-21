export default {
  // need rootGetters cuz userId is part of root store
  requests(state, getters, rootState, rootGetters) {
    // gets all requests
    // return state.requests;
    const coachId = rootGetters.userId;
    return state.requests.filter(req => req.coachId === coachId);
  },
  hasRequests(state, getters) {
    // true if we have at least 1 req
    // return state.requests && state.requests.length > 0;

    // checking the filtered requests from above
    return getters.requests && getters.requests.length > 0;
  }
};
