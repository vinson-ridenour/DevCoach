import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue';
// import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },

    {
      path: '/coaches',
      component: () => import('./pages/coaches/CoachesList'),
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true, // value of the id passed in as a prop to this cmpnt
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact -> nested cuz pulling coach id for the contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }, // catch all
  ],
});

// global nav guard, uses metadata from route
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // next(false);
    next('/auth'); // redirect to /auth if not authed
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});
// router.beforeEach(function (to, _, next) {
//   if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
//     next('/auth');
//   } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
//     next('/coaches');
//   } else {
//     next();
//   }
// });

export default router;
