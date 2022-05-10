function confirmarMSM(id, nombre) {
   // alert(id)
    swal({
        title: "Mensaje de Confirmación",
        text: "Que desea hacer",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Seguir Enviando Radicados",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Cargar Archivos",
        closeOnConfirm: true
    }, function () {
        ini_formArchivos() 
        $("#txtnumradicado_archivo").text(nombre); 
        $("#codradicado_arch").val(id); 
    });

}