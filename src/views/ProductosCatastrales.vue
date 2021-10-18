<template>
    <div>
        <v-app>
            <Sidebar />

            <v-container class="home-bk ml-0 pl-0 pr-0 mr-0 pt-0" fluid>
				<router-view></router-view>
			</v-container>
            
        </v-app>
    </div>
</template>

<script>

    import Sidebar from '@/components/HomeClient/Sidebar'

    export default{
        components: {
            Sidebar
        },
        data () {
            return {
               
            }
        },
    }

</script>