import request from '@/functions/request'

import axios from 'axios'

const namespaced = true

const state = {
    matriculas: [],
    matricula_select: null,
    pdf_url: null,
    trimestres: null,
    trimestre: null,
    emptyMessage: null
}

const mutations = {
    setMatriculas(state, payload){
        state.matriculas = payload
    },
    setMatricula(state, payload){
        state.matricula_select = payload
    },
    setPDFURL(state, payload){
        state.pdf_url = payload
    },
    setTrimestres(state, payload){
        state.trimestres = payload
    },
    setTrimestre(state, payload){
        state.trimestre = payload
    },
    setEmptyMessage(state, payload){
        state.emptyMessage = payload
    }
}

const actions = {
    obtener_matriculas({commit}){

        const user = JSON.parse(localStorage.getItem('catastro_user'))

        const data = {
            url: 'matriculas_contribuyente',
            data: {
                id: user.id
            }
        }

        request.post(data)
        .then((response) => {
            commit('setMatriculas', response.data)
        })
    },
    obtener_cedula({commit, state}){
        
        const url = process.env.VUE_APP_CEDULA_URL + state.matricula_select 

        axios.get(url, { responseType: "blob" })
        .then((response) => {
            const blob = new Blob([response.data], {type: 'application/pdf'});
            const objectUrl = URL.createObjectURL(blob);
            console.log(objectUrl)
            commit('setPDFURL', objectUrl)
        })
    },
    obtener_requerimiento({state, commit}){

        commit('setEmptyMessage', null)
            
        const data = {
            url: 'matricula_interlocutor',
            data: {
                matricula: state.matricula_select
            }
        }

        request.post(data)
        .then((response) => {

            if (response.data.status == 200) {
                
                const url= 'http://udicat.muniguate.com/apis/api_requerimiento/'
                const data_r = {
                    name: 'generar_requerimiento',
                    param: {
                        interlocutor: response.data.interlocutor,
                        fecha: state.trimestre
                    }
                }

                axios.post(url, data_r, { responseType: "blob" })
                .then((response) => {

                    if (response.data.type == 'application/json') {
                        
                        commit('setEmptyMessage', 'No existe un requerimiento de pago para la matrícula seleccionada.')
                         
                    }else{

                        const blob = new Blob([response.data], {type: 'application/pdf'});
                        const objectUrl = URL.createObjectURL(blob);
                        commit('setPDFURL', objectUrl)

                    }
                    
                })

            }
        })

    },
    obtener_trimestres({commit}){

        const url= 'http://udicat.muniguate.com/apis/api_requerimiento/'
        const data = {
            name: 'obtener_trimestres',
            param: {
                
            }
        }

        axios.post(url, data)
        .then((response) => {
            if (response.data.response.status == 200) {
                commit('setTrimestres', response.data.response.result.trimestres)
            }
        })

    },
    clearData({commit}){
        commit('setMatricula', null)
        commit('setPDFURL', null)
        commit('setTrimestre', null)
        commit('setEmptyMessage', null)
    }
}

const getters = {

}

export default {
    namespaced,
    state,
    mutations,
    actions,
    getters
}