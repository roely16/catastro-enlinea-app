<template>
    <div>
        <v-row class="mt-2" justify="center">
           
           <v-col>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="matricula" hide-details outlined label="Agregar Matricula" @click:append="matricula ? agregar() : null" append-icon="mdi-plus"></v-text-field>
                    </v-col>
                
                </v-row>
           </v-col>
           <v-col>
                <v-row justify="center">
                    <v-col cols="12">
                        <v-card shaped min-height="150" outlined>

                            <v-card-text v-if="matriculas.length == 0" align="center" class="text-center">
                                <v-row justify="center" align="center">
                                    <v-col cols="6">
                                        <v-img width="100" src="@/assets/img/info.png"></v-img>
                                    </v-col>
                                </v-row>
                                <h5 class="mt-2">Debe de ingresar al menos una matricula</h5>
                            </v-card-text>
                            <v-list-item v-for="(matricula, key) in matriculas" :key="key" dense>
                                <v-list-item-content>
                                    <v-list-item-title>{{ matricula }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon color="error">mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-card>
            
                    </v-col>
                </v-row>
           </v-col>
            
                        
        </v-row>

        <v-divider class="mt-10"></v-divider>
        <v-row>
            <v-col>
                <v-btn @click="registrar()" color="primary">CONTINUAR</v-btn>

				<v-btn @click="back()" class="ml-2" text>ATRÁS</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
	export default {
		data(){
			return{
				step: 3,
                matricula: null
			}
		},
		methods: {

            agregar(){

                this.$store.commit('setMatricula', this.matricula)
                this.matricula = null

            },
            registrar(){

                this.$store.dispatch('createUser')

            },
			back(){

				this.$store.commit('setStep', 2)

			}

		},
        computed: {
            datos_formulario(){

                return this.$store.getters.getDatosFormulario

            },
            matriculas(){

                return this.$store.getters.getMatriculas

            }
        }
	}
</script>