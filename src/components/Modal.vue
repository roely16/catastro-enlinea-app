<template>
    <div>
        <v-dialog
            v-model="dialog"
            :max-width="width"
            :fullscreen="fullscreen"
            persistent
        >
      
            <v-card>
                <v-toolbar
                dark
                color="teal darken-1"
                >
                    <v-btn
                        icon
                        dark
                        @click="dialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        
                        <slot name="modal-corner-right">

                        </slot>
                    </v-toolbar-items>
                </v-toolbar>

                <slot name="form">

                </slot>
                
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            width: null,
            title: null,
            fullscreen: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                dialog: false
            }
        },
        methods: {
            async show(){
                this.dialog = true
            },
            close(){

                this.$emit('closeModal')
                this.dialog = false

            }
        },
        watch: {
            dialog: function(val){

                if (!val) {
                    this.$emit('closeModal')
                }

            }
        }
    }
</script>

<style>

</style>