var URLactual = String(window.location);
    //alert(typeof(localStorage.id_usuario))
        var idActual = localStorage.id_usuario;
        if(URLactual == "http://ocubbjg.infotec.mx/login" && typeof(idActual) == "string"){
          location.href="/";
        }
        if(URLactual == "http://ocubbjg.infotec.mx/registro_Sedes" && typeof(idActual) == "undefined"){
          location.href="/login";
        }

function cerraralv(){
          localStorage.clear();
          location.href="/login";
        }

