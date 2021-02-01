import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    // so 'become a coach' button removed when that coach registers
    return {
      token: null,
      userId: null,
      didAutoLogout: false,
    };
  },
  mutations,
  actions,
  getters,
};
