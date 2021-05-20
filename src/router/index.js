import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registro from '../views/Registro'
import Admin from '../views/Admin'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/registro',
		name: 'registro',
		component: Registro
	},
	{
		path: '/admin',
		name: 'admin',
		component: Admin
	}
]

const router = new VueRouter({
  routes
})

export default router
