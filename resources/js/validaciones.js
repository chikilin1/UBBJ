var newWindow;

function muestraDiv(mostrar,div,html){
	var mostrar = arguments[0];
	var div = arguments[1];
        console.log('muestraDiv: '+mostrar+' div: '+div);

//	console.log('MuestraDiv, mostrar:'+mostrar+' div:'+div);

	if (mostrar == 1){
		console.log('Entra 1: '+mostrar+' '+div);
		var html = arguments[2];
		
		if (typeof(meny) != "undefined"){
			$('#principal_barra_apps').hide();
			}
		
		$('#'+div).html(html).fadeIn(200);
		
		if (document.getElementById('error_formulario_cuerpo')){
			autoFocus('error_formulario_cuerpo');
			}
		}

	else if (mostrar == 0){
		console.log('Entra 0: '+mostrar+' '+div);
		
		$('#'+div).fadeOut(200).empty();
		
		if (typeof(meny) != "undefined"){
			$('#principal_barra_apps').fadeIn(500);
			}
		if (document.getElementById('captura')){
			document.getElementById('input_captura_clave_ife_ocr').focus();
			}
		}
	
	else if (mostrar == 2){
		console.log('Entra 2: '+mostrar+' '+div);
		document.getElementById(div).style.display='inline';
		document.getElementById(div).removeAttribute('style');
		}
	
	else if (mostrar == 3){
		console.log('Entra 3: '+mostrar+' '+div);
		document.getElementById(div).style.display='none';
		}
	
	else{
		console.log('NADA: '+mostrar+' '+div);
		}
    
	function autoFocus(divName){
	
		var divElementos = document.getElementById(divName).childNodes;
		for (var i = 0; i < divElementos.length; i++){
			if ( divElementos[i].type == 'button'){
				divElementos[i].focus();
				}
			}
			}
	return;
}

function cambiaDiv(valores){
	var gDiv=valores.shift();
	var divMostrar=valores.shift();
	var divOcultar=valores.shift();
	
	if (!divOcultar){
	var divs = document.getElementById(gDiv).getElementsByTagName('div');
	
	for (var i = 0; i < divs.length; i++){
		document.getElementById(divs[i].id).style.display='none';
		}
	}
	else {
		document.getElementById(divOcultar).style.display='none';
		}
	document.getElementById(divMostrar).style.display='inline';
	}


//Esta funcion abre una nueva ventana e inserta el contenido que se le envia
function escribeVentana (html,nombre,tam_x,tam_y){
	
	if (!nombre){
		nombre = 'blank_';
		}
	if (!tam_x){
		tam_x = 400;
		tam_y =320;
		}
	newWindow = window.open("",nombre,"width="+tam_x+",height="+tam_y+",scrollbars=1,resizable=1");
	
	newWindow.document.open();
	newWindow.document.write(html);
	newWindow.document.close();
	
	}
	

//Esta funcion habilita un boton deshabilitado a partir de una validacion
function habilitaBoton(valores){
	
	var campo = valores.shift();
	var nombre = valores.shift();
	var boton = valores.shift();
	
	var campos = [campo,nombre];
//	console.log(campos)
	
	var mensaje = validaCampo(campos);

	document.getElementById(boton).disabled=true;

	var validacion = document.getElementById('warn_'+campo).value;
	
	if (validacion=='validadoOk'){

		document.getElementById(boton).disabled=false;
		document.getElementById(boton).focus();
		}
	}
	
	
//Esta funcion valida el campo que sele da, debe tener 2 parametros de entrada:
// campo a validar (campo) y nombre del elemento html

function validaCampo(campos){
	console.log('entra a validaCampo(campos: '+campos+')');

	var campo=campos.shift();
	var name=campos.shift();
	console.log('campo: '+campo)
	console.log('name: '+name)

	var dato=document.getElementById(name).value; //Toma el valor del campo a validar
	
	var nombre_forma=name.replace('_'+campo,"");
	nombre_forma=nombre_forma.replace('input_',"");
	console.log('FORMA: '+nombre_forma)
	console.log('name: '+name)
	console.log('		->dato: '+dato)

	var mensajes = null;
	var mensajes={mensaje:null,mensajeJs:null,imagen:null}
	var mensaje = null;
	var mensajeJs=null;
	var validado=false;
	var error=null;
	var ok=null;

	//Descriptores de validacion de cada campo, estos descriptores son los que se deben
	//regresar en esta funcion dado el caso de validacion tabla: formulario_campos
    
/////////// Aqui se describen particularidades de cada elemento ///////////
    
	if (campo == 'telefono_fijo' || campo =='telefono_movil'){
		mensajes=verificaTel(name);  //Se manda llamar a la funcion de verificacion de telefono
		validado=true;               //ya que se regresa el resultado, se marca como validado
		}
	
	else if ( campo=='cp'  || campo=='mujeres' || campo=='hombres' || campo=='asistentes'){
		var datoOk=soloNumeros(dato); //Se llama a la funcion solo numero para que borre texto
		validado=true;
		document.getElementById(name).value=datoOk;  //Se sustituye dato por valor sin texto
		if (datoOk>0){
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'} //Si el dato no esta en blanco, se valida SIEMPRE que esta bien.
			}
		else{
			mensajes={mensaje:null,mensajeJs:'sinDato'}   //Si el dato es nulo, marca sinDato
			}
		}
	
	else if ( campo == 'seccion' ){
		var datoOk=soloNumeros(dato); //Se llama a la funcion solo numero para que borre texto
		document.getElementById(name).value=datoOk;  //Se sustituye dato por valor sin texto
		mensajes={mensaje:null,mensajeJs:'sinDato'}   //Como no se ha verificado la seccion, se marca como sin dato
	
		var name_formulario = name.replace(campo,"");
		if (document.getElementById(name_formulario+'entidad').value!=0){
			mensajes=verificaSecc(name_formulario,name);   //Se manda a llamar la funcion verificaSecc.
			validado=true;
			}
		}
	
	else if (campo =='cve_ife'){
		validado=true;
		mensajes=verificaIFE(name)   //Se manda a llamar la funcion verificaIFE para clave de Elector
	//	console.log('IFE: '+mensajes);
		}
	
	else if (campo =='cve_curp' || campo == 'curp'){
	validado=true;
	mensajes=verificaCURP(name)   //Se manda a llamar la funcion verificaIFE para clave de Elector
//	console.log('IFE: '+mensajes);
    }

   else if (campo =='cve_rfc'){
	validado=true;
	mensajes=verificaRFC(name)   //Se manda a llamar la funcion verificaIFE para clave de Elector
//	console.log('IFE: '+mensajes);
    }
   else if (campo =='clabe'){
	validado=true;
	mensajes = verificaFormularioCLABE(name, false)   //Se manda a llamar la funcion verificaFormularioCLABE
    } 
   
//-------------------------------Validaciones copiadas de morenafilia----------------------------------    
   else if (campo == 'cuenta_bancaria') { 
		validado=true;
		var datoOk=soloNumeros(dato); //Se llama a la funcion solo numero para que borre texto
		document.getElementById(name).value=datoOk;  //Se sustituye dato por valor sin texto
	
		if (datoOk>0){
			mensajes={mensaje:'OK',mensajeJs:'validadoOk',imagen:true} //Si el dato no esta en blanco, se valida SIEMPRE.
			}
		else if(!datoOk && opcional){
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'} //Si el dato no esta en blanco, se valida SIEMPRE.
			}
		else{
			mensajes={mensaje:'Este campo no puede ir vacio',mensajeJs:'seccionMal',imagen:true}   //Si el dato es nulo, marca seccionMal
			}
		}
		
   else if (campo == 'banco') { 
			if ((dato.length==0 || dato == '' || dato ==0 || dato =='0') && opcional != 'opcional'){
			console.log('leng: cero');
			validado=true;
			var name_formulario = name.replace(campo,"");
			var msgDescr=document.getElementById(name).text;
			mensajes={mensaje:'El campo de '+campo+' no puede ir en blanco',mensajeJs:'sinDato'}
			}
		else{
			validado=true;
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			var name_formulario = name.replace(campo,"");
			if (campo=='entidad' || campo=='entidad_comite'){
				if (document.getElementById(name_formulario+'seccion')){
					validaCampo(['seccion',name_formulario+'seccion'])
					}
				else if (document.getElementById(name_formulario+'seccion_comite')){
					validaCampo(['seccion_comite',name_formulario+'seccion_comite'])
					}
				}
			}
		}

//-------------------------------Validaciones agregadas por el Meave----------------------------------    
	else if (campo =='cve_ife2'){
		validado=true;
		mensajes=verificaIFEAlt(name)   //Se manda a llamar la funcion verificaIFE para clave de Elector
	//	console.log('IFE: '+mensajes);
		}
    	
	else if (campo =='seccion2'){
		validado=true;
		var datoOk=soloNumeros(dato); //Se llama a la funcion solo numero para que borre texto
		document.getElementById(name).value=datoOk;  //Se sustituye dato por valor sin texto
	
		if (datoOk>0){
			mensajes={mensaje:'OK',mensajeJs:'validadoOk',imagen:true} //Si el dato no esta en blanco, se valida SIEMPRE.
			}
		else{
			mensajes={mensaje:'Este campo no puede ir vacio',mensajeJs:'seccionMal',imagen:true}   //Si el dato es nulo, marca seccionMal
			}
		}
    
	else if (campo =='fecha_formato' || campo == 'fecha' || campo == 'fecha_evento'){
		if (dato.length < 6){
			console.log('leng: incompleta');
			validado=true;
			mensajes={mensaje:'El campo de fecha est&aacute; incompleto',mensajeJs:'sinDato',imagen:true}
			}
		else{
			validado=true;
			mensajes=verificaFecha(name); //Se llama a la funcion verificaFecha para validarla
			}
		}
// -----------------------Terminan validaciones agregadas por el Meave-------------------
    
	else if (campo == 'email'){
		validado=true;
		
		document.getElementById(name).value=remueveAcentos(dato);
		mensajes=verificaEmail(name); //IDEM
		}
    
	else if (campo == 'anios_residencia' || campo == 'cargo' || campo == 'status' || campo == 'origen' || campo=='colonia' || campo=='municipio' || campo=='comunidad' || campo=='entidad' || campo=='rol' || campo=='distrito' || campo=='distrito_local'){
		if (dato.length==0 || dato == '' || dato ==0 || dato =='0'){
			console.log('leng: cero');
			validado=true;
			var name_formulario = name.replace(campo,"");
			var msgDescr=document.getElementById(name).text;
			mensajes={mensaje:'El campo de '+campo+' no puede ir en blanco',mensajeJs:'sinDato'}
		}
		else{
			validado=true;
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			}
		}

	else if ((campo == 'pregunta9' || campo == 'pregunta10' || campo == 'pregunta11' || campo == 'pregunta12' || campo == 'pregunta13' || campo == 'pregunta2' || campo == 'pregunta3' || campo == 'pregunta5' || campo == 'pregunta6' || campo == 'pregunta7' || campo == 'pregunta8' || campo == 'rcd_id' || campo == 'casilla_id' || campo == 'rg_id' || campo == 'rc_id' || campo == 'rc_tipo' || campo=='delegado1' || campo=='delegado2' || campo=='hora_inicio' || campo=='hora_fin' || campo == 'hora_fin' || campo == 'encargado' || campo == 'nombre_evento' || campo == 'hora_evento' || campo == 'lugar_evento' || campo=='con_firma' || campo == 'procedencia' || campo == 'observ' || campo == 'sexo' || campo == 'paterno' || campo=='materno' || campo=='nombre' || campo=='calle' || campo=='num_ext' || campo=='fecha_formato' || campo=='sepomex_id' || campo=='entidad_id' || campo=='municipio_id' || campo=='colonia_id')){
		if ( (dato.length == 0 || dato == '') && campo !='observ' ){
			console.log('leng: cero');
			validado=true;
			if (document.getElementById('span_'+nombre_forma+'_'+campo)){
				var msgDescr=document.getElementById('span_'+nombre_forma+'_'+campo).innerHTML;
				}
			else{
				var label='label_'+name
				console.log(label);
				msgDescr=document.getElementById(label).innerText;
				}
		    
			mensajes={mensaje:'El campo de '+msgDescr+' no puede ir en blanco',mensajeJs:'sinDato'}
			}
		else{
			if (dato.length != 0 || dato != '') {
	//		    document.getElementById(name).value=remueveAcentos(dato);
				console.log('Acentos removidos')
				}
			validado=true;
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			if (campo == 'nombre' || campo == 'paterno' || campo == 'materno'){
				var regex = /[^A-Za-z Ññ.-]/g;
				var sinAcentos = remueveAcentos(dato);
				var label='label_'+name;
				msgDescr=document.getElementById(label).innerText;
				if ((dato.length != 0 || dato != '') && sinAcentos.match(regex) != null){
					mensajes={mensaje:'El campo de '+msgDescr+' solo puede contener letras',mensajeJs:'textoMal'}
					}
				}
			}
		}
	else if (campo == 'pregunta1' || campo == 'pregunta4'|| campo == 'distrito_check' || campo == 'municipio_check' || campo == 'distrito_local_check' || campo == 'seccion_check'){
		console.log('Entra a validar check');
		var checkedValue = [];
		var ninguno = false;
		
		$("input:checkbox[name='"+name+"']:checked").each(function(){
			checkedValue.push($(this).val());
			if ($(this).val() == 0){
				ninguno = true;
				}
			});
		
		console.log('VALORES: '+checkedValue);
		if (checkedValue.length == 0){
			$('.'+campo+":checkbox[value!=0]").prop('disabled',false);
			console.log('No hay valores, sinDato');
			mensajes={mensaje:'Este campo no puede ir vacío',mensajeJs:'sinDato'}
			}
		else if (ninguno){
			$('.'+campo+":checkbox[value!=0]").prop('checked',false);
			$('.'+campo+":checkbox[value!=0]").prop('disabled',true);
			console.log('valor cero, bloqueados');
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			}
		else {
			$('.'+campo+":checkbox[value=0]").prop('checked',false);
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			}
		}

	else if (campo == 'passwd'||campo=='password'){
		validado=true;
		mensajes=validaPasswd(dato,name);
		}
	
	else if (campo == 'passwd_confirma'){
		validado=true;
		mensajes=validaPasswdConf(dato,name);
		}
    
	else if (campo == 'folio'){
		if ( mod10(parseInt(dato))==false ){
			mensajes={mensaje:'El folio no coincide',mensajeJs:'sinDato'}
			}
		else{
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			}
		}
	else if (campo == 'representante_id' || campo == 'afiliado_id'){
		if ( mod11_check(dato)==false ){
			mensajes={mensaje:'El ID no es válido',mensajeJs:'sinDato'}
			}
		else{
			mensajes={mensaje:'OK',mensajeJs:'validadoOk'}
			}
		}
	else if (campo =='escuela'){
		validado=true;
		mensajes.mensaje="OK";
    } 
	else if (campo =='carrera'){
		validado=true;
		mensajes.mensaje="OK";
    } 
		console.log('validado? '+validado);
		console.log('mensajes.mensaje: '+mensajes.mensaje);
	if ((mensajes.mensaje!=null) ){
		console.log('Dif. Null: '+mensajes.mensaje);
		if (mensajes.mensaje!='OK'){
			console.log('no OK, Hay un error');
			document.getElementById('error_'+name).innerHTML='<img src=/img/form_error.png alt="'+mensajes.mensaje+'" title="'+mensajes.mensaje+'">';
			document.getElementById('errorjs_'+name).innerHTML='<input type="hidden" name="warn_'+campo+'" value="'+mensajes.mensajeJs+'" id="warn_'+campo+'">';
			}
		else{
			if (dato.length>0 || (dato.length==0 && (campo=='cve_ife' || campo=='observ' || campo=='telefono_fijo' || campo=='telefono_movil' || campo=='email'))){
				error='validadoOk';
				if (mensajes.imagen==true){
					ok='<img src=/img/form_ok.png alt="'+mensajes.mensaje+'" title="'+mensajes.mensaje+'">';
					}
				else{
					ok='';
					}
				}
			else{
				error='sinDato';
				}
			
			document.getElementById('errorjs_'+name).innerHTML='<input type="hidden" name="warn_'+campo+'" id="warn_'+campo+'" value="'+error+'">';
			document.getElementById('error_'+name).innerHTML=ok;
			}
		}
	else{
		if (validado==true){
			document.getElementById('error_'+name).innerHTML='';
			document.getElementById('errorjs_'+name).innerHTML='<input type="hidden" name="warn_'+campo+'" id="warn_'+campo+'" value="sinDato">';
			}
		}
	if (nombre_forma=='captura_hoja'){
		console.log('ValidaDiv')
		validaCamposDiv(['captura','div_form_alta_boton_registro'])
		}
	}

function validaSeleccion(inputId,nombreForma) {
	console.log('entra a validaSeleccion(inputId: '+inputId+', nombreForma: '+nombreForma+')');
	var warnId = 'warn_' + inputId.replace('input_'+nombreForma+'_','');
	var divImagen = 'error_' + inputId;
	var dato = $('#'+inputId).val();
	
	if (dato.length != 0 && dato != 0){
		$('#'+warnId).val('validadoOk');
		$('#'+divImagen).empty();
		}
	else {
		$('#'+warnId).val('sinDato');
		$('#'+divImagen).html("<img src='/img/form_error.png' alt='Error' title='Debes seleccionar alguna opción, este campo no puede ir vacío'/>")
		}
	}

function validaNumero(inputId,nombreForma) {
	var warnId = 'warn_' + inputId.replace('input_'+nombreForma+'_','');
	var divImagen = 'error_' + inputId;
	var dato = $('#'+inputId).val();
	var decimal_regex = /^[0-9]+\.[0-9]+$/;
	var integer_regex = /^[0-9]+$/;
	
	if (dato.length != 0 && (dato.match(decimal_regex) || dato.match(integer_regex))) {
		$('#'+warnId).val('validadoOk');
		$('#'+divImagen).empty();
		}
	else {
		$('#'+warnId).val('sinDato');
		$('#'+divImagen).html("<img src='/img/form_error.png' alt='Error' title='El formato de número no coincide, deben ser números enteros o decimales'/>")
		}
	}

function sumaCamposDiv(divId,rubro) {
	var suma = 0.00;
	$('#'+divId+' input[type="text"]').each(function (index) {
		var valor = $(this).val();
		console.log('VALOR: '+valor)
		suma = suma + parseFloat(valor);
		});
	
	$('#span_total_'+rubro).text('$'+suma);
	$('#input_total_'+rubro).val(suma);
	}

/////////////// Funciones para validar IFE ///////////////
function traduceLetra(letra) {
	var letra = letra.toUpperCase();
	var tr_letra = { "A": 1, "B": 2, "C": 3, "D": 4,"E":5, "F":6, "G":7, "H":8, "I":9, "J":10,
			"K":11, "L":12, "M":13, "N":14, "O":15, "P":16, "Q":17, "R":18, "S":19,
			"T":20, "U":21, "V":22, "W":23, "X":24, "Y":25, "Z":26 };
    
	return tr_letra[letra];
};

function numera(val, pos){
	if ((pos % 2) == 0){
				var mult=-3;
	}
	else {
		var mult=3;
	}
	var numero = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
	var regexnum = RegExp(numero);
    
		if (regexnum.test(val)==true){
				var valor_conv = val ;
		}
	else { 
		var valor_conv = traduceLetra(val);
	}
    
	return valor_conv*mult ;
}

function soloLetras(str){
	var regex = /[^A-Za-z]/g;
	var soloLet=str.replace(regex,"");
	return (soloLet);
	}

function verificaIFE(name){
	var cve=document.getElementById(name).value;
	var mensaje=null;
	var mensajeJs=null;
	console.log(cve)
    
	if (cve.length==0){
		mensaje='OK';
		mensajeJs='validadoOk';
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
		}
    
	if (cve.length<=17){
		console.log('verificaIFE Regresa, no mide 18 chars:'+cve.length)
		mensaje='La clave no contiene la longitud adecuada';
		mensajeJs='ifeMal'
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
	}

	if (cve.length!=18){
	mensaje='La clave no contiene la longitud adecuada';
	mensajeJs='ifeMal'
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
	}
    
	var divisor = 10;
	var regex = /^([a-zA-Z]{6})([0-9]{6})([0-9]{2})(H|M{1})([0-9]{1})([0-9]{2})$/i;
	var subcve = regex.exec(cve);
    
	if (subcve === null){
	mensaje='La clave no es válida';
	mensajeJs='ifeMal';
	return {mensaje:mensaje, mensajeJs:mensajeJs,imagen:true};
	}
	var claveTrunc = subcve[1]+subcve[2]+subcve[3];
	var v_ife = subcve[5];
	var pos = 1;
	var suma = 0;
    
	for ($i in claveTrunc.split(""))
	{
		suma=suma+numera(claveTrunc.charAt($i),pos);
		pos++;
	}
    
	var mod = ((suma%divisor)+divisor)%divisor;
	var verif = divisor-mod;
    
	if (verif==10){
		verif=0;
	}
    
	if (v_ife==verif){
	mensaje='OK';
	mensajeJs='validadoOK';
	return {mensaje:mensaje,mensajeJs:mensajeJs};
	}
	else{
	mensaje='La clave no es válida';
	mensajeJs='ifeMal';
		return {mensaje: mensaje,mensajeJs: mensajeJs,imagen:true};
	}
    
}

function verificaIFEAlt(name){
	var cve=document.getElementById(name).value;
	var datoOk=soloLetras(cve); //Se llama a la funcion solo letras para que borre numeros
	document.getElementById(name).value=datoOk;  //Se sustituye dato por valor sin numeros 
	
	var mensaje=null;
	var mensajeJs=null;
	console.log(datoOk)
	if (datoOk.length<=3){
		console.log('verificaIFEAlt Regresa, no mide 4 chars:'+datoOk.length)
		mensaje='Clave IFE debe contener las 4 primeras letras de la Clave de Elector';
		mensajeJs='ifeMal'
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
	}
	else{
		mensaje='OK';
		mensajeJs='validadoOK';
		return {mensaje:mensaje,mensajeJs:mensajeJs};
		}
}

/////////////// Termina validacion IFE ///////////////

////////////////Validacion CURP ////////////////////
function verificaCURP(name,opcional){
    var cve=document.getElementById(name).value.toUpperCase();
    var mensaje=null;
    var mensajeJs=null;
    
//    console.log(cve)
	
	if (cve.length==0 && opcional==null){
//		console.log('verificaCURP Regresa, no mide 18 chars:'+cve.length)
		mensaje='La clave CURP no puede ir vacía';
		mensajeJs='sinDato'
		return {mensaje:mensaje,mensajeJs:mensajeJs};
		}
	else if (cve.length==0 && opcional=='opcional'){
//		console.log('verificaIFE Regresa, OPCIONAL:'+cve.length)
		mensaje='OK';
		mensajeJs='validadoOk'
		return {mensaje:mensaje,mensajeJs:mensajeJs};
		}
	else if (cve.length!=18){
//		console.log('verificaCURP Regresa, no mide 18 chars:'+cve.length)
		mensaje='La clave no contiene la longitud adecuada';
		mensajeJs='curpMal'
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
		}
    
	var divisor = 10;
	var regex = /^([a-zA-Z]{4})([0-9]{6})(H|M{1})([a-zA-Z]{2})([a-zA-Z]{3})([a-kA-K0-9]{1})([0-9]{1})$/i;
	var subcve = regex.exec(cve);
    
	if (subcve === null){
		mensaje='La clave no es válida';
		mensajeJs='curpMal';
		return {mensaje:mensaje, mensajeJs:mensajeJs,imagen:true};
		}
	
	if (opcional && opcional == 'menor'){
		var esMenor = false;
		var fecha = subcve[2];
		var regExpFechaNac = /^([0-9]{2})([0-9]{2})([0-9]{2})$/i;
		var fechaArr = regExpFechaNac.exec(fecha);

		var today = new Date();
		if (fechaArr[1] >= 0 && fechaArr[1] <= today.getFullYear() - 2000){
			fechaArr[1] = 20+fechaArr[1];
			}
		
		var fechaNac = new Date(parseInt(fechaArr[1]),parseInt(fechaArr[2])-1,parseInt(fechaArr[3]));
//		console.log('TODAY: '+today);
//		console.log('FECHANAC: '+fechaNac);
		var subDate = new Date(today - fechaNac);
		
//		console.log('NEWDATE: '+subDate);
		var edad = subDate.getFullYear() - 1970;
		console.log('EDAD: '+edad);
		if (edad < 18 && edad > 14){
			esMenor = true;
			}
		
		if (!esMenor){
			mensaje='Sólo se aceptan jóvenes entre 15 y 17 años';
			mensajeJs='curpMal';
			return {mensaje:mensaje, mensajeJs:mensajeJs,imagen:true};
			}
		
		}
	
	var claveTrunc = subcve[1]+subcve[2]+subcve[3]+subcve[4]+subcve[5]+subcve[6];
	var v_curp = subcve[7];

	var factor = 19;
	var suma = 0;
	var caracteres = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
	
	for ($i in claveTrunc.split("")){
		factor = factor - 1;
		suma=suma + caracteres.indexOf(claveTrunc.charAt($i)) * factor;
		}
    
	var mod = suma % divisor;
	var verif = divisor-mod;
	
	if (verif==10){
		verif=0;
		}
    
	if (v_curp==verif){
		mensaje='OK';
		mensajeJs='validadoOK';
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
		}
	else{
		mensaje='La clave no es válida';
		mensajeJs='curpMal';
		return {mensaje: mensaje,mensajeJs: mensajeJs,imagen:true};
		}
	
	}
/////////////// Termina validacion CURP ///////////////

////////////////Validacion IFE o CURP ////////////////////
function verificaIFEoCURP(campoIfe,campoCurp,menorDeEdad){
	validaCampo(['cve_ife',campoIfe]);
	validaCampo(['curp',campoCurp,menorDeEdad]);
	
	
	var cveIfe = $('#'+campoIfe).val();
	var cveCurp = $('#'+campoCurp).val();
	var warnIfe = $('#warn_cve_ife').val();
	var warnCurp = $('#warn_curp').val();
	
	if (cveIfe && !cveCurp && warnIfe == 'validadoOk'){
		validaCampo(['curp',campoCurp,'opcional']);
		$('#warn_curp').val('validadoEXTERNO');
		}
	else if (cveCurp && !cveIfe && warnCurp == 'validadoOk') {
		validaCampo(['cve_ife',campoIfe,'opcional']);
		$('#warn_ife').val('validadoEXTERNO');
		}
	
	}

/////////////// Termina validacion IFE o CURP ///////////////

////////////////Validacion RFC ////////////////////
function verificaRFC(name){
	var cve=document.getElementById(name).value;
    var mensaje=null;
    var mensajeJs=null;
    console.log(cve)
    if (cve.length!=10 && cve.length!=13){
	console.log('verificaRFC Regresa, no mide 13 chars:'+cve.length)
	mensaje='El RFC no contiene la longitud adecuada';
	mensajeJs='rfcMal'
        return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
    }

    var regex = /^([a-zA-Z]{4})([0-9]{6})([a-zA-Z0-9]{3})$/i;
    var subcve = regex.exec(cve);
    
    var regex_low = /^([a-zA-Z]{4})([0-9]{6})$/i;
    var subcve_low = regex_low.exec(cve);
    
    if (subcve != null || subcve_low != null){
		mensaje='OK';
		mensajeJs='validadoOK';
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
    }
    else{
		mensaje='El RFC no es válido';
		mensajeJs='rfcMal';
		return {mensaje:mensaje, mensajeJs:mensajeJs,imagen:true};
    	}
	}
/////////////// Termina validacion RFC ///////////////

////////////////Validacion CLABE ////////////////////
function verificaCLABE(name,opcional) {
	
	var clabe = $("#"+name).val();
	var mensaje = null;
	var mensajeJs = null;
	var mensajeImagen = true;
	
	var inputBancoId = name.replace('clabe','banco');
	var inputCuentaId = name.replace('clabe','cuenta_bancaria');
	
	// Si es opcional y viene en blanco pasa
	if (opcional && clabe.length == 0){
		mensaje='OK';
		mensajeJs='validadoOK';
		mensajeImagen = false;
		$("#"+inputBancoId).val('');
		$("#"+inputCuentaId).val('');
		}
	// Revisamos que mida 18 caracteres
	else if (clabe.length!=18){
		mensaje='La CLABE no contiene la longitud adecuada';
		mensajeJs='clabeMal'
		$("#"+inputBancoId).val('');
		$("#"+inputCuentaId).val('');
		}
	// Mide 18 caracteres, pasa
	else {
		// Determinamos las variables para generar el verificador
		var divisor = 10;
		var factorPeso = [3,7,1,3,7,1,3,7,1,3,7,1,3,7,1,3,7];
		var suma = 0;
		
		// Revisamos que la estructura de la CLABE sea válida (sólo 18 números)
		var regex = /^([0-9]{3})([0-9]{3})([0-9]{11})([0-9]{1})$/i;
		var subClabe = regex.exec(clabe);
		
		if (subClabe === null){
			mensaje='La CLABE no es válida, solo puede tener números';
			mensajeJs='clabeMal';
			$("#"+inputBancoId).val('');
			$("#"+inputCuentaId).val('');
			}
		else {
		
			var clabeTrunc = subClabe[1]+subClabe[2]+subClabe[3];
			var vClabe = subClabe[4];
			
			// Aquí generamos el verificador
			
			
			for (var i in clabeTrunc.split("")){
				// Cada dígito se multiplica por su factor de peso correspondiente
				var pesoDigito = clabeTrunc.charAt(i) * factorPeso[i];
				
				// A cada peso se le saca el mod10 y ese mod10 se suma al peso de los anteriores
				var mod = pesoDigito % divisor;
				suma = suma + mod;
				}
			
			// A la suma de todos los productos calculados, se le saca el modulo 10
			var sumaMod = suma % divisor;
			
			// Por último a 10 le restamos el mod de la suma del peso de la CLABE
			var verif = 10 - sumaMod;
			
			// Comparamos los dígitos, si son iguales, pasa
			if (vClabe == verif){
				mensaje='OK';
				mensajeJs='validadoOK';
				
				var bancos = { "002" : "BANAMEX", "012" : "BBVA BANCOMER", "014" : "SANTANDER", "019" : "BANJERCITO", "021" : "HSBC", "022" : "GE MONEY", "030" : "BAJÍO", "072" : "IXE", "036" : "INBURSA", "037" : "INTERACCIONES", "042" : "MIFEL", "044" : "SCOTIABANK", "058" : "BANREGIO", "059" : "INVEX", "060" : "BANSI", "062" : "AFIRME", "072" : "BANORTE", "102" : "ABNAMRO", "103" : "AMERICAN EXPRESS", "106" : "BAMSA", "108" : "TOKYO", "110" : "JP MORGAN", "112" : "BMONEX", "113" : "VE POR MAS", "116" : "ING", "124" : "DEUTSCHE", "126" : "CREDIT SUISSE", "127" : "AZTECA", "128" : "AUTOFIN", "129" : "BARCLAYS", "130" : "COMPARTAMOS", "131" : "FAMSA", "132" : "BMULTIVA", "133" : "PRUDENTIAL", "134" : "WAL-MART", "135" : "NAFIN", "136" : "REGIONAL", "137" : "BANCOPPEL", "138" : "AMIGO", "139" : "UBS BANK", "140" : "FÁCIL", "141" : "VOLKSWAGEN", "143" : "CIBanco", "145" : "BBASE", "147" : "BANKAOOL", "150" : "BIM", "166" : "BANSEFI", "168" : "HIPOTECARIA FEDERAL", "600" : "MONEXCB", "601" : "GBM", "602" : "MASARI CC.", "604" : "C.B. INBURSA", "605" : "VALUÉ", "606" : "CB BASE", "607" : "TIBER", "608" : "VECTOR", "610" : "B&B", "611" : "INTERCAM", "613" : "MULTIVA", "614" : "ACCIVAL", "615" : "MERRILL LYNCH", "616" : "FINAMEX", "617" : "VALMEX", "618" : "ÚNICA", "619" : "ASEGURADORA MAPFRE", "620" : "AFORE PROFUTURO", "621" : "CB ACTINBER", "622" : "ACTINVE SI", "623" : "SKANDIA", "624" : "CONSULTORÍA", "627" : "ZURICH", "628" : "ZURICHVI", "629" : "HIPOTECARIA SU CASITA", "630" : "C.B. INTERCAM", "631" : "C.B. VANGUARDIA", "632" : "BULLTICK C.B.", "633" : "STERLING", "634" : "FINCOMUN", "637" : "ORDER", "638" : "AKALA", "640" : "JP MORGAN C.B.", "646" : "STP", "649" : "SKANDIA", "901" : "CLS", "902" : "INDEVAL", };
				
				console.log('CLABE válida - BANCO: '+bancos[subClabe[1]]);
				$("#"+inputBancoId).val(bancos[subClabe[1]]);
				$("#"+inputCuentaId).val(subClabe[3]);
					
				}
			else {
				mensaje='La CLABE no es válida';
				mensajeJs='clabeMal';
				
				$("#"+inputBancoId).val('');
				$("#"+inputCuentaId).val('');
				}
			}
		}

	if (document.getElementById(inputBancoId)){
		validaCampo(['banco',inputBancoId,'opcional']);
		}
	if (document.getElementById(inputCuentaId)){
		validaCampo(['cuenta_bancaria',inputCuentaId,'opcional']);
		}

	return {mensaje: mensaje,mensajeJs: mensajeJs,imagen:mensajeImagen};
	}

/////////////// Termina validacion CLABE ///////////////

////////////////Validacion fecha ////////////////////


function verificaFecha(name) {
	// Devuelve si una cadena "dd/mm/yyyy" o "dd-mm-yyyy" o "dd.mm.yyyy" es una fecha válida 
	
	var mensaje = null;
	var mensajeJs=null;
	
	var fecha=document.getElementById(name).value;
	console.log(fecha);

//Verificamos que la fecha venga en el formato correcto
var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}(\-|\/|\.)(\d{4}|(12|13|14|15|16|17))$/;

if(!objRegExp.test(fecha)){
		console.log('nomatch');
		mensaje='La fecha no es v&aacute;lida, revisa que tenga el formato adecuado: dd/mm/aaaa, dd-mm-aaaa o dd.mm.aaaa';
		mensajeJs='fechaMal';
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
} //regresa mensaje de error si no coincide la fecha con la expresión  
	else {
	//Extraemos separador de fecha (-,/ o .) y guardamos la fecha en un arreglo
	var sinNum = /\w/g;
	var strSeparator = (fecha.replace(sinNum,"")).substring(0,1);
	var strSeparatorDos = (fecha.replace(sinNum,"")).substring(1,2);
	console.log(strSeparator);
	if (strSeparator != strSeparatorDos){
		console.log('nomatch')
		mensaje='La fecha no es v&aacute;lida, revisa que tenga el formato adecuado: dd/mm/aaaa, dd-mm-aaaa o dd.mm.aaaa';
		mensajeJs='fechaMal';
			return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
	}
	 	
	var arrayDate = fecha.split(strSeparator);
    
	//Si DIA o MES tienen menos de dos digitos le aumentamos un 0 al principio
	var dosNumExp = /\w{2}/;
	if (!dosNumExp.test(arrayDate[0])) arrayDate[0] = '0'+arrayDate[0];
	if (!dosNumExp.test(arrayDate[1])) arrayDate[1] = '0'+arrayDate[1]; 

	//Se crea un identificador de días para los meses que no son Febrero
	var arrayLookup = { '01' : 31,'03' : 31,
		'04' : 30,'05' : 31,
		'06' : 30,'07' : 31,
		'08' : 31,'09' : 30,
		'10' : 31,'11' : 30,'12' : 31
	};

	var intDay = parseInt(arrayDate[0],10);
	var intMonth = parseInt(arrayDate[1],10);
	var intYear = parseInt(arrayDate[2],10);
    
	if (intYear < 100) intYear=intYear+2000;
	if (intYear <= 2011 || intYear >= 2018){
			mensaje='El a&ntilde;o est&aacute; fuera del rango permitido';
			mensajeJs='fechaMal';
			return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
			}
    
	//Vemos si el valor del día es válido para el mes
    
	if (arrayLookup[arrayDate[1]] != null) {
      
		if (intDay <= arrayLookup[arrayDate[1]] && intDay != 0 && intYear > 2011 && intYear < 2018){
			mensaje='OK';
			mensajeJs='validadoOk';
			return {mensaje:mensaje,mensajeJs:mensajeJs}; //encontrado en la tabla de identificación, fecha buena
			}
		else if (intDay > arrayLookup[arrayDate[1]]){
			mensaje='El mes '+intMonth+' no puede tener '+intDay+' d&iacute;as';
			mensajeJs='fechaMal';
			return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
			}
		else if (intDay==0 || intMonth == 0){
			mensaje='El d&iacute;a no puede ser 0';
			mensajeJs='fechaMal';
			return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
			}
      
		}

	//check for February (bugfix 20050322)
	//bugfix for parseInt kevin
	//bugfix biss year  O.Jp Voutat
    
	//Validacion para Febrero
/* 
	if (intMonth == 2) {
		var intYear = parseInt(arrayDate[2]);

		if (intDay > 0 && intDay < 29) {
			mensaje='OK';
			mensajeJs='validadoOk';
			return {mensaje:mensaje,mensajeJs:mensajeJs}; //Es febrero y tiene menos de 29 dias, fecha buena
		}
		else if (intDay == 29) { //Si tiene 29 dias revisamos si es año bisiesto (Si el año es (div por 4 y no div por 100) o div por 400)
		if ((intYear % 4 == 0) && (intYear % 100 != 0) || (intYear % 400 == 0)) {
				mensaje='OK';
				mensajeJs='validadoOk';
				return {mensaje:mensaje,mensajeJs:mensajeJs}; //Es febrero, tiene 29 dias y es bisiesto, fecha buena
			return true;
			}
		else {
			mensaje='El mes '+intMonth+' no puede tener '+intDay+' d&iacute;as en a&ntilde;o no bisiesto';
			mensajeJs='fechaMal';
			return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
			}
		}
	else {
		mensaje='El mes '+intMonth+' no puede tener '+intDay+' d&iacute;as';
		mensajeJs='fechaMal';
		return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true};
		}
	}*/
}
	mensaje='Fecha inv&aacute;lida. El mes no puede ser menor que 1 ni mayor que 12';
	mensajeJs='fechaMal';
	return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:true}; //any other values, bad date
}
	


////////////////Termina validacion fecha ///////////

/////////////// Validacion email /////////////////////

function verificaEmail(name){
	var email=document.getElementById(name).value;
	var atpos=email.indexOf("@");
	var dotpos=email.lastIndexOf(".");
	var mensaje =null;
	var mensajeJs=null;
	if (email.length>0){
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
		mensaje="El email: " + email + " no es correcto.";
		mensajeJs='emailMal';
	}
	else{
		mensaje='OK';
		mensajeJs='validadoOk'
	}
	}
	else{
		mensaje='OK';
		mensajeJs='validadoOk'
		}
	return {mensaje:mensaje,mensajeJs:mensajeJs};
}
/////////////// Termina validacion email /////////////

////////////// Validacion telefono //////////////////

function soloNumeros(str){
	var regex = /\D/g;
var soloNum=str.replace(regex,"");
	return (soloNum);
}

function buscaLada(tel){
	console.log('Entra a buscalada: '+tel)
	var telLada=tel.substring(0,3);
	var telLada2=tel.substring(0,2);
    
	if((tel.length==8)){
//	console.log('Tiene 8 digitos')
	return true;
	}
	else if (tel.length==10){
//	console.log('Tiene 10 digitos')
//	console.log('TelLada No CEL: '+telLada);
	}
	else if(tel.length==13){
//	console.log('Tiene 13 digitos')
	if (telLada=='044'){
		telLada=tel.substring(3,5)
	}
	else if (telLada=='045'){
		telLada=tel.substring(3,6)
	}
	console.log("CEL LADA:"+telLada)
	}
	var lada2=new Array("33","55","81");
	var lada=new Array("222","223","224","225","226","227","228","229","231","232","233","235","236","237","238","241","243","244","245","246","247","248","249","271","272","273","274","275","276","278","279","281","282","283","284","285","287","288","294","296","297","311","312","313","314","315","316","317","319","321","322","323","324","325","326","327","328","329","341","342","343","344","345","346","347","348","349","351","352","353","354","355","356","357","358","359","371","372","373","374","375","376","377","378","381","382","383","384","385","386","387","388","389","391","392","393","394","395","411","412","413","414","415","417","418","419","421","422","423","424","425","426","427","428","429","431","432","433","434","435","436","437","438","441","442","443","444","445","447","448","449","451","452","453","454","455","456","457","458","459","461","462","463","464","465","466","467","468","469","471","472","473","474","475","476","477","478","481","482","483","485","486","487","488","489","492","493","494","495","496","498","499","588","591","592","593","594","595","596","597","599","612","613","614","615","616","618","621","622","623","624","625","626","627","628","629","631","632","633","634","635","636","637","638","639","641","642","643","644","645","646","647","648","649","651","652","653","656","658","659","661","662","664","665","667","668","669","671","672","673","674","675","676","677","686","687","694","695","696","697","698","711","712","713","714","715","716","717","718","719","721","722","723","724","725","726","727","728","731","732","733","734","735","736","737","738","739","741","742","743","744","745","746","747","748","749","751","753","754","755","756","757","758","759","761","762","763","764","765","766","767","768","769","771","772","773","774","775","776","777","778","779","781","782","783","784","785","786","789","791","797","821","823","824","825","826","828","829","831","832","833","834","835","836","841","842","844","845","846","861","862","864","866","867","868","869","871","872","873","877","878","891","892","894","897","899","913","914","916","917","918","919","921","922","923","924","932","933","934","936","937","938","951","953","954","958","961","962","963","964","965","966","967","968","969","971","972","981","982","983","984","985","986","987","988","991","992","993","994","995","996","997","998","999");
	if ((lada.indexOf(telLada)>=0)||(lada2.indexOf(telLada2)>=0)){
	return true;
	}else{
	return false;
	}
}

function verificaTel(name){
//    console.log('Verif '+val);
//    console.log('error_'+val);
	var mensaje=null;
	var mensajeJs=null;
	var tel=document.getElementById(name).value;
	var tel_ok=soloNumeros(tel);
	document.getElementById(name).value=tel_ok; //Corrige telefono si quitando caracteres no numericos
//    console.log('Tel: '+tel_ok);
	if ((tel_ok==null)||(tel_ok=="")){
	return {mensaje:'OK',mensajeJs:'OK'};
	}
	if ((tel_ok.length==10)||(tel_ok.length==8)||(tel_ok.length==13)){
	var verifica_tel=buscaLada(tel_ok);
	if ( verifica_tel == true){
		mensaje='OK';
		mensajeJs='OK';
	}
	else if(verifica_tel == false){
		mensaje='La lada no Coincide';
		mensajeJs='telMalLada';
	}
	}
	else{
	mensaje='N&uacute;mero Inv&aacute;lido';
	mensajeJs='digitosMal';
	}
	return{mensaje:mensaje,mensajeJs:mensajeJs};
}

////////////// Termina validacion telefono //////////


///////////// Validación COMBOS colonia,entidad,municipio////////////////////

function vaciaCombos(nombreForma,callback) {
	$('#input_'+nombreForma+'_sepomex_id').val('');
	$('#warn_sepomex_id').val('sinDato');
	$('#input_'+nombreForma+'_entidad').html('<option value="0">---</option>');
	$('#input_'+nombreForma+'_municipio').html('<option value="0">---</option>');
	$('#input_'+nombreForma+'_colonia').html('<option value="0">---</option>');
	
	if (document.getElementById('input_'+nombreForma+'_entidad')){
		validaCampo(['entidad','input_'+nombreForma+'_entidad']);
		}
	if (document.getElementById('input_'+nombreForma+'_municipio')){
		validaCampo(['municipio','input_'+nombreForma+'_municipio']);
		}
	if(document.getElementById('input_'+nombreForma+'_colonia')){
		validaCampo(['colonia','input_'+nombreForma+'_colonia']);
		}
	
	if (callback){
		callback;
		}
	}


function rellenaCombosEscuela(nombreForma, comboCarrera){
	console.log('rellenaCombosEscuela(nombreForma: '+nombreForma+', comboCarrera: '+comboCarrera);
	$('#input_'+nombreForma+'_carrera_id').val('');
	$('#warn_carrera_id').val('sinDato');

	$('#input_'+nombreForma+'_carrera').html(comboCarrera);

}
function rellenaCombos(nombreForma,sepomexId,comboEntidad,comboMunicipio,comboColonia,errorEntidad,errorMunicipio,errorColonia) {
	
	$('#input_'+nombreForma+'_sepomex_id').val('');
	$('#warn_sepomex_id').val('sinDato');
	
	$('#input_'+nombreForma+'_entidad').html(comboEntidad);
	$('#input_'+nombreForma+'_municipio').html(comboMunicipio);
	
	if (comboColonia){
		$('#input_'+nombreForma+'_colonia').html(comboColonia).css({width:'160px'});
		if ( !document.getElementById('boton_cambio_col') ){
			$('#input_'+nombreForma+'_colonia').after("<input type='button' id='boton_cambio_col' class='reportes_boton gris discreto' style='padding: 6px 6px;' value='Otra' onclick=insertaNuevaColonia('"+nombreForma+"')>");			
			}
		}
	
	
	$('#warn_entidad').val(errorEntidad);
	$('#warn_municipio').val(errorMunicipio);
	$('#warn_colonia').val(errorColonia);
	
	if (document.getElementById('input_'+nombreForma+'_entidad')){
		validaCampo(['entidad','input_'+nombreForma+'_entidad']);
		}
	if (document.getElementById('input_'+nombreForma+'_municipio')){
		validaCampo(['municipio','input_'+nombreForma+'_municipio']);
		}
	if(document.getElementById('input_'+nombreForma+'_colonia')){
		validaCampo(['colonia','input_'+nombreForma+'_colonia']);
		}
	if (sepomexId){
		$('#input_'+nombreForma+'_sepomex_id').val(sepomexId);
		$('#warn_sepomex_id').val('validadoOk');
		}
	if ($('#input_'+nombreForma+'_seccion').val()){
		validaCampo(['seccion','input_'+nombreForma+'_seccion'],[validaCampo]);
		}
		
	
	}
function rellenaCombosAspirantes(nombreForma,sepomexId,comboEntidad,comboMunicipio,comboColonia,errorEntidad,errorMunicipio,errorColonia){
	console.log('rellenaCombosAspirantes(...)');
	rellenaCombos(nombreForma,sepomexId,comboEntidad,comboMunicipio,comboColonia,errorEntidad,errorMunicipio,errorColonia);
	rellenaSepomex('registro_aspirantes_localidad');
	validaCamposDiv(['registro_aspirantes_localidad','input_registro_aspirantes_localidad_boton_continuar'],[validaCamposDiv]);
}

function rellenaComboMunicipal(nombreForma,comboMunicipio) {
	
	$('#input_'+nombreForma+'_municipio').html(comboMunicipio);
	if ($('#input_'+nombreForma+'_seccion').val()){
		validaCampo(['seccion','input_'+nombreForma+'_seccion'],[validaCampo]);
		}
	}

function insertaNuevaColonia(nombreForma,colonia) {
	
	if (!colonia){
		// Si no se manda colonia verificamos si existe el input auxiliar para agregar colonia
		// y lo agregamos en caso de faltar
		if ( !document.getElementById('input_'+nombreForma+'_colonia_aux') ){
			$('#label_input_'+nombreForma+'_colonia').after("<input type='text' name='input_"+nombreForma+"_colonia_aux' id='input_"+nombreForma+"_colonia_aux' class='"+nombreForma+"' style='display:none' onBlur=insertaNuevaColonia('"+nombreForma+"',this.value)>");			
			}
		}
	else {
		// Jalamos el valor existente seleccionado
		var opcionAnterior = $('#input_'+nombreForma+'_colonia').val();
		
		// Buscamos primero si la colonia ya se encuentra entre las opciones y la seleccionamos
		$('#input_'+nombreForma+'_colonia').find('option[value="'+colonia.toUpperCase()+'"]').prop('selected',true);
		
		// Si no se encuentra (el input tiene el mismo valor que antes) y la colonia es distinta a la opción seleccionada
		// creamos una nueva colonia y la seleccionamos
		if ($('#input_'+nombreForma+'_colonia').val() == opcionAnterior && colonia.toUpperCase() != opcionAnterior){
			
			var opcionNueva = $('<option sepomex-id="" value="'+colonia.toUpperCase()+'">'+colonia.toUpperCase()+'</option>');
			$('#input_'+nombreForma+'_colonia').append(opcionNueva);
			$(opcionNueva).prop('selected',true);
			}
		
		
		rellenaSepomex(nombreForma);
		
		}
	
	$('#input_'+nombreForma+'_combo_colonia').toggle().focus();
	$('#input_'+nombreForma+'_colonia_aux').toggle().focus();
	
	validaCampo(['colonia','input_'+nombreForma+'_colonia'],[validaCampo]);
	}

function rellenaSepomex(nombreForma) {
	console.log('entra a rellenaSepomex(nombreForma: '+nombreForma+')')
	var colonia = $('#input_'+nombreForma+'_colonia').val();
	console.log('colonia: '+colonia+'')
	if (colonia){
		var sepomexId = $('#input_'+nombreForma+'_colonia').find('option[value="'+colonia.toUpperCase()+'"]').attr('sepomex-id');
		$('#input_'+nombreForma+'_sepomex_id').val(sepomexId);
		$('#warn_sepomex_id').val('validadoOk');
		}
	}


/////// TERMINA VALIDACIÓN DE COMBOS 


	// Verifica Seccion con maximo de Secciones por Entidad

function verificaSecc(name_formulario,name){
	//parametro name corresponde a seccion
	var intervalos = { '1': '607', '2' : '1969', '3' : '495' , '4' : '530' , '5' : '1710' , '6' : '372' , '7': '2048' , '8' : '3263' , '9' : '5556' , '10' : '1447' , '11' : '3154' , '12' : '2793' , '13' : '1787' , '14' : '3590' , '15' : '6498' , '16' : '2703' , '17' : '907' , '18' : '971' , '19' : '2709' , '20' : '2453' , '21' : '2663', '22' : '866' , '23' : '959' , '24' : '1827' , '25' : '3837' , '26' : '1556' , '27' : '1133' , '28' : '2028' , '29' : '608', '30' : '4835' , '31' : '1129' , '32' : '1909' };
	var mensaje    = null;
	var mensajeJs  = null;
	if(name.length == 0){
	var name   = "input_form_alta_preafil_seccion"; 
	}
	var seccion    = document.getElementById(name).value;
	var entidad    = document.getElementById(name_formulario+'entidad').value;

	if(entidad.length !== 0){
	var int_secc   = intervalos[entidad];
	if( parseInt((seccion),10) > 0 && parseInt((seccion),10) <= parseInt(int_secc) ){
		mensaje   = 'OK';
		mensajeJs = 'OK';
	}else {
		mensaje   = 'Secci&oacute;n fuera de rango';
		mensajeJs = 'seccionMal'
		//return false;
	}
	return { mensaje : mensaje , mensajeJs : mensajeJs };
	}
	return false;
}

function remueveAcentos(cadena){
	var map={
		'À':'A','Á':'A','Â':'A','Ã':'A','Ä':'A','Å':'A','Æ':'AE','Ç':'C','È':'E','É':'E','Ê':'E','Ë':'E','Ì':'I','Í':'I','Î':'I','Ï':'I','Ð':'D','Ò':'O','Ó':'O','Ô':'O','Õ':'O','Ö':'O','Ø':'O','Ù':'U','Ú':'U','Û':'U','Ü':'U','Ý':'Y','ß':'s','à':'a','á':'a','â':'a','ã':'a','ä':'a','å':'a','æ':'ae','ç':'c','è':'e','é':'e','ê':'e','ë':'e','ì':'i','í':'i','î':'i','ï':'i','ò':'o','ó':'o','ô':'o','õ':'o','ö':'o','ø':'o','ù':'u','ú':'u','û':'u','ü':'u','ý':'y','ÿ':'y','Ā':'A','ā':'a','Ă':'A','ă':'a','Ą':'A','ą':'a','Ć':'C','ć':'c','Ĉ':'C','ĉ':'c','Ċ':'C','ċ':'c','Č':'C','č':'c','Ď':'D','ď':'d','Đ':'D','đ':'d','Ē':'E','ē':'e','Ĕ':'E','ĕ':'e','Ė':'E','ė':'e','Ę':'E','ę':'e','Ě':'E','ě':'e','Ĝ':'G','ĝ':'g','Ğ':'G','ğ':'g','Ġ':'G','ġ':'g','Ģ':'G','ģ':'g','Ĥ':'H','ĥ':'h','Ħ':'H','ħ':'h','Ĩ':'I','ĩ':'i','Ī':'I','ī':'i','Ĭ':'I','ĭ':'i','Į':'I','į':'i','İ':'I','ı':'i','Ĳ':'IJ','ĳ':'ij','Ĵ':'J','ĵ':'j','Ķ':'K','ķ':'k','Ĺ':'L','ĺ':'l','Ļ':'L','ļ':'l','Ľ':'L','ľ':'l','Ŀ':'L','ŀ':'l','Ł':'L','ł':'l','ń':'#','Ņ':'#','ņ':'#','Ň':'#','ň':'#','ŉ':'#','Ō':'O','ō':'o','Ŏ':'O','ŏ':'o','Ő':'O','ő':'o','Œ':'OE','œ':'oe','Ŕ':'R','ŕ':'r','Ŗ':'R','ŗ':'r','Ř':'R','ř':'r','Ś':'S','ś':'s','Ŝ':'S','ŝ':'s','Ş':'S','ş':'s','Š':'S','š':'s','Ţ':'T','ţ':'t','Ť':'T','ť':'t','Ŧ':'T','ŧ':'t','Ũ':'U','ũ':'u','Ū':'U','ū':'u','Ŭ':'U','ŭ':'u','Ů':'U','ů':'u','Ű':'U','ű':'u','Ų':'U','ų':'u','Ŵ':'W','ŵ':'w','Ŷ':'Y','ŷ':'y','Ÿ':'Y','Ź':'Z','ź':'z','Ż':'Z','ż':'z','Ž':'Z','ž':'z','ſ':'s','ƒ':'f','Ơ':'O','ơ':'o','Ư':'U','ư':'u','Ǎ':'A','ǎ':'a','Ǐ':'I','ǐ':'i','Ǒ':'O','ǒ':'o','Ǔ':'U','ǔ':'u','Ǖ':'U','ǖ':'u','Ǘ':'U','ǘ':'u','Ǚ':'U','ǚ':'u','Ǜ':'U','ǜ':'u','Ǻ':'A','ǻ':'a','Ǽ':'AE','ǽ':'ae','Ǿ':'O','ǿ':'o'};

	var cadenaNueva='';
	for (var i=0;i<cadena.length;i++)
	{
	c=cadena.charAt(i);cadenaNueva+=map[c]||c;
	}
	return cadenaNueva;
}

function sepomexID(campos){
//    console.log('SEPOMEX: '+campos);
	var name_salida=campos.shift();
	var dato=campos.shift();
	var regex = /\s/g;
	dato=dato.replace(regex,"_");
	var name_entrada='sepomex_id-'+dato
	var regex2 =/_sepomex_id/g;
	var nombre_forma=name_salida.replace(regex2,"");
//    console.log('SEPOMEXID DATO: '+dato);
	if (typeof dato !== 'undefined' && dato.length>1){
	console.log('Escribe en sepomex_id')
	document.getElementById(name_salida).value=document.getElementById(name_entrada).value //ESCRIBE en el hidden sepomex
	document.getElementById('warn_sepomex_id').value='validadoOK' //ESCRIBE en el hidden sepomex
	}else{
	console.log('Borra sepomex_id')
	document.getElementById(name_salida).value='' //ESCRIBE en el hidden sepomex
	document.getElementById('warn_sepomex_id').value='sinDato' //ESCRIBE en el warning del hidden sepomex
	}
}

function validaPasswd(passwd,name){
	console.log('validaPasswd(passwd: '+passwd+', name: '+name+')');
	//	var passwd1=document.getElementById(input_admin_alta_usuario_passwd).value;
	var mensaje=null;
	var mensajeJs=null;
	var imagen=null;
	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
	if (re.test(passwd)==false){
	mensaje='La contraseña no es segura, debe contener al menos 8 letras, algún número y alguna letra en MAYUSCULAS';
	mensajeJs='passwdMal';
	var re =/passwd/g;
	var name_base=name.replace(re,"");
	var passwd2=document.getElementById(name_base+'passwd_confirma').value;
	if (passwd2.length>0){
		document.getElementById(name_base+'passwd_confirma').value='';
		document.getElementById(name_base+'passwd_confirma').text='';
	}
	
	}
	else{
	mensaje='OK';
	mensajeJs='validadoOk'
	imagen=true;
	}
	return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:imagen};
}

function validaPasswdConf(passwd,name){
	var re =/passwd_confirma/g;
	var name_base=name.replace(re,"");
	var mensaje=null;
	var mensajeJs=null;
	var imagen=null;
	console.log(name_base)
	var passwd0=document.getElementById(name_base+'passwd').value;
	if (passwd != passwd0){
	mensaje='La contraseña no COINCIDE con la primera que ingresaste';
	mensajeJs='passwdMal';
	}
	else{	
	mensaje='OK';
	mensajeJs='validadoOk';
	imagen=true;
	}
	return {mensaje:mensaje,mensajeJs:mensajeJs,imagen:imagen};
}

function actualizaPersonaID(persona_id){
	if (typeof persona_id !== 'undefined'){
	document.getElementById('input_admin_alta_usuario_persona_id').value=persona_id;
	}
}

function pintaPersonaId(personaId,inputId){
	if (typeof personaId !== 'undefined'){
		document.getElementById(inputId).value=personaId;
		}
	}

//Genera callback para que se valide siempre despues de que se escribe
function escribeClave(clave){
	function llenaInputs(clave,callback){
	document.getElementById('input_admin_alta_usuario_passwd').value=clave;
	callback();
	}
	function llenaInputs2(clave,callback){
	document.getElementById('input_admin_alta_usuario_passwd_confirma').value=clave;
	callback();
}
    
	llenaInputs(clave,function() {validaCampo(['passwd','input_admin_alta_usuario_passwd']); })
	llenaInputs2(clave,function() {validaCampo(['passwd_confirma','input_admin_alta_usuario_passwd_confirma']); })
}

function validaCampoResponsable(campo,validacion) {
	console.log('Entra a responsable')
	//    name=validacion;
	console.log('campo: '+campo+' Validacion: '+validacion)
	var campo_resp=campo.replace('input_admin_alta_comite_prota_',"");
	if (validacion==0){
	mensaje='No existe protagonista con esta clave';
	mensajeJs='noExisteProta';
	document.getElementById('error_'+campo).innerHTML='<img src=/img/form_error.png alt="'+mensaje+'" title="'+mensaje+'">';
	document.getElementById('errorjs_'+campo).innerHTML='<input type="hidden" name="warn_'+campo_resp+'" value="'+mensajeJs+'" id="warn_'+campo_resp+'">';
	if (campo=='input_admin_alta_comite_estatal_responsable1'){
		habilitaBoton([campo,campo,'div_form_alta_boton_registro']);
	}
	}
	else if(validacion==1){
	mensaje='Clave Verificada';
	mensajeJs='validadoOk'
	document.getElementById('error_'+campo).innerHTML='<img src=/img/form_ok.png alt="'+mensaje+'" title="'+mensaje+'">';
	document.getElementById('errorjs_'+campo).innerHTML='<input type="hidden" name="warn_'+campo_resp+'" value="'+mensajeJs+'" id="warn_'+campo_resp+'">';
	if (campo=='input_admin_alta_comite_estatal_responsable1'){
		habilitaBoton([campo,campo,'div_form_alta_boton_registro']);
	}
	}
    
	validaCamposDiv(['admin_alta_comite_prota','div_form_alta_boton_registro'])
}

function buscaCoincidencia(campos){
	var elemento=campos.shift();
	var divName=campos.shift();
//    var coincidencia=campos.shift();

	var opcion=document.getElementById(elemento);
	var valor=opcion.options[opcion.selectedIndex].text;
	console.log('Div: '+divName+' Elemento: '+elemento)
	var divElementos = document.getElementById(divName).childNodes;
	for (var i = 0; i < divElementos.length; i++){
	var linea=divElementos[i].innerHTML;
	if (typeof(linea)=='undefined'){
		return;
	}

	if ((typeof(linea.match(valor,'g')) !== 'undefined') && (linea.match(valor,'g') !== null)){
		mensaje='El cargo ya ha sido asignado a otra persona';
		document.getElementById('error_'+elemento).innerHTML='<img src=/img/form_error.png alt="'+mensaje+'" title="'+mensaje+'">';
	}
	else{
		document.getElementById('error_'+elemento).innerHTML='';
	}
	}
	return;
}

function validaCamposDiv(valores){
	var div = valores.shift();
	var boton = valores.shift();
	//Esta funcion valida todos los elementos dentro de un div que tienen el id "warn".
	//Si existe algun valor diferente a validadoOk, deja desabilitado el boton. 
	console.log('Entra a validaCamposDiv: div -> '+div+' BOTON -> '+boton);
	
	var inputs = document.getElementById(div).getElementsByTagName('input');
	var errores_cuenta=0;
	for (var i = 0; i < inputs.length; i++){
	if (inputs[i].id.match(/warn/g)){
		if (inputs[i].value!=='validadoOk'){
		if (inputs[i].id!=='warn_tipo'){
		console.log(inputs[i].id+'-> '+inputs[i].type+'-> '+inputs[i].value+'=> NAA')
		errores_cuenta=errores_cuenta+1;
		}
		}
	}
	}
    
	if (typeof(document.getElementById(boton)) != 'undefined' &&  document.getElementById(boton) != null){
	var existe_boton=1;
	}else{
	existe_boton=0;
	}
		console.log('errores_cuenta '+errores_cuenta)
		console.log('existe_boton? '+existe_boton)

	if (errores_cuenta==0) {
	console.log('Sin ERRORES. Boton: '+boton)
	if (existe_boton==1){
		
		document.getElementById(boton).disabled=false;
		console.log('Se activa Boton: '+boton)
//	    document.getElementById(boton).focus();
//	    console.log('entra a foco')

	}
	}else{
	if (existe_boton==1){
		document.getElementById(boton).disabled=true;
	    
	}
	}
}

function validaTelefonos(valores) {
	var nombre_forma= valores.shift();
	var div = valores.shift();
	var boton = valores.shift();
	
	var fijo = 'telefono_fijo';
	var movil = 'telefono_movil';

	validaCampo([fijo,nombre_forma+'_'+fijo],[validaCampo]);
	validaCampo([movil,nombre_forma+'_'+movil],[validaCampo]);
	
	var datoFijo = document.getElementById(nombre_forma+'_'+fijo).value;
	var datoMovil = document.getElementById(nombre_forma+'_'+movil).value;
	
	var validacionFijo = document.getElementById('warn_'+fijo).value;
	var validacionMovil = document.getElementById('warn_'+movil).value;
	
	if (datoFijo.length == 0 && datoMovil.length== 0){
		document.getElementById('warn_'+fijo).value='sinDato';
		document.getElementById('warn_'+movil).value='sinDato';
		}
	else if ((datoFijo.length > 0 && validacionFijo == 'validadoOk' && datoMovil.length==0) || (datoMovil.length > 0 && validacionMovil == 'validadoOk' && datoFijo.length==0)) {
		document.getElementById('warn_'+fijo).value='validadoOk';
		document.getElementById('warn_'+movil).value='validadoOk';
		}
	
	validaCamposDiv([div,boton],[validaCamposDiv]);
	}

function buscaGenero(cve_ife,radio){
	
	console.log("Entra a: buscaGenero " + [cve_ife,radio]);
	var clave=document.getElementById(cve_ife).value;
	
	var gen = clave.substring(14,15).toUpperCase();
	
	var elements = document.getElementsByName(radio);
	
	for (i=0;i<elements.length;i++) {
		if(elements[i].value == gen) {
			elements[i].checked = true;
			}
		}
	validaCampo(['sexo',radio]);
	}

function buscaGeneroByCURP(curp,radio){
	
	console.log("Entra a: buscaGeneroByCURP " + [curp,radio]);
	var clave=document.getElementById(curp).value;
	
	var gen = clave.substring(10,11).toUpperCase();
	console.log(gen);
	var elements = document.getElementsByName(radio);
	
	for (i=0;i<elements.length;i++) {
		if(elements[i].value == gen) {
			elements[i].checked = true;
			}
		}
	validaCampo(['sexo',radio]);
	}

function generaCSV(texto){
	
//	console.log(texto)
	
//	var lines = texto.split('\n');
//	var texto_csv = '';
//	for(var i = 0;i < lines.length;i++){
//		texto_csv = texto_csv+lines[i]+'\\n';
//		}
//	console.log(texto)
	var uri = 'data:text/csv;charset=utf-8,'+escape(texto);
	var link = document.createElement('a');
	link.href = uri;
	link.target ='_blank';
	link.download='reporte.csv';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	}

function validaCampoPartidos(campos){
	console.log(campos)
	
	var nombreForma =campos.shift();
	var inputId = campos.shift();
	var campo = inputId.replace('input_'+nombreForma+'_','');
	var valor = document.getElementById(inputId).value;
	var mensajes={mensaje:null,mensajeJs:null,imagen:null};
	
	var regExp = /[^\d]/g;
	var regExpGuion = /[-]{1,}/g;
	
	
	if (valor == null || valor == ''){
		mensajes.mensaje = 'Este campo no puede ir vacío';
		mensajes.mensajeJs = 'sinDato';
		mensajes.imagen = '<img src=/img/form_error.png alt="'+mensajes.mensaje+'" title="'+mensajes.mensaje+'">';
		}
	else if (valor.match(regExpGuion)){
		document.getElementById(inputId).value = '-';
		mensajes.mensaje = 'Sin Dato';
		mensajes.mensajeJs = 'validadoOk';
		mensajes.imagen = '<img src=/img/form_ok.png alt="'+mensajes.mensaje+'" title="'+mensajes.mensaje+'">';
		} 
	else if (valor.match(regExp)){
		mensajes.mensaje = 'Este campo solo debe contener números o un guión (-) ';
		mensajes.mensajeJs = 'digitosMal';
		mensajes.imagen = '<img src=/img/form_error.png alt="'+mensajes.mensaje+'" title="'+mensajes.mensaje+'">';
		} 
	else{
		mensajes.mensaje = 'Válido';
		mensajes.mensajeJs = 'validadoOk';
		mensajes.imagen = '<img src=/img/form_ok.png alt="'+mensajes.mensaje+'" title="'+mensajes.mensaje+'">';
		}
	
	document.getElementById('warn_'+campo).value=mensajes.mensajeJs;
	document.getElementById('error_'+inputId).innerHTML=mensajes.imagen;
	}

function regresaRespuestaAjax (respuesta){
	console.log(respuesta)
	
	if (respuesta != '<p>Ingresado con éxito</p>'){
		$(newWindow.document).contents().find('#div_mensaje').html(respuesta).show('fast',function (){
		$(newWindow.document).contents().find('#div_spinner').hide('fast',function (){
			$(newWindow.document).contents().find('#div_boton').show();
			});
		});
		}
	else{
		$(newWindow.document).contents().find('#div_boton').html(respuesta).show('fast',function (){
		$(newWindow.document).contents().find('#div_spinner').hide();
		});
		}
	}

function mod11_check (val) {
	var num = val.substr(0, val.length - 1);
	var sum = 0;
	var pos = 0;

	for (var i = num.length - 1; i >= 0; i--) {
		sum += parseInt (num.substr (i, 1), 10) * (pos + 2);
		pos = (pos + 1) % 6;
	}

	var mod11 = 11 - sum % 11;
	if (mod11 > 9) mod11 = 0;

	if (val.substr (val.length - 1) != mod11.toString ())
		return false;
	return true;
	}

var mod10 = (function()
		{
		var luhnArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
		return function(str)
		{
			var counter = 0;
			var incNum;
			var odd = false;
			var temp = String(str).replace(/[^\d]/g, "");
			if ( temp.length == 0){
			return false;}
			for (var i = temp.length-1; i >= 0; --i)
			{
			incNum = parseInt(temp.charAt(i), 10);
			counter += (odd = !odd)? incNum : luhnArr[incNum];
			}
			return (counter%10 == 0);
		}
		})();

	
