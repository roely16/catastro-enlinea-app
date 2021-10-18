<template>
    <div>
        <v-container>
            <v-row align="center" class="mt-4">
                <v-col cols="12">
                    <h1 class="text-center">Matrículas Registradas</h1>
                </v-col>
            </v-row>
            <v-row align="center" justify="center">
                <v-col cols="4">
                    <v-select v-model="matricula_select" :items="matriculas" item-text="matricula" item-value="matricula" hide-details outlined></v-select>
                </v-col>
                <v-col cols="1">
                    <a v-if="matricula_select" target="_blank" :href="api_cedula + matricula_select" :disabled="!matricula_select" color="primary">Ir</a>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12">
                    <PDFPreview />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import { mapActions, mapMutations, mapState } from 'vuex'

    import PDFPreview from '@/components/HomeClient/PDFPreview'

    export default {
        components: {
            PDFPreview
        },
        methods: {
            ...mapActions('perfil_contribuyente', [
                'obtener_matriculas',
                'obtener_cedula'
            ]),
            ...mapMutations('perfil_contribuyente', [
                'setMatricula'
            ])
        },
        computed: {
            ...mapState('perfil_contribuyente', {
                matriculas: state => state.matriculas,
            }),
            matricula_select: {
                get(){
                    return this.$store.state.perfil_contribuyente.matricula_select
                },
                set(val){
                    this.setMatricula(val)
                }
            },
            api_cedula(){
                return process.env.VUE_APP_CEDULA_URL
            }
        },
        mounted(){
            this.obtener_matriculas()
        }
    }
</script>
