import request from '@/functions/request'
import Swal from 'sweetalert2'

const state = {
    id_solicitud: null,
    solicitudes: [],
    headers_solicitudes: [],
    detalle_solicitud: {
        matriculas: [],
        historial: []
    },
    enable_edit: false,
    bk_detalle_solicitud: null,
    text_snack: null,
    snackbar: false
}

const mutations = {

    setSolicitudes(state, payload){

        state.solicitudes = payload

    },
    setIdSolicitud(state, payload){
        state.id_solicitud = payload

        if (state.id_solicitud) {
            
            this.dispatch('detalleSolicitud')

        }
    },
    setDetalleSolicitud(state, payload){

        state.detalle_solicitud = payload

    },
    setEnableEdit(state){

        state.enable_edit = !state.enable_edit

    },
    setBkDetalleSolicitud(state, payload){

        state.bk_detalle_solicitud = payload

    },
    setTxtSnack(state, payload){
        state.text_snack = payload
    }

}

const actions = {

    getSolicitudes(){

        const data = {
            url: 'obtener_solicitudes'
        }

        request.get(data)
        .then((response) => {

            this.commit('setSolicitudes', response.data)
            

        })

    },
    detalleSolicitud(){

        const data = {
            url: 'detalle_solicitud',
            data: {
                id: this.getters.getIdSolicitud
            }
        }

        request.post(data)
        .then((response) => {

            this.commit('setDetalleSolicitud', response.data)

        })

    },
    cambiar_estado_matricula(state, payload){

        const data = {
            url: 'cambiar_estado_matricula',
            data: payload
        }

        request.post(data)
        .then(() => {

            this.dispatch('detalleSolicitud')

        })

    },
    cambiar_estado_solicitud(state, payload){

        const data = {
            url: 'cambiar_estado_solicitud',
            data: {
                id: this.getters.getIdSolicitud,
                estado: payload
            }
        }

        request.post(data)
        .then((response) => {

            Swal.fire({
                title: response.data.title,
                html: response.data.message,
                icon: response.data.icon,
            })

        })

    },
    // eslint-disable-next-line no-unused-vars
    change_edit(state, payload){

        if (!this.getters.getEnableEdit) {
            
            // Activar la edición y guardar bk

            this.commit('setEnableEdit')
            this.commit('setTxtSnack', 'Edición Activada')
            this.commit('setBkDetalleSolicitud', JSON.stringify(this.getters.getDetalleSolicitud))

        }else{

            const data = {
                url: 'actualizar_detalle_usuario',
                data: this.getters.getDetalleSolicitud
            }
    
            request.post(data)
            .then((response) => {
    
                if (response.data) {
                    
                    this.commit('setEnableEdit')
                    this.commit('setTxtSnack', 'Información Actualizada')

                }
    
            })

        }

    },
    cancel_change(){

        this.commit('setEnableEdit')

        this.commit('setDetalleSolicitud', JSON.parse(this.getters.getBkSolicitud))

    }

}

const getters = {
    getCurrentSolicitud: state => state.current_solicitud,
    getSolicitudes: state => state.solicitudes,
    getIdSolicitud: state => state.id_solicitud,
    getDetalleSolicitud: state => state.detalle_solicitud,
    getEnableEdit: state => state.enable_edit,
    getTxtSnack: state => state.text_snack,
    getBkSolicitud: state => state.bk_detalle_solicitud
}

export default {
    state,
    mutations,
    actions, 
    getters
}