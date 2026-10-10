import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/login',
    name:'Userlogin',
    component: () => import('../views/loginUser/loginUser.vue')
  },
  {
    path:'/user',
    name:'userpage',
    component: () => import('../views/userview/userMainpage.vue')
  },
  {
    path:'/admin',
    name:'adminpage',
    component: () => import('../views/adminview/AdminViewpage.vue')
  }
    // for register
  // {
  //   path:'/',
  //   name:'Toolbar_Shop',
  //   component: () => import('../views/toolbar/toolbar.vue'),
  //   children:[
  //     //for children who use toolbar
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
