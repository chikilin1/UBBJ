function validarDesmadrito(){
  var curp = $("#Curp").val();
  var nombre = $("#Nombre").val();
  var pa = $("#Primer_Apellido").val();
  var correo = $("#Correo").val();
  var correoC = $("#Correo_confirma").val();
  var pass = $("#pass").val();
  var ic=0;
  var tel = $("#Telefono").val();
  if(tel.length == 10){
      autorizar = 1;
      $("#alertaTel").hide();
    } 
  else
    { autorizar = 0;
      $("#alertaTel").show();
    }
  if($("#Informacion_Correcta").is(':checked')) {  
    ic = 1;
  } else {  
     ic = 0;
  }      
  //alert(ic);
  if (curp.length > 0 && nombre.length > 0 && pa.length > 0 && correo.length > 0 && correoC.length > 0 && pass.length > 0 && ic==1 && autorizar == 1){
      $("#botoncin").show(500);
  }else{
    $("#botoncin").hide(500);
  }
}$("#botoncin").hide();

function limpiarNumero(obj) {
  /* El evento "change" sólo saltará si son diferentes */
  obj.value = obj.value.replace(/\D/g, '');
}

const Registro_usuarios = {
  data: function(){
    return{
      error_curp:"", error_nombre:"",  error_primer_apellido:"",   error_segundo_apellido:"",   error_email:"",      error_email_confir:"", error_telefono:"",  error_pass:"",  error_check:"",
      
      curp:null,        nombre:null,        primer_apellido:null,        segundo_apellido:null,        email:null,        email_confir:null,        telefono:"",        pass:null,        check:null,
      
      curpvalidada:"", nombrevalido:"", paValido:"",sapaValido:"",emailpaValido:"",email_confir_paValido:"", telefonoValido:"", passValido:"", verValida:"", salir:"", tipo:"", 

      curpNovalidada:"", nombreNovalido:"", emailNoValido:"", paNoValido:"", sapaNoValido:"", email_confir_paNoValido:"", telefonValido:"", passnoValido:"", folio:'',

      disabled:0
        }
    },mounted() {
     //cache
     if (localStorage.folio) 
     { 
       this.folio = localStorage.folio; 
      }
    },
    methods:{
      verPs:function(){
        var tipo = document.getElementById("pass");
          if(tipo.type == "password")
          {
              tipo.type="text";
              this.verValida=true;
          }
          else{
              tipo.type="password"
              this.verValida=false;
          }
      },
      sendData:function(e){
        e.preventDefault();
        //                                  validaciones
        //curp
        if(!this.curpValida(this.curp)) 
          {
            this.error_curp="Campo obligatorio. La CURP debe contener 18 caracteres."; 
            this.curpNovalidada=true;
            this.curpvalidada=false;
          }
        else{this.curpvalidada=true; this.curpNovalidada=false}

        //nombre
        if(!this.nombre) {this.error_nombre="Obligatorio."; 
        this.nombreNovalido=true; this.nombrevalido=false;
        }else{this.nombrevalido=true; this.nombreNovalido=false}

        //Primer Apellido
        if(!this.primer_apellido) {this.error_primer_apellido="Obligatorio."; 
        this.paNoValido=true; this.paValido=false;
        }else{this.paValido=true; this.paNoValido=false}

        //correo
        if(!this.email) 
          { 
            this.error_email="Obligatorio. Ingrese formato correcto."; 
            this.emailNoValido=true; this.emailpaValido=false;
          } 
          else if(!this.validEmail(this.email)) 
          {
            this.error_email="Obligatorio. Ingrese formato correcto."; 
            this.emailNoValido=true; this.emailpaValido=false;
          }
        else{this.emailpaValido=true; this.emailNoValido=false}

        //confirmación correo
        if(!this.email_confir) 
          {
          this.error_email_confir="Obligatorio. Ingrese formato correcto."; this.email_confir_paNoValido=true; 
          this.email_confir_paValido=false;
          } 
        else if(!this.validEmail(this.email_confir)) 
          {
            this.error_email_confir="Obligatorio. Ingrese formato correcto."; 
            this.email_confir_paNoValido=true; this.email_confir_paValido=false;}
        else if(this.email_confir != this.email)
          {
            this.error_email_confir="Cuentas de correo electrónico no coinciden."; this.email_confir_paNoValido=true; 
            this.email_confir_paValido=false;
          }
        else{this.email_confir_paValido=true;  this.email_confir_paNoValido=false} 

        //password
        if(!this.pass) 
          { 
            this.error_pass="Campo Obligatorio."; 
            this.passnoValido=true; this.passValido=false;
          } 
          else if(!this.validPass(this.pass)) 
          {
            this.error_pass="Estructura de contraseña incorrecta."; 
            this.passnoValido=true; this.passValido=false;
          }
        else{this.passValido=true; this.passnoValido=false}

        //Desabilitado
         if(this.curpvalidada==true && this.nombrevalido==true && this.paValido==true && this.emailpaValido==true && this.email_confir_paValido==true &&  this.passValido==true && this.check==1 && autorizar == 1 ){
          this.disabled=1;
          this.salir=true;
      } 

        //axios
        if(this.salir){
          axios.post(api+'registro',
          {
           headers: {
                       "Access-Control-Allow-Origin": "*",
                       "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                       "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                     }, 
                     id_rol : 7,
                     id_status : 2,
                     curp : this.curp,
                     nombre : this.nombre,
                     apaterno : this.primer_apellido,
                     amaterno : this.segundo_apellido,
                     email : this.email,
                     password : this.pass,
                     numTel : this.telefono,
                     b_estado : 1, 
            }).then(response => {
                console.log(response.data);
                const mensaje = response.data.message;
                const folioRP = response.data.folio;
                
                if(mensaje == "Ya existe una cuenta con la curp "+this.curp)
               {
                  this.curpNovalidada=true;
                  this.error_curp="CURP ya se encuentra registrada."
                  this.curpvalidada=false;
                  this.disabled=0;
                  this.salir=false;
                }else{
                  this.curpNovalidada=false;
                  this.curpValidada=true;
                }
                if(mensaje == "ya existe una cuenta con el correo "+this.email){
                        this.emailNoValido=true;
                        this.error_email="Correo electrónico ya se encuentra registrado en el sistema";
                        this.emailpaValido = false;
                        this.disabled=0;
                        this.salir=false;
                }
                else{
                  this.emailNoValido=false;
                  this.emailpaValido=true;
                }
                if(folioRP.length == 0){
                  this.disabled=0;
                  this.salir=false;
                }else{
                  this.folio=folioRP;
                  localStorage.folio=folioRP;
                }
                
            }).catch(e => {
                console.log(e);
            });
        }else{
          console.log('false')
        }    
      }, //Fin axios
      validEmail:function(email) {
          var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return re.test(email);
      },
      validPass:function(pass) {
          var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8}$/;
          return re.test(pass);
      },
      curpValida:function(curp) {
        var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
            validado = curp.match(re);
      
        if (!validado)  //Coincide con el formato general?
          return false;
        
        //Validar que coincida el dígito verificador
        function digitoVerificador(curp17) {
            //Fuente https://consultas.curp.gob.mx/CurpSP/
            var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
                lngSuma      = 0.0,
                lngDigito    = 0.0;
            for(var i=0; i<17; i++)
                lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
            lngDigito = 10 - lngSuma % 10;
            if (lngDigito == 10) return 0;
            return lngDigito;
        }
        if (validado[2] != digitoVerificador(validado[1])) 
          return false;
            
        return true; //Validado
    }
    }, 
    template:`<div class="formulario2"><div></div><div class="opciones"><a href="/#/">Inicio</a> | <a href="#">Registrar usuario</a></div><div class="leyendaprincipal"><h1>Registro de usuario</h1></div><div class="leyendas"><h2 class="titulos2">Datos para el registro</h2><h6 class="titulos"> Capture sus datos para el registro del perfil de usuario</h6></div><div class="form"><form action="" @submit="sendData" id="formulario"><div class="registro_usuarios"> <label class="titulos">CURP*</label><br> <input onChange="validarDesmadrito();" style="width:300px;" type="text" value="" id="Curp" name="Curp" placeholder="Ingrese CURP" v-model="curp" maxlength="18" :disabled="disabled == 1"><span v-if="curpNovalidada" class="alerta"> <img id="imgcurp" src="./resources/img/danger.png" width="20" height="20"> {{error_curp}} </span> <span class="alerta" v-if="curpvalidada"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br> <label>¿No sabes tu CURP? Consulta <a href="https://www.gob.mx/curp/" target="_blank" class="titulos">aquí...</a></label><br><br><label class="titulos1">Nombre(s): </label> <input onChange="validarDesmadrito();" style="width:300px;" type="text" value="" id="Nombre" name="Nombre" v-model="nombre" :disabled="disabled == 1"> <span v-if="nombreNovalido" class="alerta"> <img src="./resources/img/danger.png" width="20" height="20"> {{error_nombre}}</span> <span class="alerta" v-if="nombrevalido"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br><br><label class="titulos1">Primer apellido: </label> <input onChange="validarDesmadrito();" style="width:300px;" type="text" value="" id="Primer_Apellido" name="Primer_Apellido" v-model="primer_apellido" :disabled="disabled == 1"><span v-if="paNoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> {{error_primer_apellido}}</span> <span class="alerta" v-if="paValido"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br><br><label class="titulos1"> Segundo apellido: </label> <input style="width:300px;" type="text" value="" id="Segundo_Apellido" name="Segundo_Apellido" v-model="segundo_apellido" :disabled="disabled == 1"> <span v-if="sapaNoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> {{error_segundo_apellido}}</span> <span class="alerta" v-if="sapaValido"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br><br><label class="titulos">Correo electrónico *</label><br> <input onChange="validarDesmadrito();" style="width:300px;" type="text" value="" id="Correo" name="Correo" placeholder="ejemplo@ejemplo.com" v-model="email" :disabled="disabled == 1" maxlength="50"> <span v-if="emailNoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> {{error_email}}</span> <span class="alerta" v-if="emailpaValido"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br><br><label class="titulos">Confirmar correo electrónico *</label><br> <input onChange="validarDesmadrito();" style="width:300px;" type="text" value="" id="Correo_confirma" name="Correo_confirma" placeholder="ejemplo@ejemplo.com" v-model="email_confir" :disabled="disabled == 1" maxlength="50"> <span v-if="email_confir_paNoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> {{error_email_confir}}</span> <span class="alerta" v-if="email_confir_paValido"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br><br><label class="titulos">Teléfono celular *</label><br> <input style="width:300px;" type="text" value="" id="Telefono" name="Telefono" placeholder="1234567890" v-model="telefono" maxlength="10" :disabled="disabled == 1" onkeyup="limpiarNumero(this); validarDesmadrito();" onchange="limpiarNumero(this)" > <span id="alertaTel" style="display:none;" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> El número telefónico debe ser de 10 dígitos</span> <br><br><label class="titulos">Contraseña *</label> <div class="tooltip"><img src="./resources/img/help.png" title="" width="18" height="18"><span class="tooltiptext">La contraseña debe ser de una longitud máxima de 8 caracteres y debe contener al menos lo siguiente: Una mayúscula, Un número, Un caracter especial.</span></div> <br> <input onChange="validarDesmadrito();" style="width:300px;"type="password" value="" id="pass" name="pass" placeholder="******" v-model="pass" maxlength="8" :disabled="disabled == 1"> <input class="eyeB" v-if="verValida" type="button"  @click="verPs" :disabled="disabled == 1"> <input class="eyeV" v-if="!verValida" type="button"  @click="verPs" :disabled="disabled == 1"> <span v-if="passnoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> {{error_pass}}</span> <span class="alerta" v-if="passValido"> <img id="imgcurp" src="./resources/img/valida.png" width="20" height="20"> </span><br><br><span><input  type="checkbox" name="Informacion_Correcta" id="Informacion_Correcta" v-model="check" onClick="validarDesmadrito();">  Declaro que esta información es correcta</span> <br><br><input id="botoncin" style="display:none;" onClick="alert('¡Correcto!, Cuenta creada exitosamente se enviara el folio al correo registrado');" class="button2" type="submit" value="Enviar" :disabled="disabled == 1"><a href="/login"><input v-if="salir" class="buttons" type="button" value="Salir"/></a><br></div></form></div></div>`
    }

