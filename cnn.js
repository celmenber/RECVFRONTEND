function dominio() {
    var ruta = 'https://localhost:44302/api';
    //var ruta = "https://cobrosapp.co/apiRest_app_cobro/public";
    return ruta;
}
var token = "Bearer " + sessionStorage.getItem('token');
function ajaxFunction(uri, method, async, data) {
    return jQuery.ajax({
        headers: { 'Authorization': token },
        ContentType: 'application/json;',
        dataType: 'json',
        Accept: '*/*',
        async: async,
        type: method,
        url: uri,
        data: data ? JSON.stringify(data) : null
    }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log('Error : ' + errorThrown);
        console.log('Error : ' + jqXHR.key);
        console.log('Error : ' + textStatus);
        
    }).always(function (jqXHR, textStatus, errorThrown) {
        //$("#sincbarra").html('<i class="fa fa-refresh fa-lg"></i>');
        //$("#controlsidebar").html('<i class="fa fa-gear fa-1x"></i>');
        if (jqXHR.status == 404) {
           /*  msg_err("<span>No hay respuesta de la pagina N°Error['" + jqXHR.status + "']</span>", '5%');
            setTimeout($.unblockUI, 3000); */
        } else if (jqXHR.status == 500) {
           /*  msg_err("<span>Error Interno del Servidor'" + jqXHR.status + "'</span>", '5%');
            setTimeout($.unblockUI, 3000); */
        } else if (jqXHR.status === 0 && textStatus == "error") {

           // msg_err("<span>No hay conexion Verifique la Red</span>", '15%');
        } else if (jqXHR.status === 0 && textStatus === "timeout" && errorThrown === "timeout") {
           /*  msg_err("<span>conexion lenta Verifique y repita el proceso</span>", '5%');
            setTimeout($.unblockUI, 3000); */
        }
    });
}


function fechtFunction(uri, method, data) {
    var myHeaders = new Headers();
    
    myHeaders.append(
    "Content-Type", 
    "application/json",
    "Authorization:" + token
    );

    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: data ? JSON.stringify(data) : null,
        redirect: 'follow'
    };

return fetch(uri, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}
