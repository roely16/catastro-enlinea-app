import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import request from '@/functions/request'
import Swal from 'sweetalert2'

import router from '@/router'

export default new Vuex.Store({

	state: {
		tipo_usuario: null,
		step: 1, 
		pasos_registro: [],
		campos_especiales: [],
		datos_formulario: {},
		matriculas: [],
		saved: false
	},
	mutations: {

		setTipoUsuario(state, payload){

			state.tipo_usuario = payload.id

			this.dispatch('setPasosRegistro')

			this.dispatch('setCamposEspeciales')

		},
		setStep(state, payload){
			state.step = payload
		},
		setPasosRegistro(state, payload){

			state.pasos_registro = payload

		},
		setCamposEspeciales(state, payload){

			state.campos_especiales = payload

		},
		setDatosFormulario(state, payload){

			state.datos_formulario = payload

		},
		setMatricula(state, payload){

			state.matriculas.push(payload)
		},
		removeMatricula(state, payload){

			state.matriculas.splice(payload, 1)

		},
		clearMatriculas(state, payload){
			state.matriculas = payload
		}
		
	},
	actions: {

		setPasosRegistro(state){

			const data = {
				url: 'pasos_registro',
				data: {
					tipo_usuario: this.getters.getTipoUsuario
				}
			}

			request.post(data)
			.then((response) => {
				
				state.commit('setPasosRegistro', response.data)

			})

		},
		setCamposEspeciales(state){

			const data = {
				url: 'obtener_campos_especiales',
				data: {
					tipo_usuario: this.getters.getTipoUsuario
				}
			}

			request.post(data)
			.then((response) => {
				
				state.commit('setCamposEspeciales', response.data)

			})
			

		},
		createUser(state){

			const data = {
				url: 'registrar_solicitud',
				data: {
					tipo_usuario: this.getters.getTipoUsuario,
					datos_formulario: this.getters.getDatosFormulario,
					matriculas: this.getters.getMatriculas
				}
			}

			request.post(data)
			.then((response) => {
				
				if (response.data.status == 200) {

					Swal.fire({
						title: response.data.title,
						text: response.data.message,
						icon: response.data.icon,
					})
					.then(() => {

						state.commit('setStep', 1)
						state.commit('clearMatriculas', [])
						router.push('/')

					})

				}else{

					Swal.fire({
						title: response.data.title,
						text: response.data.message,
						icon: response.data.icon,
					})

				}

			})

		}

	},
	modules: {
	},
	getters: {

		getTipoUsuario: state => state.tipo_usuario,
		getStep: state => state.step,
		getPasosRegistro: state => state.pasos_registro,
		getCamposEspeciales: state => state.campos_especiales,
		getDatosFormulario: state => state.datos_formulario,
		getMatriculas: state => state.matriculas

	}
})
