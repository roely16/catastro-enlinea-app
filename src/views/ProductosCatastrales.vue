<template>
    <div>
        <v-app>
            <NavBar />
            <Home v-if="route == 'productos_catastrales'" />
            <v-container v-else class="ml-0 pl-0 pr-0 mr-0 pt-0" fluid>
                <v-row justify="center">
                    <v-col cols="12" md="10" lg="10">
                        <router-view></router-view>
                    </v-col>
                </v-row>
			</v-container>
        </v-app>
    </div>
</template>

<script>

    // import Sidebar from '@/components/HomeClient/Sidebar'
    import NavBar from '@/components/HomeClient/NavBar'
    import Home from '@/components/HomeClient/Home'

    export default{
        components: {
            // Sidebar,
            NavBar,
            Home
        },
        computed: {
            route(){
                return this.$route.name
            }
        }
    }

</script>