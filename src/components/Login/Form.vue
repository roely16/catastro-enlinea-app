<template>
    <div>
        
        <div class="container-main">
            <!--It contains structure, form sign in-->
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="w-login">
                            <div class="card-login">
                                <div class="title-main">
                                    <h1>Catastro <br>en línea</h1>
                                </div>
                                                        <!--<form action="index.php">-->
                                <form autocomplete="off">
                                    <div class="form-group">
                                        <input name="username" type="email" class="form-control" placeholder="Correo electrónico *" required="" autofocus="" onchange="changeIn(this)" maxlength="50">
                                    </div>
                                    <div class="form-group">
                                        <input name="passw" type="password" class="form-control" placeholder="Contraseña *" required="" onchange="changeIn(this)" autocomplete="on" maxlength="30">
                                    </div>

                                    <label class="forgot-password"> <a >¿Has olvidado tu contraseña?</a> </label>

                                    <div class="button-right">
                                        <button type="submit" class="btn btn-2 btn-custom">Entrar</button>
                                    </div>

                                    <input type="hidden" name="main">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- It contains structure, general footer and closed tag body HTML -->
            
        </div>
            
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .title-main{
        font-family: var(--font-official);
        font-size: 2.5em;
        color: var(--blue-official);
        margin: 0;
        text-transform: uppercase;
        padding-bottom: 25px;
        font-weight: 600;
    }
</style>