<template>
    <div>

         <div class="container-main">
            <!--It contains structure, form sign in-->
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="mt-4">
                                <v-stepper v-model="step">
                                    <v-stepper-header>
                                        <v-row>
                                            <v-col>
                                                <v-stepper-step
                                                    :complete="step > 1"
                                                    step="1"
                                                >
                                                    Tipo de Usuario
                                                </v-stepper-step>
                                            </v-col>

                                            <v-col v-for="(paso, key) in pasos_registro">
                                                <v-stepper-step
                                                    :complete="step > paso.step"
                                                    :step="paso.step"
                                                    :key="key"
                                                >
                                                    {{ paso.nombre }}
                                                </v-stepper-step>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-header>

                                    <v-stepper-items>
                                        <v-stepper-content step="1">
                                            <TipoUsuario></TipoUsuario>
                                        </v-stepper-content>

                                        <v-stepper-content step="2">
                                            <Datos></Datos>
                                        </v-stepper-content>

                                        <v-stepper-content step="3">
                                            <Matriculas></Matriculas>
                                        </v-stepper-content>
                                    </v-stepper-items>
                                </v-stepper>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>

    import TipoUsuario from '@/components/Registro/TipoUsuario'
    import Datos from '@/components/Registro/Datos'
    import Matriculas from '@/components/Registro/Matriculas'

    export default {
        components: {
            Datos,
            TipoUsuario,
            Matriculas
        },  
        data () {
            return {
                e1: null,
            }
        },
        computed: {
            step(){
                return this.$store.getters.getStep
            },
            pasos_registro(){
                return this.$store.getters.getPasosRegistro
            }
        },
    }
</script>

<style>

</style>