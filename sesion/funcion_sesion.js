let URL = dominio();

$(document).ready(function () {
    
    sessionStorage.clear();
    function crearSesion(key, dato) {
        sessionStorage.setItem(key, dato);
    }

    $('#form-signin').validate({
        rules: {
            user: {
                required: true,
                email: true
            },
            pass: {
                required: true,
                
            },
        },
        messages: {
            user: "Ingrese Email como usuario",
            pass: "ingrese su contraseña",
        },

        errorClass: 'help-block col-lg-12',
        errorElement: 'span',

        highlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass('has-error').addClass('has-success');
        },

        submitHandler: function (form) {

            var data = {
                Usuario: $("#user").val(),
                passwordhash: $("#pass").val(),
            }

            $("#btnSubmitpass").html('Entrando...');

            fetchFunctionLogin(URL + "/Auth/login", 'POST', data)
                .then(function (result) {
                   // console.log(result)
                    if(result.status==200){
                        var usuario = result.usuario;
                        crearSesion("token", result.token);
                        crearSesion("id", usuario.id);
                        crearSesion("idrol", usuario.idRol);
                        crearSesion("user", usuario.usuario);
                        crearSesion("estado", usuario.estado);
                        crearSesion("nombreuser", usuario.nombreUsuario);
                        crearSesion("email", usuario.email);
                        
                        setTimeout(function () {
                            location.href = "./panel";
                            $("#btnSubmitpass").html('Iniciar sesión')
                        }, 500);
                        
                    }else{
                        console.log(result)
                        swal("INFORMACION!", "El Usuario o contraña estan incorrectos!", "error");

                         $(".confirm").click(function () {
                             $("#btnSubmitpass").html('Iniciar sesión')
                        }); 
                    }

                }).catch(error => console.log('error', error));
            return false;
        }
    });


});