<template>
    <div>
        <v-card min-height="300" max-height="300">
            <v-card-text>
                <v-row>
                    <v-col>
                        <span class="overline">Historial</span>
                    </v-col>
                    <v-col align="end">
                        <v-btn color="primary" icon small>
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-text  v-if="items.length > 0">

                <v-data-table
                    :headers="headers"
                    :items="items"
                    hide-default-footer
                    dense
                    fixed-header
                    height="210"
                    class="historial"
                >
                    <template v-slot:[`item.estado`]="{ item }">

                        <v-chip :color="item.estado == 'P' ? 'warning' : item.estado == 'R' ? 'error' : 'success'" label x-small>
                            {{ item.estado == 'P' ? 'PENDIENTE' : item.estado == 'R' ? 'RECHAZADA' : 'CORRECTA' }}
                        </v-chip>

                    </template>
                </v-data-table>
            </v-card-text>

            <v-card-text v-if="items.length == 0">

                <v-row justify="center" align="center">
                    <v-col align="center" cols="6">
                        <v-img width="100" src="@/assets/img/info.png"></v-img>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="text-center">
                        <span class="overline">
                            NO EXISTEN REGISTROS EN EL HISTORIAL
                        </span>
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
                headers: [
                    {
                        text: 'Comentario',
                        value: 'comentario',
                        sortable: false
                    },
                    {
                        text: 'Usuario',
                        value: 'usuario',
                        sortable: false
                    },
                    {
                        text: 'Fecha',
                        value: 'created_at',
                        sortable: false,
                        align: 'right'
                    },
                ]
            }
        },
        computed: {
            items(){

                const data = this.$store.getters.getDetalleSolicitud

                return data.historial

            }
        }
    }   
</script>

<style>

    .historial.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        font-size: 12px !important;
    }

</style>