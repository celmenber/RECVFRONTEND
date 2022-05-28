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

function fech_hoy(SW) {
    var Mes, Dia, fec, fecanow, fec, f = new Date();
    var DD = f.getDate(); var MM = f.getMonth() + 1; var año = f.getFullYear();

    if (MM > 9) { Mes = MM; } else { Mes = "0" + MM; }
    if (DD > 9) { Dia = DD; } else { Dia = "0" + DD; }
    if(SW==0){
         fecanow = año + "-" + Mes + "-" + Dia
     }

    if (SW == 1) {
        fecanow = Dia + "/" + Mes + "/" + año 
    }
   

    return fecanow;
}

function fechFormato(fechaDoc) {
    fechaV = fechaDoc.split('T');
    fecha = fechaV[0].split('-');
    var DD = fecha[2];
    var MM = fecha[1] - 1;
    var anno = fecha[0];

    if (MM > 9) { Mes = MM; } else { Mes = "0" + MM; }
    if (DD > 9) { Dia = DD; } else { Dia = "0" + DD; }
    
    fecDoc = anno + "-" + Mes + "-" + Dia
    return fecDoc;
}