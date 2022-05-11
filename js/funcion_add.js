
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
    
    fetchFunction(URL + "/alertatemprana", 'POST', data)
        .then(function (result) {
         
            if (result.status==200){
                swal({
                    title: "INFORMACION",
                    text: "El radicado ha sido creado satisfatoriamente! Que desea hacer",
                    type: "success",
                    showCancelButton: true,
                    cancelButtonText: "Terminar",
                    cancelButtonColor: "#5cb85c",
                    confirmButtonColor: "#DD6B55",                    
                    confirmButtonText: "Cargar Documentos",
                    closeOnConfirm: true
                }, () => {
                    ini_formArchivos()
                    setTimeout(function () {
                         $("#txtnumradicado_archivo").text(result.numeroRadicado);
                         $("#codradicado_arch").val(result.id);
                    }, 100);
                });
              }else{
                console.log(result.status)
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


  //  formdata.append("RutaArchivo", archivo1.files[0]);

  /*   $('.form-horizontal').find("input:file").each(function (i, elem) {
        formdata.append("IdCasos", $("#codradicado_arch").val());

        /*var elemento = this;
        
        if (elemento.type === 'file') {
            if (elemento.value !== '') {
                var file_data = $('input[type="file"]')[i].files;
                console.log(file_data)
                formdata.append("RutaArchivo", elemento.name, file_data);
            }
        }
    }); */
 
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
