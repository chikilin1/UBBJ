function validar() {
  var correo = $("#correo").val();
  var password = $("#password").val();
  if (correo.length > 0 && password.length > 0){
    $("#Ingresar").show(500);
}else{
  $("#Ingresar").hide(500);
}
}

const Login = {
      data: function(){
        return{
            error_pass:"",          error_mail:"",          pass:null,  email:null,            
            passValido:"", passNoValido:"",       emailpaValido:"", emailpaNoValido:""
            ,credenciales:"", cargando:false,
             user:'', status:'', mensajeAlerta:'', id_usuario:'',curp:'',nombre:'',telefono:'', status_fase_sede:'', 

              representacion:'',              colonia:'',              superficie_terreno:'',
              latitud:'',              longitud:'',          espacio_libre:'',              servicios:'',              imagenTerreno1:'',              imagenTerreno2:'',              imagenTerreno3:'',              usoPrevio_terreno:'',
              levantamiento_topografico:'',
              medidas_noreste:'',
              medidas_sureste:'',
              medida_suroeste:'',
              medida_noroeste:'',
              usoPrevio_terreno:'',
              folio:''
          }  
      }, mounted() {
        if (localStorage.folio) {
          this.folio = localStorage.folio;
        }
        if (localStorage.representacion) {
          this.representacion = localStorage.representacion;
        }
        if (localStorage.latitud) {
          this.latitud = localStorage.latitud;
        }
       
        if (localStorage.espacio_libre) {
          this.espacio_libre = localStorage.espacio_libre;
        }
        if (localStorage.imagenTerreno2) {
          this.imagenTerreno2 = localStorage.imagenTerreno2;
        }
        if (localStorage.levantamiento_topografico) {
          this.levantamiento_topografico = localStorage.levantamiento_topografico;
        }
        if (localStorage.colonia) {
          this.colonia = localStorage.colonia;
        }
        if (localStorage.longitud) {
          this.longitud = localStorage.longitud;
        }
        
        if (localStorage.servicios) {
          this.servicios = localStorage.servicios;
        }
        if (localStorage.imagenTerreno3) {
          this.imagenTerreno3 = localStorage.imagenTerreno3;
        }
        if (localStorage.superficie_terreno) {
          this.superficie_terreno = localStorage.superficie_terreno;
        }
        if (localStorage.imagenTerreno1) {
          this.imagenTerreno1 = localStorage.imagenTerreno1;
        }
        if (localStorage.usoPrevio_terreno) {
          this.usoPrevio_terreno = localStorage.usoPrevio_terreno;
        }
        if (localStorage.status_fase_sede) {
          this.status_fase_sede = localStorage.status_fase_sede;
        }
        if (localStorage.user) {
          this.user = localStorage.user;
        }
        if (localStorage.status) {
          this.status = localStorage.status;
        } 
        //cache
        
        if (localStorage.id_usuario) {
          this.id_usuario = localStorage.id_usuario;
        }
        if (localStorage.curp) {
          this.curp = localStorage.curp;
        }
        if (localStorage.nombre) {
          this.nombre = localStorage.nombre;
        }
        if (localStorage.telefono) {
          this.telefono = localStorage.telefono;
        }

        if (localStorage.medida_noroeste) {
          this.medida_noroeste = localStorage.medida_noroeste;
        }
        if (localStorage.medida_suroeste) {
          this.medida_suroeste = localStorage.medida_suroeste;
        }
        if (localStorage.medidas_noreste) {
          this.medidas_noreste = localStorage.medidas_noreste;
        }
        if (localStorage.medidas_sureste) {
          this.medidas_sureste = localStorage.medidas_sureste;
        }



      },
      methods:{
        sendData:function(e){
          e.preventDefault();
          if(!this.validEmail(this.email)) {
            this.error_mail = "Obligatorio. Ingrese formato correcto."; 
            this.emailpaNoValido=true; this.emailpaValido=false; this.credenciales =false;
          }else {  this.emailpaNoValido=false; }

          if(!this.validPass(this.pass)) {
            this.error_pass = "Obligatorio. Ingrese máximo 8 caracteres."; 
            this.passNoValido=true; this.passValido=false; this.credenciales =false;
          } else {  this.passNoValido=false; }

          
          //AXIOS
          if(this.validEmail(this.email) && this.validPass(this.pass)){
                axios.post(api+'login',
                 {
                  headers: {
                              "Access-Control-Allow-Origin": "*",
                              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                              "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                            },
                            email : this.email,
                            password : this.pass,
              }).then(response => 
                { 
                      console.log(response.data);
                      const token1= response.data.access_token;
                      const mensaje = response.data.message;
                      const id_usuarioRP = response.data.id_usuario;
                      const curpRP= response.data.CURP;
                      const nombreRP = response.data.nombre;
                      const telefonoRP= response.data.telefono;
                      const emailRP = response.data.email;
                      const status_fase_sede = response.data.id_status;

                      const representacion= response.data.representacion;
                      const colonia = response.data.colonia;
                      const superficie_terreno = response.data.superficie_terreno;
                      const latitud= response.data.latitud;
                      const longitud = response.data.longitud;
                      const espacio_libre = response.data.espacio_libre;
                      const servicios = response.data.servicios;
                      const imagenTerreno1= response.data.imagenTerreno1;
                      const imagenTerreno2 = response.data.imagenTerreno2;
                      const imagenTerreno3= response.data.imagenTerreno3;
                      const usoPrevio_terreno = response.data.usoPrevio_terreno;
                      const levantamiento_topografico = response.data.levantamiento_topografico;

                      const medida_noroeste = response.data.medida_noroeste;
                      const medida_suroeste = response.data.medida_suroeste;
                      const medidas_noreste = response.data.medidas_noreste;
                      const medidas_sureste = response.data.medidas_sureste;

                      const folio = response.data.folio;

                      localStorage.setItem('user-token', token1); // store the token in localstorage
                      console.log(localStorage);
                      console.log(mensaje);

                      if(mensaje == "No existe un usuario con el correo "+this.email)
                      {
                        this.emailpaNoValido=true;
                        this.error_mail="Usuario/Correo incorrecto"
                        
                      }else if(mensaje == "Credenciales incorrectas"){
                        this.passNoValido=true;
                        this.error_pass="Contraseña incorrecta"
                      }
                      else if(mensaje == "La cuenta de correo "+ this.email +" no se ha activado aún, favor de revisar su correo electrónico."){
                        this.emailpaNoValido =true;
                        this.error_mail = "Cuenta inactiva, verifique su correo.";
                      }
                      else{
                        this.cargando=true;
                        this.emailpaValido=true; this.emailpaNoValido=false;
                        this.passValido=true; this.passNoValido=false;
                        this.credenciales=false;
                        
                        //Envio a cache
                        localStorage.user = emailRP;
                        localStorage.status = true;

                        localStorage.id_usuario = id_usuarioRP;
                        localStorage.curp = curpRP;
                        localStorage.nombre = nombreRP;
                        localStorage.telefono = telefonoRP;
                        localStorage.status_fase_sede = status_fase_sede;
                        
                        localStorage.representacion = representacion;
                        localStorage.colonia = colonia;
                        localStorage.superficie_terreno = superficie_terreno;
                        localStorage.latitud = latitud;
                        localStorage.longitud = longitud;
                        localStorage.espacio_libre = espacio_libre;
                        localStorage.servicios = servicios;
                        localStorage.imagenTerreno1 = imagenTerreno1;
                        localStorage.imagenTerreno2 = imagenTerreno2;
                        localStorage.imagenTerreno3 = imagenTerreno3;
                        localStorage.levantamiento_topografico = levantamiento_topografico;

                        localStorage.medida_noroeste = medida_noroeste;
                        localStorage.medida_suroeste = medida_suroeste;
                        localStorage.medidas_noreste = medidas_noreste;
                        localStorage.medidas_sureste = medidas_sureste;
                        
                        localStorage.usoPrevio_terreno = usoPrevio_terreno;
                        localStorage.folio = folio;
                        
                        setTimeout(function () {
                          location.href="/registro_Sedes";
                         }, 2000); 
                      }
   
              }).catch(e => {
                  console.log(e);
                  console.log('separacion-------');
                  localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
                  console.log(localStorage);
                  localStorage="" //borrado de cache cuando es cuenta erronea
                  
              });
          }else{
            console.log('false')
          }          
        
        },
        validEmail:function(email) {
          var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
          return re.test(email);
            },
        validPass:function(pass) {
                var re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8}$/;
            return re.test(pass);
        },
        redireccionar:function(){
          window.locationf="/sedes";
        } 
        
        },

      template: '<div class="contenedor"><div class="opciones"><a href="/#/">Inicio</a> | <a href="#">Iniciar sesión</a></div><div class="leyendaprincipal"><h1>Inicio de sesión</h1></div><div class="leyendas"><h6 class="titulos"> Capture sus credenciales para el inicio de sesión</h6></div><div class="formulario" ><form @submit="sendData" id="formulario"><label class="titulos">Correo electrónico*</label><br><input onkeyup="validar();" style="width:300px;" type="text" name="correo" id="correo" placeholder="ejemplo@ejemplo.com" v-model="email"><span v-if="emailpaNoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20"> {{error_mail}}</span><span class="alerta" v-if="emailpaValido"><img  src="./resources/img/valida.png" width="20" height="20"></span><br><br><label class="titulos">Contraseña*</label><br><input onkeyup="validar();" style="width:300px;" type="password" name="password" id="password" placeholder="******" v-model="pass" maxlength="8"><span v-if="passNoValido" class="alerta"><img src="./resources/img/danger.png" width="20" height="20" > {{error_pass}}</span><span class="alerta" v-if="passValido"><img src="./resources/img/valida.png" width="20" height="20"></span><br><label class="negrita">¿No tienes una cuenta? Regístrate <a href="/registro_usuarios" class="titulos">aquí</a></label><br><span class="alerta" v-if="credenciales"><img  src="./resources/img/danger.png" width="20" height="20"> {{mensajeAlerta}}</span><div class="carga"><br><img  v-if="cargando" src="./resources/img/c.gif" width="50" height="50"><br></div><span v-if="cargando" class="cargaMensaje">Credenciales correctas, ingresando.</span><br><br><input class="button1" type="submit" value="Ingresar" id="Ingresar" style="display:none;" name="Ingresar"><br><br><a href="#" class="recuperacion" hidden>Olvidé mi usuario y/o contraseña</a></form></div></div>'
} 

     

      
      