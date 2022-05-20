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
        if (jqXHR.status == 401) {
            console.log('status', jqXHR.status)
            location.href = "../";
            return;
        } else if (jqXHR.status == 404) {
            console.log('status', jqXHR.status)
        } else if (jqXHR.status == 500) {
            console.log('status', jqXHR.status)
        } else if (jqXHR.status === 0 && textStatus == "error") {
            console.log('status', jqXHR.status)
        } else if (jqXHR.status === 0 && textStatus === "timeout" && errorThrown === "timeout") {
            console.log('status', jqXHR.status)
        }
    });
}


function fetchFunction(uri, method, data) {
    
    var httpHeaders = { 'Content-Type': 'application/json', 'Authorization': token };
    var myHeaders = new Headers(httpHeaders);

    var requestOptions = {
        method: method,
        headers: myHeaders,
        body: data ? JSON.stringify(data) : null,
        redirect: 'follow'
    };

return fetch(uri, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));

/*return fetch(uri, requestOptions)
       .then(function (response){
        if (!response.ok) throw Error(response.status);
        response.json()
        })
       .catch(error => console.log('error', error));*/
}


function fetchFunctionLogin(uri, method, data) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");

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
