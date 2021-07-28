import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registro from '../views/Registro'
import LoginAdmin from '../views/LoginAdmin'
import Home from '../views/Home'
import Solicitudes from '../views/Admin'

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
		component: LoginAdmin
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			{
				path: '/home/solicitudes_pendientes',
				name: 'solicitudes_pendientes',
				component: Solicitudes,
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
