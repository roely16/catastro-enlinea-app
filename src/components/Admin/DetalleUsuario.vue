<template>
    <div>
        <v-card min-height="625">
            <v-card-text v-if="data">
                <v-row align="center">
                    <v-col cols="5">
                        <span class="overline">Datos del Usuario</span>
                    </v-col>
                    <v-col align="end">
                        <v-chip label small color="primary">{{ data.tipo }}</v-chip>
                        <v-btn @click="change_edit()" :color="!enable_edit ? 'primary' : 'success'" icon small class="ml-2">
                            <v-icon>
                                {{ !enable_edit ? 'mdi-pencil' : 'mdi-content-save' }}
                            </v-icon>
                        </v-btn>

                        <v-btn @click="cancel()" v-if="enable_edit" color="secondary" icon small class="ml-1">
                            <v-icon>
                                mdi-close-circle
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text v-if="data" class="mt-0 pt-0">

                <v-row class="mb-4 mt-1">
                    <v-col cols="12">
                        <v-text-field :disabled="!enable_edit" v-model="data.nombres" autocomplete="off" hide-details outlined label="Nombres"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.apellidos" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Apellidos"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="data.sexo" :disabled="!enable_edit" :items="sexo" autocomplete="off" hide-details outlined label="Sexo"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="data.telefono" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Teléfono"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.direccion" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Dirección"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.email" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Correo Electrónico"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.dpi" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="DPI"></v-text-field>
                    </v-col>

                    <!-- Requisitos especificos -->
                    <v-col cols="12" v-for="(campo, key) in campos_especiales" :key="key">
                        <v-row dense>
                            <v-col v-if="campo.campo == 'representacion_legal'" cols="12">
                                <v-text-field v-model="data.representacion_legal" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Representación Legal"></v-text-field>
                            </v-col>
                            <v-col v-if="campo.campo == 'carne_abogado'" cols="12">
                                <v-text-field v-model="data.carne_abogado" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Carné de Abogado"></v-text-field>
                            </v-col>
                            <v-col v-if="campo.campo == 'carne_valuador'" cols="12">
                                <v-text-field v-model="data.carne_valuador" :disabled="!enable_edit" autocomplete="off" hide-details outlined label="Carné de Valuador"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <!-- Modificar la información del usuario -->
                <v-row>
                    <v-col>
                        
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <v-snackbar :timeout="1000" bottom v-model="snackbar">
            {{ txt_nack }}

            <template v-slot:action="{ attrs }">
                <v-btn text v-bind="attrs" @click="snackbar = false">
                    <v-icon>
                        mdi-close
                    </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    export default {
        data(){
            return{

                // datos: {
				// 	nombres: null,
				// 	apellidos: null,
				// 	sexo: null,
				// 	telefono: null,
				// 	direccion: null,
				// 	email: null,
				// 	password: null,
				// 	repite_password: null,
				// 	dpi: null,
				// 	representacion_legal: null,
				// 	carne_abogado: null,
				// 	carne_valuador: null,
				// 	show_pass: false,
				// 	show_repite_pass: false
				// },
                sexo: [
                    {
                        text: 'Hombre',
                        value: 'H'
                    },
                    {
                        text: 'Mujer',
                        value: 'M'
                    }
                ],
                snackbar: false,
                text: 'Example'
                

            }
        },
        methods: {

            change_edit(){

                this.$store.dispatch('change_edit')

                this.snackbar = true

            },
            cancel(){

                this.$store.dispatch('cancel_change')

            }

        },
        computed: {
            data(){

                const detalle = this.$store.getters.getDetalleSolicitud

                return detalle.usuario

            },
            campos_especiales(){

                const detalle = this.$store.getters.getDetalleSolicitud

                return detalle.campos_especiales

            },
            enable_edit(){

                return this.$store.getters.getEnableEdit

            },
            txt_nack(){

                return this.$store.getters.getTxtSnack

            }
        }
    }
</script>

<style>

</style>