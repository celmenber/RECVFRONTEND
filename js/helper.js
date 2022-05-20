function fechlong(fechaDoc) {
    fechaV = fechaDoc.split('T');
    fecha = fechaV[0].split('-');
    var dia = fecha[2];
    var mes = fecha[1] - 1;
    var anno = fecha[0];

    var meses = new Array(" ", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

   // if (MM < 10) { mes = fecha[1].substr(1, 2); } else { mes = fecha[1]; }
    var fecDoc = dia + " de " + meses[mes] + " de " + anno;
    return fecDoc;
}