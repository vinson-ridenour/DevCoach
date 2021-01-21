import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      // userIsCoach: false, - could do this an alternative
      coaches: [
        {
          id: 'c1',
          firstName: 'Maximilian',
          lastName: 'Schwarzmüller',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Julie',
          lastName: 'Jones',
          areas: ['frontend', 'career'],
          description:
            'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 30
        }
        //   id: 'c1',
        //   firstName: 'jon',
        //   lastName: 'w',
        //   areas: ['frontend', 'career'],
        //   description:
        //     "I'm Jon and I've worked as a Frontend Engineer for years. Let me help you become a developer as well!",
        //   hourlyRate: 30
        // },
        // {
        //   id: 'c2',
        //   firstName: 'rb',
        //   lastName: '',
        //   areas: ['backend', 'career'],
        //   description:
        //     "I'm rb and as CTO in an awesome SaaS company, I can advise you with career growth!",
        //   hourlyRate: 30
        // }
        // {
        //   id: 'c3',
        //   firstName: 'vicente',
        //   lastName: 't',
        //   areas: ['frontend', 'career'],
        //   description:
        //     "I'm rb and as CTO in an awesome SaaS company, I can advise you with career growth!",
        //   hourlyRate: 30
        // },
        // {
        //   id: 'c4',
        //   firstName: 'james',
        //   lastName: 'm',
        //   areas: ['frontend', 'backend', 'career'],
        //   description:
        //     "I'm rb and as CTO in an awesome SaaS company, I can advise you with career growth!",
        //   hourlyRate: 30
        // },
        // {
        //   id: 'c5',
        //   firstName: 'ray',
        //   lastName: 'b',
        //   areas: ['frontend', 'backend', 'career'],
        //   description:
        //     "I'm rb and as CTO in an awesome SaaS company, I can advise you with career growth!",
        //   hourlyRate: 30
        // }
      ]
    };
  },
  mutations,
  actions,
  getters // use getters to get the state
};
