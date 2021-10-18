import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Registro from '../views/Registro'
import LoginAdmin from '../views/LoginAdmin'
import Home from '../views/Home'
import Solicitudes from '../views/Admin'
import ProductosCatastrales from '../views/ProductosCatastrales'
import CedulaCatastral from '../views/CedulaCatastral'
import ValorUnitario from '../views/ValorUnitario'

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
	},
	{
		path: '/productos_catastrales',
		name: 'productos_catastrales',
		component: ProductosCatastrales,
		children: [
			{
				path: '/home/cedula_catastral',
				name: 'cedula_catastral',
				component: CedulaCatastral,
			},
			{
				path: '/home/valor_unitario',
				name: 'valor_unitario',
				component: ValorUnitario,
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
