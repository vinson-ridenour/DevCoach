import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  // NOT namespaced - read more about this
  // root state of app - ?
  state() {
    // so 'become a coach' button removed when that coach registers
    return {
      token: null,
      userId: null,
      // tokenExpiration: null,
      didAutoLogout: false
    };
  },
  mutations,
  actions,
  getters
};
