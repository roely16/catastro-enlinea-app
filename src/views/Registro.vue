<template>
    <div>

        <v-container>
            <Header>
                <template #action>
                    <a href="#/">
                        <div><i class="icon-user"></i> Login </div>
                    </a>
                </template>
            </Header>

            <Form></Form>
        </v-container>

    </div>
</template>

<script>

import Header from '@/components/Login/Header'
import Form from '@/components/Registro/Form'

export default {
    components: {
        Header,
        Form
    }
}
</script>

<style>

</style>