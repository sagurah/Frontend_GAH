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
        meta: { title: 'GAH - Dashboard'}
      },
      {
        path: '/dashboard/profile',
        component: () => import('@/views/Dashboard/ProfilePage.vue'),
        meta: { title: 'GAH - Profile' }
      },
      {
        path: '/dashboard/riwayat',
        component: () => import('@/views/Dashboard/RiwayatPage.vue'),
        meta: { title: 'GAH - Riwayat Transaksi' }
      },
      {
        path: '/dashboard/admin/data-kamar',
        component: () => import('@/views/Dashboard/Admin/DataKamarPage.vue'),
        meta: { title: 'GAH - Data Kamar' }
      },
      {
        path: '/dashboard/sm/data-season',
        component: () => import('@/views/Dashboard/SM/DataSeasonPage.vue'),
        meta: { title: 'GAH - Data Season' }
      },
      {
        path: '/dashboard/sm/data-fasilitas',
        component: () => import('@/views/Dashboard/SM/DataFasilitasPage.vue'),
        meta: { title: 'GAH - Data Fasilitas' }
      },
      {
        path: '/dashboard/sm/data-tarif',
        component: () => import('@/views/Dashboard/SM/DataTarifPage.vue'),
        meta: { title: 'GAH - Data Tarif' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title=to.meta.title
  next()
}) 

export default router
