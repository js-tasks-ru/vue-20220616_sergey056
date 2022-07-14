import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/03-ScrollBehavior'),

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/PageMeetups'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
        scrollPosition: {
          left: 0,
          top: 0,
        },
      },
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      component: () => import('../views/PageMeetup'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/PageMeetupDescription'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/PageMeetupAgenda'),
        },
      ],
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
      };
    } else if (to.meta['saveScrollPosition'] && from.meta['saveScrollPosition']) {
      return from.meta.scrollPosition;
    } else if (to.meta['saveScrollPosition'] || from.meta['saveScrollPosition']) {
      return {
        left: 0,
        top: 0,
      };
    } else {
      return {
        left: 0,
        top: 0,
      };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (from.meta.saveScrollPosition && to.meta.saveScrollPosition) {
    from.meta.scrollPosition.top = window.scrollY;
  }
  return next();
});
