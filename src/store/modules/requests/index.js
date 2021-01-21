import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      // all requests here, each request matches a coach id (if that coach logged in, will see those)
      requests: []
    };
  },
  mutations,
  actions,
  getters
};
