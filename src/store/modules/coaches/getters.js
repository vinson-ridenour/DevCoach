export default {
  // made up getter name
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    // returns truthy if we have coaches
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = state.coaches; // or getters.coaches, same thing
    const userId = rootGetters.userId;
    // if we find at least 1 coach with same user id, returns true
    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60; // more than 1 min ago, returns boolean
  }
};
