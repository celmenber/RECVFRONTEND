let URL = dominio();

jQuery(function ($) {
    //MUNICIPIO(1)
    LISTAREMITENTE_ALL()
});

function DPTO() {
    ajaxFunction(URL + "/departamento", 'GET', true).done(function (datajson) {
        var array = datajson
        var op_dpto = '';
        for (var i in array) {
            op_dpto += "<option value='" + array[i].id + "'>" + array[i].nombre + "</option>";
        }

        $("#dpto_at option").remove("option:gt(0)");
        $("#dpto_at").append(op_dpto);

        $("#dpto_at option").remove("option:gt(0)");
        $("#dpto_at").append(op_dpto);
    });
}

function MUNICIPIO(ID) {
    var nomMunic
    ajaxFunction(URL + "/municipio/" + ID, 'GET', false).done(function (datajson) {
        var municipio = datajson.nombre
         nomMunic = municipio
    });
    return nomMunic;
}


function LISTAREMITENTE_ALL() {
    ajaxFunction(URL + "/remitente", 'GET', true).done(function (datajson) {
        var array = datajson
        var fila = '';
        var I = 0;
        for (var i in array) {
            I = I + 1;
            fila += `<tr>
                        <td>${I}</td>
                        <td>${array[i].nombreRemitente}</td>
                        <td>${array[i].email}</td>
                        <td style="text-align:center;">
                            <button class="btn btn-warning" Onclick=edit_r(${array[i].id})> Editar </button>
                        </td>
                        <td style="text-align:center;">
                            <button class="btn btn-danger" Onclick=delet_r(${array[i].id})>  Quitar </button>
                        </td>
                    </tr>`;
        }

        $("#tbl_remitente").html(fila);
        $("#numremitente").html(I);
    });
}

function MUNICIPIODPTO(ID_DPTO,sw) {
    ajaxFunction(URL + "/municipio/ObtenerMunicipioDPTO/" + ID_DPTO, 'GET', true).done(function (datajson) {
        var array = datajson
        var op_munic = '';
        for (var i in array) {
            op_munic += "<option value='" + array[i].id + "'>" + array[i].nombre + "</option>";
        }
     
        if (sw == 0) {
            $("#id_minic option").remove("option:gt(0)");
            $("#id_minic").append(op_munic);
        } else if (sw == 1) {
         $("#minic_umg option").remove("option:gt(0)");
         $("#minic_umg").append(op_munic);
        }

    });
}

function ALERTA_RADICADO() {
    ajaxFunction(URL + "/alertatemprana", 'GET', true).done(function (datajson) {
        var array = datajson
        var fila = '';
        var I = 0;
        for (var i in array) {
            I = I + 1;
            fila += `<tr>
                        <td>${I}</td>
                        <td><span id="numrad${I}">${array[i].numeroRadicado}</span></td>
                        <td>${array[i].asunto}.</td>
                        <td>${array[i].fechaDocumento}</td>
                        <td style="text-align:center;">
                            <button class="btn btn-primary" style="width:100%;" Onclick=CONDUCTA(${array[i].id},${I})> Conductas </button>
                                 <br/><br/>
                             <button class="btn btn-info" style="width:100%;" Onclick=ARCHIVOS(${array[i].id},${I})> Adjuntos </button>
                        </td>
                        <td style="text-align:center;">
                            <button class="btn btn-warning" Onclick=edit(${array[i].id})> Editar </button>
                            <br/><br/>
                            <button class="btn btn-danger" Onclick=delet(${array[i].id})>  Quitar </button>
                        </td>
                    </tr>`;
        }
        $("#listaAT").html(fila);
        $("#numradicado").html(I);
    });
}

function LISTAREMITENTE() {
    ajaxFunction(URL + "/remitente/ObtenerRemitenteNOMBRE/" + $("#txt-buscar").val(), 'GET', true).done(function (datajson) {
        var array = datajson
        var lista = '';
        var I = 0;
        for (var i in array) {
            I = I + 1;
            lista += `<a href="#" class="list-group-item" onclick="CARGARREMITENTE(${array[i].id},${I})" data-dismiss="modal" aria-hidden="true">
                             <i class="icon-ok"></i> <span id="nomr${I}">${array[i].nombreRemitente}</span>
                                <span class="pull-right text-muted small"><em> ${array[i].email}</em></span>
                       </a>`;
        }

        if (I > 0) {
            $("#modal-body-list").show() 
            $("#modal-body-form").hide()
             $("#listaRTE").html(lista);
        } else {
            $("#modal-body-list").hide() 
            $("#modal-body-form").show() 
          }
       
 });
}

function LISTAR_UMG() {
    ajaxFunction(URL + "/unidadminimageo/ObtenerumgNOMBRE/" + $("#txt-buscarumg").val(), 'GET', true).done(function (datajson) {
        var array = datajson
        var lista = '';
        var I = 0;
        console.log(datajson)
        for (var i in array) {
            I = I + 1;
            var municipio = MUNICIPIO(array[i].idMunicipio)
            lista += `<a href="#" class="list-group-item" onclick="CARGAR_UMG(${array[i].id},${I})" data-dismiss="modal" aria-hidden="true">
                                <i class="icon-ok"></i> <span id="nomr${I}">${array[i].nombre}</span>
                                <span class="pull-right text-muted small"><em> ${municipio}</em></span>
                       </a>`;
        }

        if (I > 0) {
            $("#modal-body-listumg").show()
            $("#modal-body-formumg").hide()
            $("#listaCVF").html(lista);
        } else {
            $("#modal-body-listumg").hide()
            $("#modal-body-formumg").show()
        }

    });
}


function LISTACONDUCTAS_V() {
    ajaxFunction(URL + "/conductas", 'GET', true).done(function (datajson) {
        var array = datajson
        var lista = '';
        var I = 0;
        for (var i in array) {
            I = I + 1;
            lista += `<div class="checkbox anim-checkbox">
                        <input type="checkbox" id="ch${I}" value="${array[i].id}" class="primary">
                        <label for="ch${I}" id="chnom${I}">${array[i].nombre}</label>
                      </div>`;
        }
        $("#listaCV").html(lista);
        $("#numconductamax").val(I); 
    });
}

function LISTAMACROREGION() {
    ajaxFunction(URL + "/macroregion", 'GET', true).done(function (datajson) {
        var array = datajson
        var lista = '<h4>Macro Regiones</h4>';
        var I = 0;
        for (var i in array) {
            I = I + 1;
            lista += `<button class="btn btn-success btn-block"> ${array[i].nombremacroregion} </button>`;
        }
            $("#codmacroregion").html(lista);
    });
}



function CONDUCTA(id,i) {
    ini_formConducta(0)
    var numr = $("#numrad" + i).text()
    setTimeout(function () {
        $("#codradicado").val(id);
        $("#txtnumradicado").val(numr);
    }, 100);
    
}

function CARGARREMITENTE(id,i) {
    $("#remitente").val(id);
    $("#txtremitente").val($("#nomr"+i).text());
}

function CARGAR_UMG(id, i) {
    $("#unidadmingeo").val(id);
    $("#txtunidadmingeo").val($("#nomr" + i).text());
}


function CARGACONDUCTA() {
    var op_cv = '';
    var num = $('#listaCV').find('div').length
   
    for (var i = 1; i <= num; i++) {
        if ($("#ch" + i).prop('checked')) {
            var id = $("#ch" + i).val();
            var nombre = $("#chnom" + i).text()
            op_cv = op_cv + `<option value="${id}" data-parent_id="${i}" selected>${nombre}</option>`;
        }
    }
    
    setTimeout(function () {
           $("#lstconductas").chosen();
          // $("#lstconductas option").remove("option:gt(0)");
        $("#lstconductas").html(op_cv);
        $("#lstconductas").trigger("chosen:updated");
    }, 100);
    
    
   
    CierraPopup("formModal_conducta")
}

function LISTAR_ARCHIVOS(id) {
    ajaxFunction(URL + "/archivos/obtenerarchivosat/"+id, 'GET', true).done(function (datajson) {
        var array = datajson
        var lista = '';
        var I = 0;
        for (var i in array) {
            I = I + 1;
            lista += `<a href="${array[i].rutaArchivo}" class="list-group-item" target="_blank">
                                    <i class="icon-file"></i> ${array[i].nombreArchivo}
                                    <span class="pull-right text-muted small"><em> ${array[i].tipoArchivo}</em>
                                    </span>
                                    </a>`;
        }
        $("#listdoc").html(lista);
    });
}

function ARCHIVOS(id, i) {
    var numr = $("#numrad" + i).text()
    ini_formArchivos(0)
    setTimeout(function () {
        $("#codradicado_arch").val(id);
        $("#txtnumradicado_archivo").text(numr);
        LISTAR_ARCHIVOS(id)
    }, 100); 
}


function formModal_umg() {
    var idMunicipio = $("#id_minic").val();
    var municipio = MUNICIPIO(idMunicipio)
    setTimeout(function () {
        $("#codigo_minicumg").val(idMunicipio); 
        $("#municumg").text(municipio);
    }, 100);
}