import Vue from 'vue'
import VueRouter from 'vue-router'
import Proposta from '../views/AdicionarProposta'
import LoginCorrespondente from '../views/LoginCorrespondente'
import ListarPropostas from "../views/ListarPropostas";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginCorrespondente
  },
  {
    path: '/proposta',
    name: 'Proposta',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Proposta
  },
  {
    path: '/listar-propostas',
    name: 'ListaPrropostas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ListarPropostas
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
