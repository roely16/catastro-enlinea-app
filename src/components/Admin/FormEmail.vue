<template>
    <div>
        <v-container>
            <v-form @submit.prevent="enviar()" v-model="valid" ref="form">
                <v-row class="mt-2">
                    <v-col cols="12" md="6">
                        <v-text-field v-model="email.asunto" :rules="[v => !!v]" autocomplete="off" hide-details outlined label="Asunto"></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <MailEditor ref="editor"></MailEditor>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col align="center">
                        <v-btn large type="submit" class="elevation-0" color="success">
                            ACEPTAR 
                        </v-btn>
                        <v-btn @click="closeModal()" large class="ml-2 elevation-0" color="secondary">
                            CANCELAR 
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mt-4">
                    <v-col>
                        
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
    </div>
</template>

<script>
    
    import { mapActions } from 'vuex'
    import MailEditor from '@/components/Admin/MailEditor'

    export default {
        components: {
            MailEditor
        },
        data(){
            return{
                valid: true,
                email: {
                    asunto: null,
                    mensaje: null
                }
            }
        },
        methods: {

            enviar(){

                this.$refs.form.validate()

                if (this.valid) {
                    
                    const html = this.$refs.editor.getHTML()

                    this.email.mensaje = html

                    this.enviar_email(this.email)

                }

            },
            ...mapActions([
                'enviar_email'
            ]),
            closeModal(){

                this.email.asunto = null
                this.valid = true
                this.$refs.form.resetValidation()
                this.$refs.editor.clear()
                this.$emit('closeModal')

            }
        }
    }
</script>

<style>

</style>