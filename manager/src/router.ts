import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import Pokemon from './views/Pokemon/Pokemon.vue'
import NewPokemon from './views/Pokemon/NewPokemon.vue'
import EditPokemon from './views/Pokemon/EditPokemon.vue'

import Types from './views/Type/Types.vue'
import AddType from './views/Type/AddType.vue'
import EditType from './views/Type/EditType.vue'
import TypeMatrix from './views/Type/TypeMatrix.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', 
      redirect: '/manager' 
    },
    {
      path: '/manager',
      name: 'home',
      component: Home
    },
    {
      path: '/manager/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/manager/pokemon',
      name: 'Pokemon',
      component: Pokemon
    },
    {
      path: '/manager/pokemon/new',
      name: 'NewPokemon',
      component: NewPokemon
    },
    {
      path: '/manager/pokemon/add',
      redirect: '/manager/pokemon/new'
    },
    {
      path: '/manager/pokemon/:id',
      name: 'EditPokemon',
      component: EditPokemon
    },
    {
      path: '/manager/types',
      name: 'Types',
      component: Types
    },
    {
      path: '/manager/type/add',
      name: 'AddType',
      component: AddType
    },
    {
      path: '/manager/type/edit/:id',
      name: 'EditType',
      component: EditType
    },
    {
      path: '/manager/type/matrix',
      name: 'TypeMatrix',
      component: TypeMatrix
    }
  ]
})
export default router