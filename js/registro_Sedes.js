function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.firstElementChild.className += " w3-border-red";
}
//pintarG2
function pintarGuardarG2(){
  var f1 = $("#foto1").val();
  var f2 = $("#foto2").val();
  var f3 = $("#foto3").val();

  if(f1.length > 0 && f2.length > 0 && f3.length > 0){
    
    $("#g2").show(500);
  }else{
    $("#g2").hide(500);
  }
  
}
//pintarG3
function pintarGuardarG3(){
  var d1 = $("#acreditacion").val();
  var d2 = $("#cartaSolicitud").val();
  var d3 = $("#levantamiento").val();
  var d4 = $("#cartaRespaldo").val();
  var d5 = $("#acta").val();
  var d6 = $("#identificacion").val();
  if(d1.length > 0 && d2.length > 0 && d3.length > 0 && d4.length > 0 && d5.length > 0 && d6.length > 0){
    $("#g3").show(500);
  }else{
    $("#g3").hide(500);
  }
  
}

//pintar g1
function pintarG1(){
  $("#g1").show(500);
}

//funcion destruir infotec
function autodestruccion(boton){
  $("#"+boton).hide(500);
}

//Obtener checkbox
var checkboxAcces="";
var checkboxT="";
var checkboxagua="";
var checkboxdrenaje="";
var checkboxelectricidad="";

var URLactual = String(window.location);
        if(URLactual == "http://localhost/registro_Sedes"){
          //Validacion todos los docs.
            function validarBotonDoc() {
              var acre = $("#acreditacion").val();
              var cs = $("#cartaSolicitud").val();
              var l = $("#levantamiento").val();
              var cr = $("#cartaRespaldo").val();
              var ac = $("#acta").val();
              var ide = $("#identificacion").val();

              if (acre.length > 0 && cs.length > 0 && l.length > 0 && cr.length > 0 && ac.length > 0 && ide.length > 0) {
                $("#g3").show(500);
              } else {
                $("#g3").hide(500);
              }

            }
}
      

//-->> validar sólo numeros<<--//
function soloNumeros(e) {
  var keynum = window.event ? window.event.keyCode : e.which;
  if ((keynum == 8) || (keynum == 46))
    return true;
  return /\d/.test(String.fromCharCode(keynum));
}
//desbloqueo de input
function desbloqueoCel() {
  document.getElementById("numero").disabled = false;
}
function desbloqueoCorreo() {
  document.getElementById("correo").disabled = false;
}

const codigosPostales = [
  { "CP": "77100", "Estado": "Tamaulipas" },
  { "CP": "55100", "Estado": "Estado de México" },
  { "CP": "66100", "Estado": "Guerrero" }
]


const estados = [
  { "Estado": "Guerrero", "Municipio": "Acapulco de Juárez" },
  { "Estado": "Guerrero", "Municipio": "Benito Juárez" },
  { "Estado": "Tamaulipas", "Municipio": "Camargo" },
  { "Estado": "Tamaulipas", "Municipio": "Gómez Farias" },
  { "Estado": "Estado de México", "Municipio": "Ecatepec de Morelos" },
  { "Estado": "Estado de México", "Municipio": "Chimalhuacán" }
]

const municipios = [
  { "Municipio": "Acapulco de Juárez", "Localidad": "Glorietas de Zempoala" },
  { "Municipio": "Benito Juárez", "Localidad": "La Gloriosa" },
  { "Municipio": "Camargo", "Localidad": "Moctezuma Dorado" },
  { "Municipio": "Gómez Farias", "Localidad": "San Isidro" },
  { "Municipio": "Ecatepec de Morelos", "Localidad": "Río de Luz" },
  { "Municipio": "Chimalhuacán", "Localidad": "EL Hoyo" }
]

//-->> consultar en vivo Código Postal, localidad y estado <<--//


function obtenerCP() {
  // 01 OK pintamos Estados
  var resultadoEstado = document.querySelector("#estado");
  var codPos = $("#codigoPostal").val();

  resultadoEstado.innerHTML = "";
  for (let producto of codigosPostales) {

    let nombre = producto.CP;
    if (nombre.indexOf(codPos) != -1) {
      resultadoEstado.innerHTML += `
                    <option>${producto.Estado}</option>
                  `
    }
  }
  if (resultadoEstado.innerHTML == "") {
    resultadoEstado.innerHTML = `
              <option>Estado no encontrado</option>
            `
  }

  // 02 OK pintamos minicipios
  var estadoSeleccionado = $("#estado").val();
  var resultadoMunicipio = document.querySelector("#municipio");
  resultadoMunicipio.innerHTML = "";
  for (let estado of estados) {
    let nombre = estado.Estado;
    if (nombre.indexOf(estadoSeleccionado) != -1) {
      resultadoMunicipio.innerHTML += `
                  <option>${estado.Municipio}</option>
                `
    }
  }
  if (resultadoMunicipio.innerHTML == "") {
    resultadoMunicipio.innerHTML = `
              <option>Municipio no encontrado</option>
              `
  }

  // 03 OK pintamos localidad
  var municipioSeleccionado = $("#municipio").val();
  var resultadoLocalidad = document.querySelector("#localidad");
  resultadoLocalidad.innerHTML = "";
  for (let municipio of municipios) {
    let nombre = municipio.Municipio;
    if (nombre.indexOf(municipioSeleccionado) != -1) {
      resultadoLocalidad.innerHTML += `
                  <option>${municipio.Localidad}</option>
                `
    }
  }
  if (resultadoLocalidad.innerHTML == "") {
    resultadoLocalidad.innerHTML = `
              <option>Localidad no encontrada</option>
              `
  }
}


// -->> INICIO obtener municipio manualmente

function obtenerMunicipio() {
  var estadoSeleccionado = $("#estado").val();
  var resultadoMunicipio = document.querySelector("#municipio");
  resultadoMunicipio.innerHTML = "";
  for (let estado of estados) {
    let nombre = estado.Estado;
    if (nombre.indexOf(estadoSeleccionado) != -1) {
      resultadoMunicipio.innerHTML += `
            <option>${estado.Municipio}</option>
          `
    }
  }
  if (resultadoMunicipio.innerHTML == "") {
    resultadoMunicipio.innerHTML = `
        <option>Municipio no encontrado</option>
        `
  }



  // 03 OK pintamos localidad
  var municipioSeleccionado = $("#municipio").val();
  var resultadoLocalidad = document.querySelector("#localidad");
  resultadoLocalidad.innerHTML = "";
  for (let municipio of municipios) {
    let nombre = municipio.Municipio;
    if (nombre.indexOf(municipioSeleccionado) != -1) {
      resultadoLocalidad.innerHTML += `
            <option>${municipio.Localidad}</option>
          `
    }
  }
  if (resultadoLocalidad.innerHTML == "") {
    resultadoLocalidad.innerHTML = `
        <option>Localidad no encontrada</option>
        `
  }
}
// -->> FIN obtener municipio manualmente




// -->> INICIO obtener localidad manualmente

function obtenerLocalidad() {
  // 03 OK pintamos localidad
  var municipioSeleccionado = $("#municipio").val();
  var resultadoLocalidad = document.querySelector("#localidad");
  resultadoLocalidad.innerHTML = "";
  for (let municipio of municipios) {
    let nombre = municipio.Municipio;
    if (nombre.indexOf(municipioSeleccionado) != -1) {
      resultadoLocalidad.innerHTML += `
              <option>${municipio.Localidad}</option>
            `
    }
  }
  if (resultadoLocalidad.innerHTML == "") {
    resultadoLocalidad.innerHTML = `
          <option>Localidad no encontrada</option>
          `
  }
}

// -->> FIN obtener localidad manualmente



function ocultarPicture(previsualizador) {
  $("#previsualizadorPicture" + previsualizador).hide(500);
}





function ocultarDocumentos(previsualizador) {
  $("#previsualizador" + previsualizador).hide(500);
}





function cerraralv() {
  localStorage.clear();
  location.href = "/login";
}






function GetFileSizeNameAndType() {
  var fi = document.getElementById('foto1'); // GET THE FILE INPUT AS VARIABLE.

  var totalFileSize = 0;

  // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
  if (fi.files.length > 0) {
    // RUN A LOOP TO CHECK EACH SELECTED FILE.
    for (var i = 0; i <= fi.files.length - 1; i++) {
      //ACCESS THE SIZE PROPERTY OF THE ITEM OBJECT IN FILES COLLECTION. IN THIS WAY ALSO GET OTHER PROPERTIES LIKE FILENAME AND FILETYPE
      var fsize = fi.files.item(i).size;
      totalFileSize = totalFileSize + fsize;
      document.getElementById('fp').innerHTML =
        document.getElementById('fp').innerHTML
        +
        '<br /> ' + 'File Name is <b>' + fi.files.item(i).name
        +
        '</b> and Size is <b>' + Math.round((fsize / 1024)) //DEFAULT SIZE IS IN BYTES SO WE DIVIDING BY 1024 TO CONVERT IT IN KB
        +
        '</b> KB and File Type is <b>' + fi.files.item(i).type + "</b>.";
    }
  }
  document.getElementById('divTotalSize').innerHTML = "Total File(s) Size is <b>" + Math.round(totalFileSize / 1024) + "</b> KB";
}



//Guardar 1er formulario
function guardarPrimerFormulario() {
  const opcion = document.getElementById('opcion').value;
  const id_usuario = localStorage.id_usuario;

  var data = new FormData();
  data.append("id_usuario", id_usuario);
  data.append("representacion", opcion);
  var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;
  let timerInterval
  Swal.fire({
    title: 'Subiendo Datos',
    html: 'Espera un momento por favor.',
    timer: 100000,
    timerProgressBar: false,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Datos Enviados Correctamente',
        showConfirmButton: false,
        timer: 4000
      });
    }
  });

  xhr.open("POST", api + "registro/sedes/1");

  xhr.send(data);

  $("#paloma1").show(500);
  localStorage.status_fase_sede = 4;
}

//Carga de archivos para 2do formulario de Sedes    
function segundoFormulario() {
  const codigoPostal = document.getElementById('codigoPostal').value;
  const estado = document.getElementById('estado').value;
  const municipio = document.getElementById('municipio').value;
  const localidad = 1;
  const domicilio = document.getElementById('domicilio').value;
  const superficieTerreno = document.getElementById('superficieTerreno').value;
  const latitud = document.getElementById('latitud').value;
  const longitud = document.getElementById('longitud').value;
  const noreste = document.getElementById('noreste').value;
  const sureste = document.getElementById('sureste').value;
  const noroeste = document.getElementById('noroeste').value;
  const suroeste = document.getElementById('suroeste').value;
  const caracteristicas = document.getElementById('caracteristicas').value;
  const accesibilidad2 = checkboxAcces + '-' + checkboxT + '-' + checkboxagua + '-' + checkboxelectricidad + '-' + checkboxdrenaje;
 
  const usoPrevio = document.getElementById('usoPrevio').value;
  const fotos1 = document.getElementById('foto1').files[0].name;
  const fotos2 = document.getElementById('foto2').files[0].name;
  const fotos3 = document.getElementById('foto3').files[0].name;
  const topoGrafico = $("input[name='topo_Grafico']:checked").val();
 
  //alert(accesibilidad2);

  var data = new FormData();
  data.append("id_usuario", localStorage.id_usuario);
  data.append("id_localidad", localidad);
  data.append("colonia", domicilio);
  data.append("superficie_terreno", superficieTerreno);
  data.append("latitud", latitud);
  data.append("longitud", longitud);
  data.append("medida_noreste", noreste);
  data.append("medida_sureste", sureste);
  data.append("medida_suroeste", noroeste);
  data.append("medida_noroeste", suroeste);
  data.append("espacio_libre", caracteristicas);
  data.append("servicios", accesibilidad2);
  data.append("imagenTerreno1", fotos1);
  data.append("imagenTerreno2", fotos2);
  data.append("imagenTerreno3", fotos3);
  data.append("usoPrevio_terreno", usoPrevio);
  data.append("levantamiento_topografico", topoGrafico);

  var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);

    }
  });

  xhr.open("POST", api + "registro/sedes/2");

  xhr.send(data);

  //Inicio 2da API ----------------------------------------------------------------------------------------------
  const foto1 = document.getElementById('foto1');
  const foto2 = document.getElementById('foto2');
  const foto3 = document.getElementById('foto3');

  var data = new FormData();
  data.append("files[]", foto1.files[0]);
  data.append("files[]", foto2.files[0]);
  data.append("files[]", foto3.files[0]);
  var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;
  Swal.fire({
    title: 'Subiendo Fotos',
    html: 'Espera un momento por favor.',
    timer: 100000,
    timerProgressBar: false,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Fotos Enviadas Correctamente',
        showConfirmButton: false,
        timer: 4000
      });
    }
  });

  xhr.open("POST", api + "cargarArchivos");

  xhr.send(data);
  localStorage.status_fase_sede = 5;
  $("#paloma2").show(500);
}
// Fin de 2do formulario para Sedes



//Carga de archivos formulario 3 //las nalgotas
function tercerFormulario() { 
  //alert("Claro...");
  const acreditacion = document.getElementById('acreditacion');
  const cartaSolicitud = document.getElementById('cartaSolicitud');
  const levantamiento = document.getElementById('levantamiento');
  const cartaRespaldo = document.getElementById('cartaRespaldo');
  const acta = document.getElementById('acta');
  const identificacion = document.getElementById('identificacion');

  var data = new FormData();
  data.append("id_usuario", localStorage.id_usuario);
  data.append("acreditacion_propiedad", acreditacion.files[0].name);
  data.append("carta_solicitud", cartaSolicitud.files[0].name);
  data.append("levantamiento_terreno", levantamiento.files[0].name);
  data.append("carta_respaldo", cartaRespaldo.files[0].name);
  data.append("acta_asamblea", acta.files[0].name);
  data.append("identificacion", identificacion.files[0].name);


  var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);

    }
  });

  xhr.open("POST", api + "registro/sedes/3");

  xhr.send(data);

  //Inicio 3da API ----------------------------------------------------------------------------------------------
  const acreditacion3 = document.getElementById('acreditacion');
  const cartaSolicitud3 = document.getElementById('cartaSolicitud');
  const levantamiento3 = document.getElementById('levantamiento');
  const cartaRespaldo3 = document.getElementById('cartaRespaldo');
  const acta3 = document.getElementById('acta');
  const identificacion3 = document.getElementById('identificacion');

  var data = new FormData();
  data.append("files[]", acreditacion3.files[0]);
  data.append("files[]", cartaSolicitud3.files[0]);
  data.append("files[]", levantamiento3.files[0]);
  data.append("files[]", cartaRespaldo3.files[0]);
  data.append("files[]", acta3.files[0]);
  data.append("files[]", identificacion3.files[0])
  var xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;
  let timerInterval
  Swal.fire({
    title: 'Subiendo Archivos',
    html: 'Espera un momento por favor.',
    timer: 100000,
    timerProgressBar: false,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        const content = Swal.getContent()
        if (content) {
          const b = content.querySelector('b')
          if (b) {  
            b.textContent = Swal.getTimerLeft()
          }
        }
      }, 100)
    },
    onClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Usted ha concluido su solicitud de registro para la instalación de nueva sede educativa de Universidades para el Bienestar Benito Juárez García con el folio '+ localStorage.folio +'. Sus datos han sido enviados a la Comisión Interna para su evaluación. Los resultados de la convocatoria serán dados a conocer el 1 de Junio de 2020. Muchas gracias por participar.',
        showConfirmButton: false,
        timer: 4000
      });
    }
  });

  xhr.open("POST", api + "cargarArchivos");

  xhr.send(data);
  localStorage.status_fase_sede = 6;
  $("#paloma3").show(500);


  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Documentos Enviados Correctamente',
    showConfirmButton: false,
    timer: 1500
  })
}

// Fin tercer formulario

//Carga de archivos para 3er formulario de Sedes    
function lasNalgas() {
  //alert("Claro...");

}
// Fin de 3er formulario para sedes

const Registro_sedes = {
  data: function () {
    return {
      count: 0,
      folio: localStorage.folio,
      cpp: localStorage.curp,
      name: localStorage.nombre,
      tel: localStorage.telefono,
      user: localStorage.user,
      status_fase: localStorage.status_fase_sede,

      representacion: localStorage.representacion,
      colonia: localStorage.colonia,
      superficie_terreno: localStorage.superficie_terreno,
      latitud: localStorage.latitud,
      longitud: localStorage.longitud,
      espacio_libre: localStorage.espacio_libre,
      servicios: localStorage.servicios,
      imagenTerreno1: localStorage.imagenTerreno1,
      imagenTerreno2: localStorage.imagenTerreno2,
      imagenTerreno3: localStorage.imagenTerreno3,
      usoPrevio_terreno: localStorage.usoPrevio_terreno,
      levantamiento_topografico: localStorage.levantamiento_topografico,

      medidas_noreste: localStorage.medidas_noreste,
      medidas_sureste: localStorage.medidas_sureste,
      medida_noroeste: localStorage.medida_noroeste,
      medida_suroeste: localStorage.medida_suroeste,
    }
  },
  methods: {

//AXIOS
sendUserPrueba: function () {
  axios.post('http://207.249.28.99/app/cp', {
      cp: '55100'
  }).then(response => {
      console.log(response.data);
       
  }).catch(e => {
      console.log(e);
  });
}
,
    onFileChangedImage(numero, valor) {
      var archivoInput = document.getElementById(valor);
      var numerito = numero;
      //alert(numerito);
      var archivoRuta = archivoInput.value;
      var extPermitidas = /(.jpg)$/i;

      if (!extPermitidas.exec(archivoRuta)) {
        Swal.fire({
          icon: 'error',
          title: 'Extensión no permitida',
          text: 'Extensión permitida: .jpg '
        })
        archivoInput.value = '';
        return false;
      }
      else {
        if (archivoInput.files && archivoInput.files[0]) {
          var visor = new FileReader();
          visor.onload = function (e) {
            document.getElementById('previsualizadorPicture' + numero).style.display = 'block';
            document.getElementById('previsualizadorPicture' + numero).innerHTML =
              '<embed src="' + e.target.result + '" width="100%" height="300" style="margin:0em auto;"></embed><br><a onClick="ocultarPicture(' + numerito + ');">Ocultar</a>';
          }
          visor.readAsDataURL(archivoInput.files[0]);
        }
      }

      //this.selectedFile = event.target.files[0]
      console.log(event);
    },


    //Inicio funciones para subir archivos
    onFileChanged(numero, valor) {
      var archivoInput = document.getElementById(valor);
      var numerito = numero;
      //alert(archivoInput);
      var archivoRuta = archivoInput.value;
      var extPermitidas = /(.PDF|.pdf|.txt|.doc|.rtf|.odt|.odp|.ods|.dwg|.dwf)$/i;

      if (!extPermitidas.exec(archivoRuta)) {
        Swal.fire({
          icon: 'error',
          title: 'Extensión no permitida',
          text: 'Extensión permitidas: .PDF|.pdf|.txt|.doc|.rtf|.odt|.odp|.ods|.dwg|.dwf '
        })
        archivoInput.value = '';
        return false;
      }
      else {
        if (archivoInput.files && archivoInput.files[0]) {
          var visor = new FileReader();
          visor.onload = function (e) {
            document.getElementById('previsualizador' + numero).style.display = 'block';
            document.getElementById('previsualizador' + numero).innerHTML =
              '<embed src="' + e.target.result + '" width="100%" height="300" style="margin:0em auto;"></embed><br><a onClick="ocultarDocumentos(' + numerito + ');">Ocultar</a>';
          }
          visor.readAsDataURL(archivoInput.files[0]);
        }
      }

      //this.fileInput = event.target.files[0]
      console.log(event);
    },

    onUpload() {

      axios.post(api + 'cargarArchivos', {
        params: {
          'files[]': '/C:/Users/MiguelAngel/Desktop/Hola que tal_4.pdf'
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log("SUCCESS")
      }).catch(e => {
        console.log(e);
      });

    }

  },
  //Fin de funciones para subir archivos

  //Inicia template
  template:
    `
<div class="w3-container w3-section">
    <center><h1 text-align="center">Registro de solicitudes para nuevas sedes</h1></center>
      <div class="w3-row">
        <a href="#" onclick="openCity(event, 'Paso 1');">
          <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding"> 
          <img src="./resources/img/01.png" style="width:30px; heigth:auto;"> 
          Datos de contacto 
          <img id="paloma1" style="display:none;width:25px; height:auto;" src="./resources/img/valida.png"></div>
          
        </a>
        <a href="#" onclick="openCity(event, 'Paso 2');">
          <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding"><img src="./resources/img/02.png" style="width:30px; heigth:auto;"> Datos del terreno de donación <img id="paloma2" style="display:none;width:25px; heigth:auto;" src="./resources/img/valida.png"></div>
        </a>
        <a href="#" onclick="openCity(event, 'Paso 3');">
          <div class="w3-third tablink w3-bottombar w3-hover-light-grey w3-padding"><img src="./resources/img/03.png" style="width:30px; heigth:auto;"> Documentos del terreno <img id="paloma3"  style="display:none;width:25px; heigth:auto;" src="./resources/img/valida.png"></div>
        </a>
      </div>

      <div id="Paso 1" class="w3-container city">
     
      <h3>Datos de contacto 
      <div class="tooltip2">
      <img src="./resources/img/help.png" title="" width="18" height="18">
      <span class="tooltiptext2">Los datos solicitados se refieren a la persona que está representando el registro de la solicitud de sede para el programa Universidades del Bienestar Benito Juárez.</span>
      </div>
      </h3> 

      <br>
      <form> 
        <label class="titulos">CURP </label>
        <br> 
        <input type="text" Disabled  class="form-control" id="curp" placeholder="GAMJ750710HDFRDN07" v-model="cpp"> 

        <br><br> 
        <label class="titulos">Nombre completo</label>
        <br> 
        <input type="text"  Disabled class="form-control" id="nombreCompleto" placeholder="Apellido Paterno/Apellido Materno/Nombre(s)" v-model="name">
        <br><br>
        <label class="titulos">Teléfono celular</label> 
          
        <br> 
        <input type="text"  Disabled class="form-control" id="numero" placeholder="5524103369" maxlength="10" minlength="10" required v-model="tel"> 
        <br><br>
        <label class="titulos">Correo electrónico</label>
        
        <br>
        <input type="text"  Disabled class="form-control" id="correo" placeholder="correo@ejemplo.com" maxlength="50" required v-model="user">
        <br><br>
        <label class="titulos">Representación</label>
        <br>
        <select class="form-control" id="opcion" onChange="pintarG1();">
        
        </select>
        <br><br>


        <div style="width:100%; text-align:center; display:inline-block;">
             <a style="display:none;" class="bguardar" id="g1"  onClick="guardarPrimerFormulario(); autodestruccion('g1');"> Guardar </a>
        </div>
        
      </form>
      </div>

      <div id="Paso 2" class="w3-container city">
      <h3>Datos del terreno de donación
      <div class="tooltip2">
       <img src="./resources/img/help.png" title="" width="18" height="18">
       <span class="tooltiptext2">Los datos solicitados se refieren a las características principales del terreno o predio que se está donando, es necesario ingresarlos de manera correcta para su futura validación, de lo contrario, el registro no se tomará en cuenta.</span>
     </div>
      </h3>
      
         <form enctype="multiport/form-data" id="terrenoDonacion"> 
             <label class="titulos">Ingrese código postal</label>
             <br> 
             <input autocomplete="off" type="text" class="form-control" id="codigoPostal" maxlength="5" onKeyUp="obtenerCP();" onKeyPress="return soloNumeros(event);">      
             <!--<a class="button" @click="sendUserPrueba"> prueba </a> -->
             <br><br> 
             <label for='estado'>Estado: </label>
             <select class="form-control" id="estado" onChange="obtenerMunicipio();" required>
             </select>
             <label for='municipio'>Municipio: </label>
             <select class="form-control" id="municipio" onChange="obtenerLocalidad();" required>
             </select>
             <label for='localidad'>Localidad: </label>
             <select class="form-comtrol" id="localidad" required>
             </select> 
             <input type="text" class="form-control" id="domicilio" placeholder="Colonia, Calle, No." required v-model="colonia"> 
             <br><br>
             <label class="titulos">Superficie del terreno</label>
             <br>
             <input type="text" class="form-control" id="superficieTerreno" placeholder="Hectáreas"  required v-model="superficie_terreno">
             <br><br>
             <label class="titulos">Georreferencias</label>
             <br>
             <input type="number" class="form-control" id="latitud" placeholder="Latitud" required v-model="latitud">
             <input type="number" class="form-control" id="longitud" placeholder="Longitud"  required v-model="longitud">
             <br><br>
             <label class="titulos">Medidas y colindancias</label>
             <br>
             <input type="number" class="form-control" id="noreste" placeholder="Al noreste 1000mt" onKeyPress="if(this.value.length==5) return false;" min="0" required v-model="medidas_noreste">
             <input type="number" class="form-control" id="sureste" placeholder="Al sureste 900mt" onKeyPress="if(this.value.length==5) return false;" min="0" required v-model="medidas_sureste">
             <input type="number" class="form-control" id="suroeste" placeholder="Al suroeste 700mt" onKeyPress="if(this.value.length==5) return false;" min="0" required v-model="medida_noroeste">
             <input type="number" class="form-control" id="noroeste" placeholder="Al noroeste 700mt" onKeyPress="if(this.value.length==5) return false;" min="0" required v-model="medida_suroeste">
             <br><br>  
             <label class="titulos">Características del terreno</label>
             <br>
             <input type="text" class="form-control" id="caracteristicas" placeholder="Espacio Libre" required v-model="espacio_libre">
             <br><br>
             <label class="titulos">Servicios</label>
             <br>
             <input type="checkbox" class="form-control" id="accesibilidad"> Accesibilidad
             <br>
             <input type="checkbox" class="form-control" id="transporte" > Transporte
             <br>
             <input type="checkbox" class="form-control" id="agua" > Agua
             <br>
             <input type="checkbox" class="form-control" id="electricidad" > Electricidad
             <br>
             <input type="checkbox" class="form-control" id="drenaje"> Drenaje
             <br><br>
             
             <label class="titulos">Fotografías </label><em style="color:red;"> * Se requieren las 3 fotografías</em>
             <br><br>
             <input type="file" class="form-control-file" id="foto1" onChange="pintarGuardarG2();"  @change="onFileChangedImage(1,'foto1');" >
            <br><em>{{imagenTerreno1}}</em>
             <div id="previsualizadorPicture1" style="margin:0em auto;width:600px;height:300px;display:none;">
             </div>
             
             <br><br>
             <input type="file" class="form-control-file" id="foto2" onChange="pintarGuardarG2();"  @change="onFileChangedImage(2,'foto2')">
             <br><em>{{imagenTerreno2}}</em>
             <div id="previsualizadorPicture2" style="margin:0em auto;width:600px;height:300px;display:none;" >
           
             </div>
             <br><br>
             <input type="file" class="form-control-file" id="foto3" onChange="pintarGuardarG2();" @change="onFileChangedImage(3,'foto3')">
             <br><em>{{imagenTerreno3}}</em>
             <div id="previsualizadorPicture3" style="margin:0em auto;width:600px;height:300px;display:none;" >
           
             </div>
             
             <br><br>
             <label class="titulos">Uso previo del terreno</label>
             <br>
             <select id="usoPrevio" >
             </select>
             <br><br>
             <label class="titulos">¿Cuenta con levantamiento topográfico?</label><br>
             <input type="radio" name="topo_Grafico" class="form-control topo" id="topoGraficoSi" value="si"> Si<br>
             <input type="radio" name="topo_Grafico" class="form-control topo" id="topoGraficoNo" value="no"> No
             <div style="width:100%; text-align:center; display:inline-block;">
             <a class="bguardar" id="g2"  onClick="segundoFormulario(); autodestruccion('g2');""> Guardar </a>
             </div>
         </form>
      </div>




      
      <div id="Paso 3" class="w3-container city">
      <!-- DOCUMENTOS DEL TERRENO -->
      <h3>Documentos del terreno
      <div class="tooltip2">
          <img src="./resources/img/help.png" title="" width="18" height="18">
          <span class="tooltiptext2">Los siguientes documentos son necesarios para poder completar el registro de la sede.</span>
      </div>
      </h3>
      <em style="color:red;"> * Se requieren todos los documentos</em>
 
          <form method="POST" enctype="multipart/form-data" id="myForm"><br><br>
            <label class="titulos">Acreditación de propiedad</label>
            <input type="file" class="form-control-file" id="acreditacion" onChange="pintarGuardarG3();" @change="onFileChanged(1,'acreditacion')">
              <div id="previsualizador1" style="margin:0em auto;width:600px;height:300px;display:none;" >
              
              </div>
            <br><br>
            <label class="titulos">Carta de solicitud</label>
            <input type="file" class="form-control-file" id="cartaSolicitud" onChange="pintarGuardarG3();"  @change="onFileChanged(2,'cartaSolicitud')">
            <div id="previsualizador2" style="margin:0em auto;width:600px;height:300px;display:none;" >
              
              </div>
            <br><br>
            <label class="titulos">Levantamiento topográfico</label>
            <input type="file" class="form-control-file" id="levantamiento" onChange="pintarGuardarG3();"  @change="onFileChanged(3,'levantamiento')">
            <div id="previsualizador3" style="margin:0em auto;width:600px;height:300px;display:none;" >
              
              </div>
            <br><br>
            <label class="titulos">Carta respaldo municipal</label>
            <input type="file" class="form-control-file" id="cartaRespaldo" onChange="pintarGuardarG3();"  @change="onFileChanged(4,'cartaRespaldo')">
            <div id="previsualizador4" style="margin:0em auto;width:600px;height:300px;display:none;" >
              
              </div>
            <br><br>
            <label class="titulos">Acta asamblea</label>
            <input type="file" class="form-control-file" id="acta" onChange="pintarGuardarG3();" @change="onFileChanged(5,'acta')">
            <div id="previsualizador5" style="margin:0em auto;width:600px;height:300px;display:none;">
              
              </div>
            <br><br>

            <h3>Documentos del representante</h3>
              <label class="titulos">Identificación</label>
              <input type="file" class="form-control-file" id="identificacion" onChange="pintarGuardarG3();"  @change="onFileChanged(6,'identificacion')">
              <div id="previsualizador6" style="margin:0em auto;width:600px;height:300px;display:none;" >
              
              </div>
              <br><br>


          </form>
          <div style="width:100%; text-align:center; display:inline-block;">
             <a class="bguardar" id="g3"  onClick="tercerFormulario(); autodestruccion('g3');""> Guardar </a>
             </div>
      </div>
      <hr>
      <div style="width:200px; text-align:center; margin-left: 38%; "><a class="button" id="cancel" onClick="cerraralv();"> Cancelar</a></div>
          </div>   
            
    </div>`

}
$(document).ready(function () {
  //validacion proceso formulario
  var faseActaual = parseInt(localStorage.status_fase_sede);
  if (faseActaual == null) {
    $("#paloma1").hide();
    $("#paloma2").hide();
    $("#paloma3").hide();
  }
  if (faseActaual == 4) {
    $("#paloma1").show(500);
    $("#paloma2").hide(500);
    $("#paloma3").hide(500);
    $("#g1").hide(500);
    $("#g2").show(500);
    $("#g3").show(500);

  }
  if (faseActaual == 5) {
    $("#paloma1").show(500);
    $("#paloma2").show(500);
    $("#paloma3").hide(500);
    $("#g1").hide(500);
    $("#g2").hide(500);
    $("#g3").show(500);
  }
  if (faseActaual == 6) {
    $("#paloma1").show();
    $("#paloma2").show();
    $("#paloma3").show();
    $("#g1").hide(500);
    $("#g2").hide(500);
    $("#g3").hide(500);
    $("#cancel").hide(500);
  }
  //validacion campo selec
  if (localStorage.representacion == "null" || localStorage.representacion == "undefined" || localStorage.representacion == "") {
    $("#opcion").html('<option selected>Seleccione</option>      <option>Comisariado Ejidal</option>      <option>Comisariado Bienes</option>      <option>Autoridad Municipal</option>  <option>Particular</option>')
  } if (localStorage.representacion == "Comisariado Ejidal") {
    $("#opcion").attr("disabled", true);
    $("#opcion").html('<option >Seleccione</option>      <option disabled selected>Comisariado Ejidal</option>      <option >Comisariado Bienes</option>      <option>Autoridad Municipal</option>  <option>Particular</option>')
  }
  if (localStorage.representacion == "Comisariado Bienes") {
    $("#opcion").attr("disabled", true);
    $("#opcion").html('<option >Seleccione</option>      <option>Comisariado Ejidal</option>      <option selected>Comisariado Bienes</option>      <option>Autoridad Municipal</option>  <option>Particular</option>')
  }
  if (localStorage.representacion == "Autoridad Municipal") {
    $("#opcion").attr("disabled", true);
    $("#opcion").html('<option >Seleccione</option>      <option>Comisariado Ejidal</option>      <option >Comisariado Bienes</option>      <option selected>Autoridad Municipal</option>  <option>Particular</option>')
  }
  if (localStorage.representacion == "Particular") {
    $("#opcion").attr("disabled", true);
    $("#opcion").html('<option>Seleccione</option>      <option>Comisariado Ejidal</option>      <option >Comisariado Bienes</option>      <option>Autoridad Municipal</option>  <option selected>Particular</option>')
  }

//select uso previo
if (localStorage.usoPrevio_terreno == "Urbano") {

  $("#usoPrevio").attr("disabled", true);
  $("#usoPrevio").html('<option>Opciones</option>  <option>Pastoreo</option>  <option selected>Urbano</option>  <option>Agrícola</option>  <option>Otros</option>')
}
if (localStorage.usoPrevio_terreno == "Pastoreo") {
  $("#usoPrevio").attr("disabled", true);
  $("#usoPrevio").html('<option>Opciones</option>  <option selected>Pastoreo</option>  <option >Urbano</option>  <option>Agrícola</option>  <option>Otros</option>')
}
if (localStorage.usoPrevio_terreno == "Agrícola") {
  $("#usoPrevio").attr("disabled", true);
  $("#usoPrevio").html('<option>Opciones</option>  <option>Pastoreo</option>  <option >Urbano</option>  <option selected>Agrícola</option>  <option>Otros</option>')
}
if (localStorage.usoPrevio_terreno == "Otros") {
  $("#usoPrevio").attr("disabled", true);
  $("#usoPrevio").html('<option>Opciones</option>  <option>Pastoreo</option>  <option>Urbano</option>  <option>Agrícola</option>  <option selected>Otros</option>')
} 
if (localStorage.usoPrevio_terreno == "null" || localStorage.usoPrevio_terreno == "undefined" || localStorage.usoPrevio_terreno == "") {
  $("#usoPrevio").html('<option selected disabled>Opciones</option>  <option>Pastoreo</option>  <option>Urbano</option>  <option>Agrícola</option>  <option>Otros</option>')
}

//radio botones 
if (localStorage.levantamiento_topografico == "si") {
  $("#topoGraficoSi").attr("checked", true);
  $("#topoGraficoSi").attr("disabled", true);
  $("#topoGraficoNo").attr("disabled", true);
}
if (localStorage.levantamiento_topografico == "no") {
  $("#topoGraficoNo").attr("checked", true);
  $("#topoGraficoNo").attr("disabled", true);
  $("#topoGraficoSi").attr("disabled", true);
}
  
  var URLactual = String(window.location);
        if(URLactual == "http://localhost/registro_Sedes"){
          validarBotonDoc();
}

  if (localStorage.domicilio == "null" || localStorage.domicilio == "undefined") {
    $("#domicilio").val('');
  }

  //chekbox
  $("#accesibilidad").click(function () {
    if ($("#accesibilidad").is(':checked')) {
      checkboxAcces = "accesibilidad";
    
    } else {
      checkboxAcces = "";
    
    }
  })
  $("#transporte").click(function () {
    if ($("#transporte").is(':checked')) {
      checkboxT = "transporte";
      
    } else {
      checkboxT = "";
      
    }
  })
  $("#agua").click(function () {
    if ($("#agua").is(':checked')) {
      checkboxagua = "agua";
      
    } else {
      checkboxagua = "";
      
    }
  })
  $("#electricidad").click(function () {
    if ($("#electricidad").is(':checked')) {
      checkboxelectricidad = "electricidad";
      
    } else {
      checkboxelectricidad = "";
      
    }
  })
  $("#drenaje").click(function () {
    if ($("#drenaje").is(':checked')) {
      checkboxdrenaje = "drenaje";
      
    } else {
      checkboxdrenaje = "";
      
    }
  })
  
  var paraSplitear = localStorage.servicios;
  var resultado = paraSplitear.split("-");

  var check1 = resultado.indexOf("accesibilidad");
  var check2 = resultado.indexOf("transporte");
  var check3 = resultado.indexOf("agua");
  var check4 = resultado.indexOf("electricidad");
  var check5 = resultado.indexOf("drenaje");

  if(check1 == 0){
    $("#accesibilidad").attr("checked", true);
    $("#accesibilidad").attr("disabled", true);
  }

  if(check2 == 1){
    $("#transporte").attr("checked", true);
    $("#transporte").attr("disabled", true);
  }
  if(check3 == 2){
    $("#agua").attr("checked", true);
    $("#agua").attr("disabled", true);
  }
  if(check4 == 3){
    $("#electricidad").attr("checked", true);
    $("#electricidad").attr("disabled", true);
  }
  if(check5 == 4){
    $("#drenaje").attr("checked", true);
    $("#drenaje").attr("disabled", true);
  }
  
  


$("#g2").hide(); 
$("#g3").hide(); 
})
