
import request from '@/functions/request'
import Swal from 'sweetalert2'

// eslint-disable-next-line no-unused-vars
import router from '@/router'

const state = {
    tipo_usuario: null,
    step: 1, 
    pasos_registro: [],
    campos_especiales: [],
    datos_formulario: {},
    matriculas: [],
    saved: false,
    nombres_adjuntos: [],
    cantidad_adjuntos: null,
    files: [],
    saving: false
}

const mutations = {

    setTipoUsuario(state, payload){

        state.tipo_usuario = payload

        if (state.tipo_usuario) {
            
            this.dispatch('setPasosRegistro')

            this.dispatch('setCamposEspeciales')

            this.dispatch('setAdjuntos')

        }
        
    },
    setStep(state, payload){
        state.step = payload

        // state.step = 4
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
    },
    clearPasosRegistro(state, payload){
        state.pasos_registro = payload
    },
    setAdjuntos(state, payload){
        state.nombres_adjuntos = payload.nombres_adjuntos
        state.cantidad_adjuntos = payload.archivos_adjuntos
    },
    setFiles(state, payload){
        state.files = payload
    },
    setSaving(state, payload){
        state.saving = payload
    }
    
}

const actions = {

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
    setAdjuntos({state, commit}){

        const data = {
            url: 'obtener_adjuntos_registro',
            data: {
                tipo_usuario: state.tipo_usuario
            }
        }

        request.post(data)
        .then((response) => {
            console.log(response.data)
            commit('setAdjuntos', response.data)
        })

    },
    // eslint-disable-next-line no-unused-vars
    createUser({state, commit, dispatch}){

        commit('setSaving', true)

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
                    html: response.data.message,
                    icon: response.data.icon,
                })
                .then(() => {

                    if (state.files.length > 0) {
                        
                        dispatch('uploadFile', response.data.data)

                    }else{

                        commit('setSaving', false)

                    }

                    commit('setStep', 1)
                    router.push('/')
                    
                })

            }else{

                Swal.fire({
                    title: response.data.title,
                    text: response.data.message,
                    icon: response.data.icon,
                }).then(() => {
                    commit('setSaving', false)
                })

            }

        })

    },
    resetProceso(state){
        
        state.commit('clearPasosRegistro', [])
        state.commit('clearMatriculas', [])
        state.commit('setDatosFormulario', {})
        state.commit('setStep', 1)
        state.commit('setTipoUsuario', null)
        state.commit('setFiles', [])

    },
    uploadFile({state, commit}, payload){

        state.files.forEach(file => {
            
            let formData = new FormData();

            formData.append('file', file)
            formData.append('solicitud_id', payload.id)

            const data = {
                url: 'upload_file_registro',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }            

            request.post(data)
            .then((response) => {
                console.log(response.data)
            })

        });

        commit('setSaving', false)

    }

}

const getters = {

    getTipoUsuario: state => state.tipo_usuario,
    getStep: state => state.step,
    getPasosRegistro: state => state.pasos_registro,
    getCamposEspeciales: state => state.campos_especiales,
    getDatosFormulario: state => state.datos_formulario,
    getMatriculas: state => state.matriculas,
    getNombresAdjuntos: state => state.nombres_adjuntos,
    getSaving: state => state.saving

}

export default {
    state,
    mutations,
    actions,
    getters
}