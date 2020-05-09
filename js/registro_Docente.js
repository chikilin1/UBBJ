//ESTILOS INTERACTIVO
const Registro_docentes = {
  data: function () {
    return {                              // VARIABLES
    }
  }, mounted() {
    //cache

  },
  methods: {
    //USO DE FUNCIONES
    sendData: function (e) {
      e.preventDefault();
      //                                 VALIDACIONE


      //axios
      if (true) {
        axios.post(api + 'name',
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            },
            //JSON
          }).then(response => {
            /*console.log(response.data);
            const mensaje = response.data.message;
            const folioRP = response.data.folio;*/

          }).catch(e => {
            console.log(e);
          });
      } else {
        console.log('false')
      }
    }, //Fin axios
    // Funciones
  },
  template:
    `
<div class="contenedor">
  <div class="opciones">

  <a href="/#/">Inicio</a> | <a href="#">Registro de convocatoria</a><a href="/#/"> | Aspirantes a docente</a> | <a href="#">Registrar información general</a>
  
  </div>
  <div class="leyendaprincipal"><h1>Registrar información general</h1></div>
  <div class="leyendas"><h6 class="titulos"> Completa los siguientes formularios para la creación de la solicitud de candidato a docente</h6>
  

    <h2>Accordion</h2>
    
    <button class="accordion">Datos personales <img class="alertaBoton" src="./resources/img/danger.png"> <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
    <div class="panel">
      <!--Formulario 1-->
      <div class="contenerdoFormularios">
        <div class="campoIndividual">
          <label class="nombreInput">Folio</label><br>
          <input style="width:100%;"  id="folio" type="text" placeholder="123456789">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">CURP</label><br>
        <input style="width:100%;" id="folio" type="text" placeholder="AAAA######AAAAAAA##">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Nombre(s)</label><br>
        <input style="width:100%;" id="folio" type="text" placeholder="Juan Arturo">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Primer Apellido</label><br>
        <input style="width:100%;" id="curp" type="text" placeholder="Pérez">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Segundo Apellido</label><br>
        <input style="width:100%;" id="nombres" type="text" placeholder="Alonso">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Correo Eletrónico</label><br>
        <input style="width:100%;" id="folio" type="text" placeholder="juanapa@gmail.com">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Teléfono de contacto</label><br>
        <input style="width:100%;" id="folio" type="text" placeholder="4434534512">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Teléfono de contacto alterno</label><br>
        <input style="width:100%;" id="folio" type="text" placeholder="1234567890">
        </div>
        <div class="campoIndividual">
        <label class="nombreInput">Correo electrónico alternativo</label><br>
        <input style="width:100%;" id="folio" type="text" placeholder="ejemplo@ejemplo.com">
        </div>
      </div>
<!--Sub menu domicilio-->

        <button class="accordion">Domicilio <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
        <div class="panel">
        
          <div class="campoIndividual">
          <label class="nombreInput">Código postal *</label><br>
          <input style="width:100%; height:43px;"  id="cp" type="text" placeholder="Ingrese C. P.">
          </div>  
          <div class="campoIndividual">
          <label class="nombreInput">Entidad *</label><br>
          <select class="selec" style="width:100%;" id="entidad">
               <option>Opciones</option>
          </select>
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">Municipio *</label><br>
          <select class="selec" style="width:100%;" id="entidad">
               <option>Opciones</option>
          </select>
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">Localidad *</label><br>
          <input style="width:100%;" id="localidad" type="text" placeholder="Ingrese Localidad, Colonia etc.">
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">Calle *</label><br>
          <input style="width:100%;" id="calle" type="text" placeholder="Ingrese calle">
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">Número exterior *</label><br>
          <input style="width:100%;" id="NE" type="text" placeholder="Ingrese No. Exterior">
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">Número Interior</label><br>
          <input style="width:100%;" id="NI" type="text" placeholder="Ingrese No. interior">
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">País *</label><br>
          <input style="width:100%;" id="pais" type="text" placeholder="Escriba país">
          </div>
          <div class="campoIndividual">
          <label class="nombreInput">Referencias *</label><br>
          <input style="width:100%;" id="referencias" type="text" placeholder="Entre calles, portón blanco, etc.">
          </div>

      </div>

      <div class="ordenamientoHorizontal"><br>
        <input class="boton2020" type="button" value="Guardar">
      <br><br>
    </div>
  </div>  

<!---->  
    <button class="accordion">Currículum vitae único (CVU) <img class="alertaBoton" src="./resources/img/danger.png"> <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
    <div class="panel">

    <div class="contenedoFormularios"><br>
      <button style="background-color:white ;" class="accordion">Formación profesion <img class="alertaBoton" src="./resources/img/danger.png"> <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
      <div class="panel">
      <br>
      <label>¿Cuál es su último grado de estudios? * </label>
      <input type="radio" name="gradoEstudios" id="licenciatura"> 
      <label for="licentiatura">Licenciatura</label>
      <input type="radio" name="gradoEstudios" id="Maestria">
      <label for="Maestria">Maestría</label>
      <input type="radio" name="gradoEstudios" id="Doctorado">
      <label for="Doctorado">Doctorado</label><br><br>
      <h5>Historial profesional <img class="alertaBoton" src="./resources/img/danger.png"></h5><hr>
      
      <input style="float:right;" class="boton2020" type="button" id="agregarFormacion" value="Agregar">
      </div>
      <br>
      </div>

      <button style="background-color:white ;" class="accordion">Experiencia laboral <img class="alertaBoton" src="./resources/img/danger.png"> <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
      <div class="panel">
      <br>
      <label>¿Cuenta con más de 5 años de experiencia laboral como docente o profesional?* </label>
        <input type="radio" name="experiencia" id="si">
        <label for="si">Si</label>
        <input type="radio" name="experiencia" id="no">
        <label for="no">No</label><br><br>
      <h5>Historial laboral <img class="alertaBoton" src="./resources/img/danger.png"></h5><hr>
      
      <input style="float:right;" class="boton2020" type="button" id="agregarExperiencia" value="Agregar">
      </div>
      <br>
    </div><br>

<!---->
    <button class="accordion">Perfil profesional, carreras y sedes <img class="alertaBoton" src="./resources/img/danger.png"> <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
    <div class="panel">

    </div>

    <button class="accordion">Evidencias <img class="alertaBoton" src="./resources/img/danger.png"> <img class="iconplusDerecha" src="./resources/img/plusIcon.png"></button>
    <div class="panel">
      
    </div>
    <hr>
    <div class="ordenamientoHorizontal">
      <div style="width:100%; ">
      <input id="confirmarDatos" type="Checkbox">
      <label for="confirmarDatos">Declaro decir la verdad que la información proporcionada es verídica</label>
      <input class="boton2020" type="button" value="Enviar Solicitud">
       </div>
      
    </div>
    <br>
  </div>
 </div>
  
</div>

`
}
//INTERACION ACORDION
$(document).ready(function () {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
})
$(document).ready(function () {
  var acc = document.getElementsByClassName("accordion2");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active2");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
})
//FIN INTERACION ACORDION