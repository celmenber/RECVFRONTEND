function formValidation() {
    "use strict";
    /*----------- BEGIN validate CODE  -------------------------*/
    $('#inline-validate-at').validate({
        rules: {
            numradicado: {
                required: true,
            },
            txtremitente: {
                required: true,
            },
            date2: {
                required: true,
                date: true
            },
            dpto_at: {
                required: true,
                minlength: 1
            },
            id_minic: {
                required: true,
            },
            asunto: {
                required: true,
            },
        },
        messages: {
            numradicado: "Ingrese el radicado",
            txtremitente: "ingrese el remitente",
            date2: "Seleccione la fecha",
            dpto_at: "Seleccione el deparatamento",
            id_minic: "Seleccione el municipio",
            asunto: "escriba el asunto",
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
            //form.submit();
            atform()
            return false;
        }
    });

    $('#form-remite').validate({
        rules: {
            nom_remitente: {
                required: true,
            },
            correo: {
                required: true,
            },
        },
        messages: {
            nom_remitente: "Ingrese nombre",
            correo: "ingrese el correo electronico",
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
            //form.submit();
            atform()
            return false;
        }
    });

    /*----------- END validate CODE -------------------------*/
}