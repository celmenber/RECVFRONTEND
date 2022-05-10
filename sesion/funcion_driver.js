$(document).ready(function () {
    function consulta(key) {
        return sessionStorage.getItem(key);
    }

    var Id = consulta("id");
    var Usuario = consulta("user");
    var Nombreuser = consulta("nombreuser");
    var Estado = consulta("estado");
    var Idrol = consulta("idrol");
   
    if (Id == null && Usuario == null && Nombreuser == null) {
        location.href = "../";
        return;
    } else {
        $("#iduser").text(Usuario); 
        $("#nomuser").text(Nombreuser); 

    }

    $("#btnSalir").click(function () {
        location.href = "../";

          /* $.ajax({
            type: "POST",
            url: "../autentificator/logout.php",
            data: objetojson,
            beforeSend: function () {
                msgsalir("<img class='aTIC' width='45' height='45' src='../../recursos/dist/img/loading.gif'/>&nbsp;Cerrando Sesión...", '50%');
            },
            success: function (data) {
                if (data == 1) {
                    location.href = "../";
                }
            }

        }); */
    });
});