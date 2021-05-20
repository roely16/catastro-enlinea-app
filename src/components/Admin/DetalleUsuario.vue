<template>
    <div>
        <v-card min-height="625">
            <v-card-text>
                <span class="overline">Datos del Usuario</span>
            </v-card-text>
            <v-card-text v-if="data" class="mt-0 pt-0">

                <v-row class="mb-4 mt-1">
                    <v-col cols="12">
                        <v-text-field readonly v-model="data.nombres" autocomplete="off" hide-details outlined label="Nombres"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.apellidos" readonly autocomplete="off" hide-details outlined label="Apellidos"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select v-model="data.sexo" readonly :items="sexo" autocomplete="off" hide-details outlined label="Sexo"></v-select>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="data.telefono" readonly autocomplete="off" hide-details outlined label="Teléfono"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.direccion" readonly autocomplete="off" hide-details outlined label="Dirección"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.email" readonly autocomplete="off" hide-details outlined label="Correo Electrónico"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="data.dpi" readonly autocomplete="off" hide-details outlined label="DPI"></v-text-field>
                    </v-col>

                    <!-- Requisitos especificos -->
                    <v-col cols="12" v-for="(campo, key) in campos_especiales" :key="key">
                        <v-row dense>
                            <v-col v-if="campo.campo == 'representacion_legal'" cols="12">
                                <v-text-field v-model="data.representacion_legal" readonly autocomplete="off" hide-details outlined label="Representación Legal"></v-text-field>
                            </v-col>
                            <v-col v-if="campo.campo == 'carne_abogado'" cols="12">
                                <v-text-field v-model="data.carne_abogado" readonly autocomplete="off" hide-details outlined label="Carné de Abogado"></v-text-field>
                            </v-col>
                            <v-col v-if="campo.campo == 'carne_valuador'" cols="12">
                                <v-text-field v-model="data.carne_valuador" readonly autocomplete="off" hide-details outlined label="Carné de Valuador"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{

                datos: {
					nombres: null,
					apellidos: null,
					sexo: null,
					telefono: null,
					direccion: null,
					email: null,
					password: null,
					repite_password: null,
					dpi: null,
					representacion_legal: null,
					carne_abogado: null,
					carne_valuador: null,
					show_pass: false,
					show_repite_pass: false
				},
                sexo: [
                    {
                        text: 'Hombre',
                        value: 'H'
                    },
                    {
                        text: 'Mujer',
                        value: 'M'
                    }
                ]

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

            }
        }
    }
</script>

<style>

</style>