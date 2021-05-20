<template>
    <div>
        <v-row align="center">
            <v-col cols="4">
                <v-text-field v-model="search" outlined label="Buscar" append-icon="mdi-magnify"></v-text-field>
            </v-col>
            <v-col cols="6">

            </v-col>
            <v-col justify="end" cols="2">
                <v-img src="@/assets/img/logo_muni.png"></v-img>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-data-table
                    :headers="table_data.headers"
                    :items="table_data.items"
                    :items-per-page="5"
                    class="elevation-0"
                    :search="search"
                    hide-default-footer
                >
                    <template v-slot:[`item.action`]="{ item }">
                        
                        <v-btn icon color="success" @click="detalle(item)">
                            <v-icon>
                                mdi-eye
                            </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

        <Modal ref="modal" :fullscreen="fullscreen" :title="title">
            <template #form>
                <Form></Form>
            </template>
        </Modal>

    </div>
</template>

<script>

    import Modal from '@/components/Modal'
    import Form from '@/components/Admin/Form'

    export default {
        components: {
            Modal,
            Form
        },
        data(){
            return{
                search: null,
                title: null,
                width: null,
                fullscreen: false
            }
        },
        methods: {

            obtener_solicitudes(){

                this.$store.dispatch('getSolicitudes')

            },
            detalle(item){

                this.$store.commit('setIdSolicitud', item.id)
                this.title = "Detalle de la Solicitud No. " + item.id
                this.fullscreen = true
                this.$refs.modal.show()

            }

        },
        created(){

            this.obtener_solicitudes()

        },
        computed: {

            table_data(){

                return this.$store.getters.getSolicitudes
            }

        }
    }
</script>

<style>

</style>