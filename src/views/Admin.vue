<template>
    <div>
        <v-container>
            <v-card min-height="750" elevation="3" shaped outlined class="mt-4">
                <v-card-text>
                    <v-row class="mt-4">
                        <v-col>
                            <Table></Table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>

    import Table from '@/components/Admin/Table'

    export default {
        components: {
            Table
        }
    }
</script>

<style>

</style>