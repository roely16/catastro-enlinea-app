<template>
    <div>

        <v-form v-model="valid" ref="form">
			<v-row class="mb-4 mt-1">
				<v-col cols="12">
					<v-text-field v-model="data.nombres" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Nombres"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="data.apellidos" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Apellidos"></v-text-field>
				</v-col>
				<v-col cols="6">
					<v-select v-model="data.sexo" :rules="[v => !!v]" :items="sexo" autocomplete="off" hide-details outlined label="Sexo"></v-select>
				</v-col>
				<v-col cols="6">
					<v-text-field v-model="data.telefono" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Teléfono"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="data.direccion" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Dirección"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="data.email" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Correo Electrónico"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field @click:append="() => { data.show_pass = !data.show_pass }" :append-icon="!data.show_pass ? 'mdi-eye' : 'mdi-eye-off'" v-model="data.password" :rules="[v => !!v]" :type="!data.show_pass ? 'password' : 'text'" autocomplete="off" hide-details outlined label="Contraseña"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field @click:append="() => { data.show_repite_pass = !data.show_repite_pass }" :append-icon="!data.show_repite_pass ? 'mdi-eye' : 'mdi-eye-off'" v-model="data.repite_password" :rules="[v => !!v]" :type="!data.show_repite_pass ? 'password' : 'text'" autocomplete="off" hide-details outlined label="Repita su contraseña"></v-text-field>
				</v-col>
				<v-col cols="12">
					<v-text-field v-model="data.dpi" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="DPI"></v-text-field>
				</v-col>

				<!-- Requisitos especificos -->
				<v-col cols="12" v-for="(campo, key) in campos_especiales" :key="key">
					<v-row dense>
						<v-col v-if="campo.campo == 'representacion_legal'" cols="12">
							<v-text-field v-model="data.representacion_legal" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Representación Legal"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'carne_abogado'" cols="12">
							<v-text-field v-model="data.carne_abogado" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Carné de Abogado"></v-text-field>
						</v-col>
						<v-col v-if="campo.campo == 'carne_valuador'" cols="12">
							<v-text-field v-model="data.carne_valuador" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Carné de Valuador"></v-text-field>
						</v-col>
					</v-row>
				</v-col>
			</v-row>

			<v-divider class="mt-4"></v-divider>

			<v-row>
				<v-col>
					<v-btn @click="pasos_registro.length >= step ? forward() : registrar()" color="primary">CONTINUAR</v-btn>

					<v-btn @click="back()" class="ml-2" text>ATRÁS</v-btn>
				</v-col>
			</v-row>
        </v-form>

    </div>
</template>

<script>

	import Swal from 'sweetalert2'

	export default {
		data(){
			return{
				step: 2,
				valid: true,
				data: {
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
		methods: {

			forward(){
				
				let result = this.same_pass()

				if (result) {
					
					this.$refs.form.validate()

					if(this.valid){

						this.$store.commit('setStep', 3)

						this.$store.commit('setDatosFormulario', this.data)

					}

				}
				
			},
			back(){
				this.$store.commit('setStep', 1)
			},
			registrar(){

				let result = this.same_pass()

				if (result) {

					this.$refs.form.validate()

					if(this.valid){

						this.$store.commit('setDatosFormulario', this.data)

						this.$store.dispatch('createUser')

					}

				}

			},
			same_pass(){

				if (this.data.password == this.data.repite_password) {

					return true

				}

				Swal.fire({
					icon: 'error',
					title: 'Error...',
					text: 'Las contraseñas no coinciden!',
				})


			}
		},
		computed: {
			pasos_registro(){

				return this.$store.getters.getPasosRegistro

			},
			campos_especiales(){

				return this.$store.getters.getCamposEspeciales
				
			}
		}
	}
</script>

<style>

</style>