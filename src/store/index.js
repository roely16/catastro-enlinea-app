import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules
import registro from './registro/index'
import admin from './admin/index'
import login from './login/index'

export default new Vuex.Store({

	modules: {
		registro: registro,
		admin: admin,
		login: login
	},
	
})
