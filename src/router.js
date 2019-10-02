import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue')
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import(/* webpackChunkName: "pokemonSingle" */ './views/Pokemon.vue')
    },
    {
      path: '/move/:id',
      name: 'move',
      component: () => import(/* webpackChunkName: "moveSingle" */ './views/Move.vue')
    },
  ]
})
