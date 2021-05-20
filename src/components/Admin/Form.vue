<template>
    <div>
        <v-container>
            <v-row justify="center" align="center">
                <v-col cols="6">
                    <DetalleUsuario></DetalleUsuario>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="12">
                            <Matriculas></Matriculas>
                        </v-col>
                        <v-col cols="12">
                            <Historial></Historial>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row align="center" class="mt-10">
                <v-col align="center">
                    <v-btn @click="cambiar_estado_solicitud('A')" :disabled="allRejected" x-large color="success">
                        ACEPTAR 
                        <v-icon>
                            mdi-check
                        </v-icon>
                    </v-btn>
                    <v-btn @click="cambiar_estado_solicitud('R')" :disabled="allAcepted" class="ml-2" x-large color="error">
                        RECHAZAR 
                        <v-icon>
                            mdi-close-circle
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import DetalleUsuario from '@/components/Admin/DetalleUsuario.vue'
    import Matriculas from '@/components/Admin/Matriculas.vue'
    import Historial from '@/components/Admin/Historial.vue'

    import Swal from 'sweetalert2'

    export default {
        components: {
            DetalleUsuario,
            Matriculas,
            Historial
        },
        methods: {

            cambiar_estado_solicitud(estado){

                // Preguntar si está seguro
                const text = estado == 'R' ? 'Esta apunto de RECHAZAR la solicitud!' : 'Esta apunto de ACEPTAR la solicitud!'
                const btn = estado == 'R' ? 'SI, RECHAZAR!' : 'SI, ACEPTAR!'

                Swal.fire({
                    title: '¿Está seguro?',
                    text: text,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: btn,
                    cancelButtonText: 'CANCELAR'
                }).then((result) => {

                    if (result.isConfirmed) {
                        
                        this.$store.dispatch('cambiar_estado_solicitud', estado)

                    }

                })

            }

        },
        computed: {

            id_solicitud(){

                return this.$store.getters.getIdSolicitud

            },
            allAcepted(){

                const data = this.$store.getters.getDetalleSolicitud

                let matriculas = data.matriculas

                if(matriculas){

                    const aceptadas = matriculas.filter(matricula => matricula.estado == 'A')

                    if(aceptadas.length == matriculas.length  && matriculas.length > 0){

                        return true

                    }

                }

                return false

            },
            allRejected(){

                const data = this.$store.getters.getDetalleSolicitud

                let matriculas = data.matriculas

                if(matriculas){

                    const rechazadas = matriculas.filter(matricula => matricula.estado == 'R')

                    if(rechazadas.length == matriculas.length && matriculas.length > 0){

                        return true

                    }

                }

                return false

            }

        }
    }
</script>

<style>

</style>