const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '', component: () => import('pages/IndexPage.vue') },
      { name: 'workout', path: 'workout', component: () => import('pages/WorkoutPage.vue') },
      { name: 'user-settings', path: 'user-settings', component: () => import('pages/UserSettingsPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { name: 'login', path: '', component: () => import('pages/LoginFormPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
