<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                <th class="text-left">
                                    Nombre
                                </th>
                                <th class="text-right">
                                    Acciones
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(adjunto, key) in adjuntos" :key="key">
                                    <td>
                                        {{ adjunto.nombre }}
                                    </td>
                                    <td class="text-right">
                                        <a target="_blank" :download="adjunto.nombre" :href="server + 'archivos/' + adjunto.path" icon>
                                            <v-icon>mdi-download</v-icon>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                server: process.env.VUE_APP_API_URL
            }
        },
        computed: {
            adjuntos(){
                return this.$store.getters.getAdjuntos
            }
        }
    }
</script>

<style>

</style>