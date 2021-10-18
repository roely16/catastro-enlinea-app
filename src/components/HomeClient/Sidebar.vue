<template>
    <div>
        <v-navigation-drawer
            floating
            permanent
            app
            class="elevation-4"
        >   
            <template v-slot:prepend>
                <Profile></Profile>
            </template>

            <v-divider></v-divider>

            <v-list
                dense
                rounded
            >
                <v-list-item
                    v-for="item in options"
                    :key="item.title"
                    link
                    :to="{ name: item.to }"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <template v-slot:append>
                <v-list-item @click="doLogout()" link>
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Salir</v-list-item-title>
                </v-list-item>
            </template>
            
        </v-navigation-drawer>
    </div>
</template>

<script>

    import Profile from '@/components/HomeClient/Profile'

    import { mapActions } from 'vuex'

    export default {
        components: {
            Profile
        },
        data(){
            return{
                options: [
                    { 
                        title: 'Cédula Catastral', 
                        icon: 'mdi-view-dashboard',
                        to: 'cedula_catastral' 
                    },
                    // { 
                    //     title: 'Valor Unitario', 
                    //     icon: 'mdi-forum',
                    //     to: 'valor_unitario' 
                    // },
                ]
            }
        },
        methods: {
            ...mapActions('login_client', [
                'doLogout'
            ])
        }
    }
</script>