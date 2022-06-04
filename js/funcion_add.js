
function CierraPopup(idmodal) {
    $("#" + idmodal).modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
}

function atform() {

        var data = {
            IdRemitente: $("#remitente").val(),
            NumeroRadicado : $("#numero_radicado").val(),
            FechaDocumento: $("#date2").val(),
            Asunto: $("#asunto").val(),
            IdDpto: parseInt($("#dpto_at").val()),
            IdMunicipio: parseInt($("#id_minic").val()),
            IdUmg: parseInt($("#unidadmingeo").val()),
        }
    
    fetchFunction(URL + "/alertatemprana", 'POST', data).then(function (result) {
              if (result.status==200){
                swal({
                    title: "INFORMACION",
                    text: "El radicado ha sido creado satisfatoriamente! Que desea hacer",
                    type: "success",
                    showCancelButton: true,
                    cancelButtonText: "Terminar",
                    cancelButtonColor: "#5cb85c",
                    confirmButtonColor: "#5cb85c",                    
                    confirmButtonText: "Cargar Documentos",
                    closeOnConfirm: true
                }, () => {
                    ini_formArchivos()
                    setTimeout(function () {
                        $("#txtnumradicado_archivo").text(result.numRadicado);
                        $("#codradicado_arch").val(result.id);
                    }, 200);
                });

                  $("#remitente").val("")
                  $("#numero_radicado").val("")
                  $("#date2").val("")
                  $("#asunto").val("")
                  $("#dpto_at").val("")
                  $("#id_minic").val("")
                  $("#unidadmingeo").val("")
                  
              }else{
                  swal({
                      title: "INFORMACION",
                      text: "El Numero de Radicado ya existe!",
                      type: "error",
                      confirmButtonColor: "#DD6B55",
                  });
              }  
            });

    return false;
}

function atform_edit() {

    var data = {
        IdRemitente: $("#txtremitente_edit").val(),
        NumeroRadicado: $("#numero_radicado_edit").val(),
        Fecha: $("#Fecha_edit").val(),
        FechaDocumento: $("#date2_edit").val(),
        Asunto: $("#asuntoedit").val(),
        IdDpto: parseInt($("#dpto_edit").val()),
        IdMunicipio: parseInt($("#minic_edit").val()),
        IdUmg: parseInt($("#unidadmingeo_edit").val()),
    }

    fetchFunction(URL + "/alertatemprana/" + $("#codigo_radicado").val(), 'PUT', data).then(function (result) {
        if (result.status == 200) {

         $("#txtremitente_edit").val("")
         $("#numero_radicado_edit").val("")
         $("#date2_edit").val("")
         $("#asuntoedit").val("")
         $("#dpto_edit").val("")
         $("#minic_edit").val("")
         $("#unidadmingeo_edit").val("")
            ALERTA_RADICADO(1) 
            CierraPopup("formModal_editrad")

       }else {
        swal({
            title: "INFORMACION",
            text: "El Numero de Radicado ya existe!",
            type: "error",
            confirmButtonColor: "#DD6B55",
        });
    }
    });

    return false;
}


function Conductabform() {
     var data = {
        IdAt:$("#codradicado").val(),
        RecomendacionesAt:$("#txtrecomendaciones_at").val(),
        RecomendacioneIs:$("#txtrecomendaciones_is").val(),
        OficioConsumacion:$("#txtoficio_c").val(),
        GestionPddh:$("#txtgerstionpddhh").val(),
        RespuestaSolicitud:$("#txtrespuesta_s").val(),
        OtrosAsuntos:$("#txtotros_asuntos").val(),
    }

    fetchFunction(URL + "/criterio", 'POST', data)
        .then(function (result) {
            swal("INFORMACION!", "El criterio ha sido creado y enviado satisfatoriamente!", "success");
            $(".confirm").click(function () {

                    $("#txtrecomendaciones_at").val("")
                    $("#txtrecomendaciones_is").val("")
                    $("#txtoficio_c").val("")
                    $("#txtgerstionpddhh").val("")
                    $("#txtrespuesta_s").val("")
                    $("#txtotros_asuntos").val("")
                Conducta_criterio(result.id)
            });

        });
    return false;
}
    
    
function Remitente() {
     var data = {
        NombreRemitente: $("#nom_remitente").val(),
        Email: $("#correo").val(),
    }


    fetchFunction(URL + "/remitente",'POST', data)
        .then(function (result) {
            console.log(result)
            $("#remitente").val(result.id);
            $("#txtremitente").val(result.nombreRemitente);
            CierraPopup("formModal_remite")

        }).catch(error => console.log('error', error));
    
 return false;
}

function Conducta_b() {
    var data = {
        Nombre: $("#txt_conducta").val(),
    }

    fetchFunction(URL + "/conductas", 'POST', data)
        .then(function (result) {

            var I = parseInt($("#numconductamax").val()) + 1;

            lista = `<div class="checkbox anim-checkbox">
                        <input type="checkbox" id="ch${I}" value="${result.id}" class="primary" checked="checked">
                        <label for="ch${I}" id="chnom${I}">${result.nombre}</label>
                      </div>`;
            
            $("#listaCV").prepend(lista);
        
        });
    return false;
}

function Conducta_criterio(id) {
    //console.log(id)
    $('#lstconductas option:selected').each(function () {

    var data = {
        IdCriterios: id,
        IdCondutas: parseInt($(this).val()),
        }
        
        fetchFunction(URL + "/conductascriterio", 'POST', data)
        .then(function (result) {

            console.log(result)

        });
    });
    return false;
}

function Add_umg() {
    var data = {
        IdMunicipio: $("#codigo_minicumg").val(),
        Nombre: $("#nom_unidadmingeo").val(),
    }
  //  console.log(data)
    fetchFunction(URL + "/unidadminimageo", 'POST', data)
        .then(function (result) {

            //console.log(result)

            $("#unidadmingeo").val(result.id);
            $("#txtunidadmingeo").val(result.nombre);
            CierraPopup("formModal_umg")

        })
}

function Add_docucmento() {
    var formdata = new FormData();
    I = 0;
    formdata.append("IdCasos", $("#codradicado_arch").val());
    formdata.append("RutaArchivo", archivo0.files[0]);
 
    var requestOptions = {
        method: 'POST',
        headers: new Headers({ 'Authorization': "Bearer " + sessionStorage.getItem('token') }),
        body: formdata,
        redirect: 'follow'
    };
    fetch(URL + "/archivos", requestOptions)
        .then(response => response.json())
        .then(function (result) {

            console.log(result)
            LISTAR_ARCHIVOS(result.idCasos)

        })
        .catch(error => console.log('error', error));
}
