// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/LandingLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/LandingPage.vue'),
        meta: { title: 'Grand Atma Hotel' },
      },
      {
        path: '/login',
        component: () => import('@/views/LoginPage.vue'),
        meta: { title: 'GAH - Login' }
      },
      {
        path: '/register',
        component: () => import('@/views/RegisterPage.vue'),
        meta: { title: 'GAH - Register' }
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/Dashboard/DashboardPage.vue'),
        meta: { title: 'GAH - Dashboard'},
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/profile',
        component: () => import('@/views/Dashboard/ProfilePage.vue'),
        meta: { title: 'GAH - Profile' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/riwayat',
        component: () => import('@/views/Dashboard/RiwayatPage.vue'),
        meta: { title: 'GAH - Riwayat Transaksi' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/admin/data-kamar',
        component: () => import('@/views/Dashboard/Admin/DataKamarPage.vue'),
        meta: { title: 'GAH - Data Kamar' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 1) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/sm/data-season',
        component: () => import('@/views/Dashboard/SM/DataSeasonPage.vue'),
        meta: { title: 'GAH - Data Season' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 2) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/sm/data-fasilitas',
        component: () => import('@/views/Dashboard/SM/DataFasilitasPage.vue'),
        meta: { title: 'GAH - Data Fasilitas' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 2) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/sm/data-tarif',
        component: () => import('@/views/Dashboard/SM/DataTarifPage.vue'),
        meta: { title: 'GAH - Data Tarif' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 2) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/sm/data-customer',
        component: () => import('@/views/Dashboard/SM/DataCustomerPage.vue'),
        meta: { title: 'GAH - Data Customer' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 2) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/reservasi',
        component: () => import('@/views/Dashboard/ReservasiPage.vue'),
        meta: { title: 'GAH - Reservasi' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 2 || JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 4) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      },
      {
        path: '/dashboard/reservasi/resume',
        component: () => import('@/views/Dashboard/ResumePage.vue'),
        meta: { title: 'GAH - Resume Reservasi' },
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 2 || JSON.parse(localStorage.getItem('currentUser')).ID_ROLE === 4 && localStorage.getItem('resumePemesanan')) {
            next()
          } else {
            next('/unauthorized')
          }
        }
      }
    ]
  },
  {
    path: '/unauthorized',
    component: () => import('@/views/UnauthorizedPage.vue'),
    meta: { title: 'GAH - Unauthorized' }
  },
  {
    path: '/not-found',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: { title: 'GAH - Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
    next()
  }

  if(to.matched.length === 0) {
    next('/not-found')
  }
}) 

export default router
