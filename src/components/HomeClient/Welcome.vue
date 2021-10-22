<template>
    <div class="mt-4">
        <span class="text-h5 indigo--text">
            ¡Bienvenido(a) <strong class="indigo--text">{{ userData.nombres }} {{ userData.apellidos }}</strong>!
        </span>
    </div>
</template>

<script>
    export default {
        computed: {
            userData(){
                const data = JSON.parse(localStorage.getItem('catastro_user'))

                return data
            },
        }
    }
</script>