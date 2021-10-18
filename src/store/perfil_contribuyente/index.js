import request from '@/functions/request'

import axios from 'axios'

const namespaced = true

const state = {
    matriculas: [],
    matricula_select: null
}

const mutations = {
    setMatriculas(state, payload){
        state.matriculas = payload
    },
    setMatricula(state, payload){
        state.matricula_select = payload
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
    obtener_cedula(){
        
        const url = 'http://localhost/apps/CedulaCatastral/cedula.php?matricula=92L015712-1'

        // request.get(url)
        // .then((response) => {
        //     console.log(response.data)
        // })
        axios.get(url)
        .then((response) => {
            console.log(response.data)
        })
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