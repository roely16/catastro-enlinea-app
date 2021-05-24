import request from '@/functions/request'
import Swal from 'sweetalert2'

const state = {
    id_solicitud: null,
    solicitudes: [],
    headers_solicitudes: [],
    detalle_solicitud: {
        matriculas: [],
        historial: []
    }
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

    }

}

const getters = {
    getCurrentSolicitud: state => state.current_solicitud,
    getSolicitudes: state => state.solicitudes,
    getIdSolicitud: state => state.id_solicitud,
    getDetalleSolicitud: state => state.detalle_solicitud
}

export default {
    state,
    mutations,
    actions, 
    getters
}