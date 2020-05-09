var form;

function spinner(cve_ife){
	document.getElementById('tabla_afiliado').innerHTML='<h2>Procesando tu solicitud</h2><img src="/img/spinner_red.gif" alt="Espera un momento">';
	busca(cve_ife)
}

function menyOpen(){
	$('#principal_menu').toggleClass("w3-animate-left w3-animate-closeleft");
	document.getElementById('principal_menu').style.display = "block";
	$('#principal_overlay').fadeIn();
	}

function menyClose(){
	$('#principal_menu').toggleClass("w3-animate-left w3-animate-closeleft");
	$('#principal_overlay').fadeOut();
	}

function waitSpinner(div,mensaje){
	
	if (!mensaje){
		document.getElementById(div).innerHTML='<h3>Procesando tu solicitud</h3><img src="/img/spinner_red.gif" alt="Espera un momento">';
		}
	else {
		
		if (mensaje == 1) {
			$('#'+div).html('<h3>Procesando tu solicitud</h3><img src="/img/spinner_circle.gif" alt="Espera un momento">');
			}
		else if(mensaje == 2){
			$('#'+div).html('<h3>Procesando tu solicitud</h3><img src="/img/ballm2.gif" alt="Espera un momento">');
			}
		else {
			$('#'+div).html(mensaje + '<img src="/img/spinner_red.gif" alt="Espera un momento">');
		}
		
/*		if (mensaje != 1){
			$('#'+div).html(mensaje + '<img src="/img/spinner_red.gif" alt="Espera un momento">');
			}
		else {
			$('#'+div).html('<h3>Procesando tu solicitud</h3><img src="/img/ballm2.gif" alt="Espera un momento">');
			}*/
		
		}
	
	}

function spinnerValida(div,mensaje) {
	$('#'+div).html(mensaje+'<img src="/img/spinner_circle.gif" style="display:inline-block;max-width:100%;max-height:100%" alt="Espera un momento">');
	}

function busca(){
	buscaInvitacion(['barra_acciones_var','input_admin_busca_afiliado_cve_ife','warn_cve_ife'],['tabla_afiliado'],'POST');
}

function pad (str, max) {
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
	}

function pintaForma(mostrar,div,html,divRespuesta){
	
	if (!divRespuesta){
		muestraDiv(mostrar,div,html);	
		}	
	else {
		$('#'+divRespuesta).html(html)
		}
	
	// We need to access the form element
	form = document.getElementById("form_alta_comite_prota_acta");

	// to takeover its submit event.
	if (form){
		form.addEventListener("submit", function (event) {
			event.preventDefault();

			sendData();

			});
		}
	
	var liga =document.getElementById("fileSelect");
	if (liga){
		pruebaClickEvent ("fileSelect","input_alta_comite_prota_acta");
		pruebaClickEvent ("fileSelect2","input_alta_comite_prota_acta");
		}
	
	}

function formularioSubirArchivos(html,divId,inputId,formId,url){
	
	if (divId == 'muestraDiv'){
		muestraDiv(1,'principal_error',html);
		}
	else{
		$('#'+divId).html(html);
		}
	
	if (!inputId){
		return;
		}
	
	// We need to access the form element
	if (!formId){
		formId = "form_alta_comite_prota_acta";
		}
	
	var formulario = document.getElementById(formId);

	// to takeover its submit event.
	if (formulario){
		formulario.addEventListener("submit", function (event) {
			event.preventDefault();

			sendFileData(formulario,null,url);

			});
		}
	
	var liga = document.getElementById("fileSelect");
	if (liga){
		pruebaClickEvent ("fileSelect",inputId);
		pruebaClickEvent ("fileSelect2",inputId);
		}
	
	}

function openSessionAdvice() {
	Avgrund.show( "#default-popup" );
	avgrundState = 'open';
	}

function closeSessionAdvice() {
	Avgrund.hide();
	avgrundState = 'closed';
	}

function initSessionTimeOut(seconds) {
	
	sessionTime = seconds;
	lastAccessTime = Date.now();
	avgrundState = 'closed';
	
	initAjaxListener();
	logInTimeOut = sessionTime;
	DisplaySessionTimeout();
	
	//console.log('Iniciando Sesión');
	}

function restartSession() {
	waitSpinner('sessionResponse');
	$('.sessionLogIn').hide();
	$('.sessionResponse').fadeIn('slow');
	sessionLogin(['input_alta_comite_prota_usuario','input_alta_comite_prota_passwd'],[restartSessionTimeOut],'POST');
	}

function restartSessionTimeOut(htmlResponse,loginForm,seconds) {
	sessionTime = seconds;
	if (sessionTime > 0){
		lastAccessTime = Date.now();
		logInTimeOut = sessionTime;
		DisplaySessionTimeout();
		//console.log('Reiniciando Sesión');
		}
	
	if (loginForm){
		$('.sessionLogIn').html(loginForm);
		}
	
	$('.sessionResponse').html(htmlResponse);
	
	}


function DisplaySessionTimeout() {
	var elapsedSessionTime = Math.floor((Date.now() - lastAccessTime) /1000);
	
	logInTimeOut = sessionTime - elapsedSessionTime;
//	//console.log('Quedan '+logInTimeOut+' segundos... Elapsed '+elapsedSessionTime+' segundos');
	
	var sessionTimeOut = window.setTimeout("DisplaySessionTimeout()", 1000);
	
	var minutes = Math.floor(logInTimeOut / 60);
	var secs = logInTimeOut - (minutes*60);
	
	if (logInTimeOut <= 0) {
		//console.log('SESION EXPIRADA');
		sessionTime = 0;
		clearTimeout(sessionTimeOut);
		$('.checkSession').hide();
		$('.sessionLogIn').fadeIn('slow');
		}
	else if (logInTimeOut <= 300) {
		$('#sessionMin').text(minutes);
		$('#sessionSec').text(secs);
		
		if (avgrundState == 'closed'){
			//console.log('SESION A PUNTO DE EXPIRAR');
			openSessionAdvice();
			}
		}
	
	
	
//	var padSec = ' ' + secs;
//	if (padSec.length == 2){
//		padSec = ' 0'+secs;
//		}
//	$('#barraMin').text(minutes + ' ');
//	$('#barraSec').text(padSec);
	}

function initAjaxListener() {

	s_ajaxListener = new Object();
	s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
	s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
	s_ajaxListener.callback = function () {
		// this.method :the ajax method used
		// this.url    :the url of the requested script (including query string, if any) (urlencoded) 
		// this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
		
		if (sessionTime > 0){
			lastAccessTime = Date.now();			
			logInTimeOut = sessionTime;
			}

		}
	
	XMLHttpRequest.prototype.open = function(a,b) {
		if (!a) var a='';
		if (!b) var b='';
		s_ajaxListener.tempOpen.apply(this, arguments);
		s_ajaxListener.method = a;  
		s_ajaxListener.url = b;
		if (a.toLowerCase() == 'get') {
			s_ajaxListener.data = b.split('?');
			s_ajaxListener.data = s_ajaxListener.data[1];
			}
		}
	
	XMLHttpRequest.prototype.send = function(a,b) {
		if (!a) var a='';
		if (!b) var b='';
		s_ajaxListener.tempSend.apply(this, arguments);
		if(s_ajaxListener.method.toLowerCase() == 'post'){			
			s_ajaxListener.data = a;
			}
		s_ajaxListener.callback();
		}
	}

var meny;
function initMeny() {
	//console.log('Iniciando Meny');
	meny = Meny.create({
	// The element that will be animated in from off screen
	menuElement: document.querySelector('.meny'),
	
	// The contents that gets pushed aside while Meny is active
	contentsElement: document.querySelector('.contents'),
	
	// The alignment of the menu (top/right/bottom/left)
	position: 'left',
	
	// The height of the menu (when using top/bottom position)
	height: 200,
	
	// The width of the menu (when using left/right position)
	width: 260,
	
	// The angle at which the contents will rotate to.
	angle: 30,
	
	// The mouse distance from menu position which can trigger menu to open.
	threshold: 40,
	
	// Width(in px) of the thin line you see on screen when menu is in closed position.
	overlap: 6,
	
	// The total time taken by menu animation.
	transitionDuration: '0.5s',
	
	// Transition style for menu animations
	transitionEasing: 'ease',
	
	// Gradient overlay for the contents
	gradient: 'rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.65) 100%)',
	
	// Use mouse movement to automatically open/close
	mouse: true,
	
	// Use touch swipe events to open/close
	touch: false
	});
	}

function sendData(data) {
	var XHR = new XMLHttpRequest();

	// We bind the FormData object and the form element
	var FD  = new FormData(form);
	
	if (data){
		for (name in data){
			FD.append(name,data[name]);
			}
		}
	// We define what will happen if the data are successfully sent
	XHR.addEventListener("load", function(event) {
		var html=event.target.responseText;
		$('div.campos_responsables').html(html);
		if (document.getElementById('fileSelect3')){
			pruebaClickEvent ("fileSelect3","input_alta_comite_prota_acta");
			$('#div_form_alta_boton_registro').hide();
			}
		if (document.getElementById('input_alta_comite_prota_referente')){
			$('#div_botones_ingreso').show();
			}
		$('div.progress_bar').fadeOut(1000,function (){			
			$('div.container').fadeIn(1000);
			$('div.progress_bar').empty();
			});
		
	});

	// We define what will happen in case of error
	XHR.addEventListener("error", function(event) {
		alert('El archivo no se cargó correctamente, por favor intentalo de nuevo');
	});

	// We setup our request
	XHR.open("POST", "/cgi-bin/admin_upload_acta.pm");

	// The data sent are the one the user provide in the form
	XHR.send(FD);
}

function sendFileDataOLD(formulario,data,url) {
	var XHR = new XMLHttpRequest();
	document.getElementById("subir_archivo_aceptar").style.display="block";
	document.getElementById("subir_archivo_volver").style.display="none";
	document.getElementById("subir_archivo_enviar").style.display="none";

	// We bind the FormData object and the form element
	var FD  = new FormData(formulario);
	
	if (data){
		for (name in data){
			FD.append(name,data[name]);
			}
		}
	
	// We define what will happen if the data are successfully sent
	XHR.addEventListener("load", function(event) {
		var html = event.target.responseText;
		$('div.upload_response').html(html);
		
		if (document.getElementById('fileSelect3')){
			pruebaClickEvent ("fileSelect3","input_alta_comite_prota_acta");
			}
		document.querySelector('.percent').style.width = '100%';
		document.querySelector('.percent').textContent = '100%';
		//document.querySelector('#progress_bar').className = '';
		});

	// We define what will happen in case of error
	XHR.addEventListener("error", function(event) {
		alert('El archivo no se cargó correctamente, por favor recarga la página e intentalo de nuevo');
		});
	
	// Reset progress_bar
	document.querySelector('.percent').style.width = 0;
	document.querySelector('.percent').textContent = '0%';
	document.querySelector('#progress_bar').className = 'loading';
	
	XHR.upload.onprogress = function (event) {
		if (event.lengthComputable) {
				var percentLoaded = Math.round((event.loaded / event.total) * 100);
				// Increase the progress bar length.
				
				document.querySelector('.percent').style.width = Math.round(percentLoaded)  + '%';
				document.querySelector('.percent').textContent = Math.round(percentLoaded) + '%';
				
				}
		};
	
	// We setup our request
	XHR.open("POST", url);

	// The data sent are the one the user provide in the form
	XHR.send(FD);
}

function pruebaClickEvent (ligaId,inputId){
	//console.log(ligaId);
	var ligaSelect = document.getElementById(ligaId),
	inputElem = document.getElementById(inputId);

	ligaSelect.addEventListener("click", function (e) {
		if (inputElem) {
			inputElem.click();
			}
		e.preventDefault(); // prevent navigation to "#"
		}, false);
	
//	inputElem.addEventListener("change", handleFiles(inputElem.files), false);
	
	}

function handleFileNames(files) {
	$('span.file_names').empty();
	document.getElementById('boton_enviar_archivos').disabled=true;
	
	if (!files.length){
		return
		}
	
	for (var i = 0; i < files.length; i++){
		var file = files[i];
		var nombreRaw = file.name;
		var nombre;
		
		if (nombreRaw.length > 43){
			nombre = nombreRaw.substr(0,20)+' ... '+nombreRaw.substr(nombreRaw.length-20,20);
			}
		else{
			nombre = nombreRaw;
			}
		$('span.file_names').append("<p>"+nombre+"</p>");
		}
	if ($('div.contenedor_archivos').css('display')=='none'){
		$('div.contenedor_formulario').slideUp();
		$('div.contenedor_archivos').slideDown();
		}
	document.getElementById('boton_enviar_archivos').disabled=false;
	}

function handleFiles(files,sinCaratula){
	//console.log('Entra a nombres, archivos: '+ files.length)
	
	document.getElementById('div_form_alta_boton_acta').disabled=true;
	$('span.file_names').empty();
	var divCaja = $('<div></div>').attr({
		"id":"caja_alta_comite_prota_caratula",
		"name":"caja_alta_comite_prota_caratula",
		"class":"alta_comite_prota",
		"style":"clear:both;"
		});
	var divCombo = $('<div></div>').attr({
		"id":"input_alta_comite_prota_combo_caratula",
		"name":"input_alta_comite_prota_combo_caratula",
		"class":"alta_comite_prota",
		});
	var divError = $('<div style="display:none"></div>').attr({
		"id":"error_input_alta_comite_prota_caratula",
		"class":"alta_comite_prota",
		});
	var spanErrorJS = $('<span></span>').attr({
		"id":"errorjs_input_alta_comite_prota_caratula",
		"class":"alta_comite_prota",
		});
	$('<input type="hidden">').attr({
		"name":"warn_caratula",
		"id":"warn_caratula",
		"value":"sinDato"
		}).appendTo(spanErrorJS);
	$('<label style="float:left;margin-left:10px">Archivos: '+files.length+'</label>').attr({
		"id":"label_alta_comite_prota_caratula",
		"name":"label_alta_comite_prota_caratula",
		"for":"input_alta_comite_prota_caratula",
		}).appendTo(divCombo);

	for (var i = 0; i < files.length; i++){
		var file = files[i];
		var nombreRaw = file.name;
		var nombre;
		
		if (nombreRaw.length > 43){
			nombre = nombreRaw.substr(0,20)+' ... '+nombreRaw.substr(nombreRaw.length-20,20);
			}
		else{
			nombre = nombreRaw;
			}

		var labelRadio =$('<label style="display:inline-block;float:left;margin-left:20px;clear:both;line-height:16px"></label>').attr("title",nombreRaw);
		
		var spanNombre =$('<span style="font-size:12px"></span>').attr({
			"id":"span_alta_comite_prota_caratula",
			"name":"span_alta_comite_prota_caratula",
			"class":"span_alta_comite_prota_caratula",
			});
		$('<p style="line-height:normal;display:inline-block;margin:0;">'+nombre+'</p>').appendTo(spanNombre);
		
		var inputValue = nombreRaw;
		
		if (sinCaratula){
			inputValue = '';
			}
		
		$("<input type='radio'/>").attr({
			"id"		: "input_alta_comite_prota_caratula",
			"name"	: "input_alta_comite_prota_caratula",
			"style"	: "display:inline-block;vertical-align:middle;",
			"value"	: inputValue,
			"onChange": "validaCampo(['caratula','input_alta_comite_prota_caratula'],[validaCampo]);validaCamposDiv(['caja_alta_comite_prota_caratula','div_form_alta_boton_acta'],[validaCamposDiv]);"
			}).appendTo(labelRadio).after(spanNombre);
		
		labelRadio.appendTo(divCombo);
		
		}
	
	$(divCombo).appendTo(divCaja).after(divError).after(spanErrorJS);
	
	$('span.file_names').html(divCaja);
	
	if (files.length == 1){
		$('#input_alta_comite_prota_caratula').prop('checked',true);
		$('#warn_caratula').val('validadoOk');
		document.getElementById('div_form_alta_boton_acta').disabled=false;
		}
	else if (files.length > 1) {
		$('span.file_names').prepend($('<h3 id="mensaje_archivos" style="margin-top:0px">Por favor, selecciona el archivo que contiene la primera hoja del acta.</h3>'));
		}
	
	if ($('div.container').css('display')=='none'){
		$('div.contenedor_acta').slideUp();
		}
	else{
		$('div.container').slideUp();
		$('div.progress_bar').show();
		$('#div_form_alta_boton_registro').show();
		}
	
	$('div.contenedor_archivos').slideDown();
	}

function enviaActa(){
	var comiteID;
	var tipoReporte;
	var caratula = $('#input_alta_comite_prota_caratula:checked').val();
	if ($('#input_alta_comite_prota_comite_id')){
		comiteID = $('#input_alta_comite_prota_comite_id').val();
		}
	else{
		comiteID = 0;
		}
	if ($('#input_alta_comite_prota_tipo_reporte')){
		tipoReporte = $('#input_alta_comite_prota_tipo_reporte').val();
		}
	else {
		tipoReporte = '';
		}
	$('div.contenedor_archivos').hide();
	$('div.progress_bar').html('<h2>Procesando tu solicitud</h2><img src="/img/spinner_red.gif" alt="Espera un momento">');
	
	sendData({'input_alta_comite_prota_caratula':caratula,'input_alta_comite_prota_comite_id':comiteID,'input_alta_comite_prota_tipo_reporte':tipoReporte});
	}

function selectAllChecks(checkId,checkGroup){
	//console.log(checkId + checkGroup)
	if ($('#'+checkId).is(':checked')){
		$('.'+checkGroup+":checkbox:not(:checked):not(:disabled)").prop("checked", true);
		}
	else{
		$('.'+checkGroup+":checkbox:checked").prop("checked",false);
		}
	}

function desactivaInputs(checkId,inputId1,inputId2){
	if ($('#'+checkId).is(':checked')){
		var radios1 = document.getElementsByName(inputId1);
		for (var i = 0; i< radios1.length;  i++){
			radios1[i].disabled = true;
			}
		var radios2 = document.getElementsByName(inputId2);
		for (var i = 0; i< radios2.length;  i++){
			radios2[i].disabled = true;
			}
		document.getElementById('warn_comite').value='validadoOk';
		document.getElementById('warn_defensa').value='validadoOk';
		}
	else{
		var radios1 = document.getElementsByName(inputId1);
		for (var i = 0; i< radios1.length;  i++){
			radios1[i].disabled = false;
			$(radios1[i]).prop('checked',false);
			}
		var radios2 = document.getElementsByName(inputId2);
		for (var i = 0; i< radios2.length;  i++){
			radios2[i].disabled = false;
			$(radios2[i]).prop('checked',false);
			}
		document.getElementById('warn_comite').value='sinDato';
		document.getElementById('warn_defensa').value='sinDato';
		}
	}

function buscaPersonas(listaId,texto,listaAlt) {
	
	document.getElementById('input_alta_comite_prota_cdi_id').value = '';
	if (texto.length < 3){
		return
		}
	var dataList = document.getElementById(listaId);
	var len = dataList.options.length;
	
	
	for(var i=0;i<len;i++){
		var opcion = dataList.options[i].value
		var consejeroId = dataList.options[i].getAttributeNode("label").value.substr(4);
		//console.log('ID: '+consejeroId)
		if (opcion == texto.toUpperCase()){
			if (consejeroId != 'SIN RESULTADOS'){
				document.getElementById('input_alta_comite_prota_cdi_id').value = consejeroId;
				}
			return;
			}
		}
	buscaConsejeroDistrital(['barra_acciones_var','args__'+listaId,'args__'+texto],[listaId,listaAlt],'POST');
	}

function buscaConsejero (listaId,texto) {
	if (texto.length < 3){
		return
		}
	buscaConsejeroDistrital(['barra_acciones_var','args__'+listaId,'args__'+texto],[pintaListaAutocomp],'POST');
	}

function pintaListaAutocomp(listaId,html) {
	//console.log('Entra a pintaLista. Lista: '+listaId);
	var dataList = $('#'+listaId);
	dataList.empty();
	
	if (html.length){
		dataList.append(html);
		$(dataList).show();
		}
	}

function pintaComboEntMunCol(entidad,municipio,colonia,nombreForma) {
	
	//console.log('ENTRA A pintaCombo, nombreForma: '+nombreForma)
	
	$('#input_'+nombreForma+'_combo_entidad').html(entidad);
	$('#input_'+nombreForma+'_combo_municipio').html(municipio);
	$('#input_'+nombreForma+'_combo_colonia').html(colonia);
	
	validaCampo(['entidad','input_'+nombreForma+'_entidad']);
	validaCampo(['municipio','input_'+nombreForma+'_municipio']);
	validaCampo(['colonia','input_'+nombreForma+'_colonia']);
	
	validaCampo(['seccion','input_'+nombreForma+'_seccion']);
	
	}

function agregaSeccionCoordTerrit(secc) {
	
	$('#mensaje_input_alta_comite_prota_seccion2').empty();
	if (!secc){
		return
		}
	
	var validacion = $('#cat_secciones').find('option[value="'+parseInt(secc,10)+'"]').val();
	
	//console.log('VALIDACION: '+validacion);
	
	if (!validacion){
		$('#error_input_alta_comite_prota_seccion2').empty().html('<img src=/img/form_error.png style="vertical-align:middle" alt="La sección electoral no existe" title="La sección electoral no existe">');
		$('#mensaje_input_alta_comite_prota_seccion2').text('LA SECCIÓN ELECTORAL NO EXISTE');
		return
		}
	
	var seccion = pad(secc, 4);	
	var prevObj = document.getElementById('seccion-'+seccion);
	if (prevObj){
		$('#seccion-'+seccion).effect("pulsate", {}, 750);
		$('#input_alta_comite_prota_seccion2').val('').focus();
		validaCampo(['seccion2','input_alta_comite_prota_seccion2','opcional']);
		return;
		}
	
	var spanObj = $('<span></span>');
	var boton = $('<input type="button" class="reportes_boton table-button-icon discreto_rojo centrado">');
	var liObj = $('<li></li>');
	var ulObj = $('#secciones');

	$(boton).val(String.fromCharCode(215))
		.css({'display':'inline-block','vertical-align':'middle'})
		.on('click',function () {
			$('#seccion-'+seccion).fadeOut('slow',function () {$(this).remove()});
			}
		);
	
	$(spanObj)
		.text(seccion)
		.css({'display':'inline-block','vertical-align':'middle','margin-top':'10px'})
		.appendTo(liObj)
		.after(boton);
	
	$(liObj)
		.attr('id','seccion-'+seccion)
		.addClass('seccion')
		.css({
			'display':'inline-block',
			'vertical-align':'middle',
			'padding':'3px',
			'margin':'5px',
			'width':'40px',
			'height':'40px',
			'font-size':'17px',
//			'border-radius':'28px',
			})
		.hide()
		.appendTo(ulObj)
		.fadeIn('slow');

	$('#input_alta_comite_prota_seccion2').val('').focus();
	validaCampo(['seccion2','input_alta_comite_prota_seccion2','opcional']);
	}

function asignaResponsableTerritorial(llamada) {
	
	var secciones = new Array();
	$('#secciones li').each(function (){
		secciones.push($(this).text())
		});
	
	var seccStr = secciones.join();
	var scriptCall = llamada + 1;
	formAsignaResponsableTerritorial(['args__'+scriptCall,'form_alta_comite_prota_coordinador_id','args__','args__','args__'+seccStr],[muestraDiv],'POST');
	
	}

function setUsuarioZonaValues(uztId) {
	var zonaArr = [];
	
	$('#input_admin_alta_usuario_uzt_id').val(uztId);
	
	switch(uztId) {
		case 1:
			break;
		case 2:
			$('#input_admin_alta_usuario_circunscripcion').val($('#input_alta_comite_prota_circunscripcion').val());
			break;
		case 3:
			$('#input_admin_alta_usuario_entidad_arr').val($('#input_alta_comite_prota_entidad_o').val());
			break;
		case 4:
			$('#input_admin_alta_usuario_entidad_arr').val($('#input_alta_comite_prota_entidad_o').val());
			$.each($("input[id=input_alta_comite_prota_distrito_check]:checked"),function () {
				zonaArr.push($(this).val());
				});
			$('#input_admin_alta_usuario_zona_arr').val(zonaArr.join(','));
			break;
		case 5:
			$('#input_admin_alta_usuario_entidad_arr').val($('#input_alta_comite_prota_entidad_o').val());
			$.each($("input[id=input_alta_comite_prota_municipio_check]:checked"),function () {
				zonaArr.push($(this).val());
				});
			$('#input_admin_alta_usuario_zona_arr').val(zonaArr.join(','));
			break;
		case 6:
			$('#input_admin_alta_usuario_entidad_arr').val($('#input_alta_comite_prota_entidad_o').val());
			$.each($("input[id=input_alta_comite_prota_distrito_local_check]:checked"),function () {
				zonaArr.push($(this).val());
				});
			$('#input_admin_alta_usuario_zona_arr').val(zonaArr.join(','));
			break;
		case 7:
			$('#input_admin_alta_usuario_entidad_arr').val($('#input_alta_comite_prota_entidad_o').val());
			$.each($("input[id=input_alta_comite_prota_seccion_check]:checked"),function () {
				zonaArr.push($(this).val());
				});
			$('#input_admin_alta_usuario_zona_arr').val(zonaArr.join(','));
			break;
		}
	}

var downloadImages = true;
function downloadProfilePhotos(download) {
	
	var divs = $('.integrante_comite_foto');
	
	divs.each(function (index) {
		var divId = this.id;
		var docId = divId.replace('integrante_comite_foto_',"");
		if (downloadImages){
			waitSpinner(divId,' ');
			muestraFotoIntegranteComite(['barra_acciones_var','args__'+docId],[''+divId],'POST');
			}
		});
	
	}

// ----------------- Scripts de reportes.js ----------------- //

function ordena(){
	$("#tabla_reporte_afiliaciones").tablesorter({ 
			// sort on the first column and third column, order asc 
			sortList: [[0,0],[2,0]] 
		}); 
	//console.log('jala jquery')
	}



// ----------------- Scripts de funcs.js -------------------- //

function generaCSVAnterior(texto,nombreArchivo){
	
//	//console.log(texto)
	
//	var lines = texto.split('\n');
//	var texto_csv = '';
//	for(var i = 0;i < lines.length;i++){
//		texto_csv = texto_csv+lines[i]+'\\n';
//		}
//	//console.log(texto)
	var uri = 'data:text/csv;charset=utf-8,'+escape(texto);
	var link = document.createElement('a');
	link.href = uri;
	link.target ='_blank';
	link.download=nombreArchivo+'.csv';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	}

function generaCSV(texto,nombreArchivo,stopSpinner){
	var link = document.createElement('a');
	link.href = window.URL.createObjectURL(new Blob([texto], {type: 'text/csv'}));
	link.target ='_blank';
	link.download=nombreArchivo+'.csv';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	
	if (stopSpinner != 1){
		$('#'+stopSpinner).hide().empty();
		}
	}

function downloadFile(log,archivo,fileType,nombreArchivo,ext,cerrar){
	var uri;

	if (!fileType){
		//console.log('ERROR: '+archivo);
		$('#error_mensaje').html('<p>'+archivo+'</p>');
		$('#div_botones,#div_spinner').toggle();
		return;
		}
   
	var extension;
	if (fileType=='texto'){
		var blob = base64toBlob(archivo,'text/csv');
		uri = URL.createObjectURL(blob);
//		uri = 'data:text/csv;charset=base64,'+escape(archivo);
		extension = '.csv';
		//console.log('Viene texto')
		}
	else if (fileType=='pdf'){
		var blob = base64toBlob(archivo,'application/pdf');
		uri = URL.createObjectURL(blob);
//		uri='data:application/pdf;base64,' + escape(archivo);
		extension = '.pdf';
		//console.log('Viene pdf')
		}
	else if (fileType=='imagen') {
		var mimType = ext;
		if (mimType == 'jpg'){
			mimType = 'jpeg';
			}
		uri='data:image/'+mimType+';base64,' + escape(archivo);
		extension = '.'+ext;
		//console.log('Viene imagen')
		}
	else if (fileType=='excel'){
		var blob = base64toBlob(archivo,'application/vnd.ms-excel');
		uri = URL.createObjectURL(blob);
//		uri='data:application/vnd.ms-excel;base64,' + escape(archivo);
		extension = '.xls';
		//console.log('Viene excel')
		}
	else if (fileType=='excel2007'){
		var blob = base64toBlob(archivo,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		uri = URL.createObjectURL(blob);
		extension = '.xlsx';
		//console.log('Viene excel2007')
		}
	

	var link = document.createElement('a');
	link.href = uri;
	link.target ='_blank';
	link.download=nombreArchivo+extension;
	document.body.appendChild(link);
	link.click();
	//console.log('SE HIZO CLICK DEBERÍA EMPEZAR LA DESCARGA');
	document.body.removeChild(link);
	
	if (cerrar){	
		muestraDiv(0,'principal_error');
		}
	
}

function showFile(archivo,fileType,ext) {
	var uri;
   
	if (!fileType){
		//console.log('ERROR: '+archivo);
		document.getElementById('error_mensaje').innerHTML='<p>'+archivo+'</p>';
		return;
		}
	var extension;
	var embed;
	var divContenedor;
	
	if (fileType=='descarga'){
		$('#div_cuerpo').html(archivo);
		return;
		}
	if (fileType=='pdf'){
		var blob = base64toBlob(archivo,'application/pdf');
		uri = URL.createObjectURL(blob);
		extension = '.pdf';
		embed = document.createElement('embed');
		embed.width='450';
		embed.height='450';
		//console.log('Viene pdf')
		$('#div_cuerpo').empty();
		}
	else if (fileType=='imagen') {
		var mimType = ext;
		if (mimType == 'jpg'){
			mimType = 'jpeg';
			}
		uri='data:image/'+mimType+';base64,' + escape(archivo);
		extension = '.'+ext;
		var btn = document.createElement('input');
		btn.type='button';
		btn.className = 'reportes_boton tool_btn';
		var hexString = "f32b";
		var n = parseInt(hexString, 16);
		//console.log("INT: "+n)
		btn.value = String.fromCharCode(n);
		btn.onclick = function () {
			
			if (divContenedor.classList.contains('rotate-90')){
				$(divContenedor).toggleClass('rotate-90 rotate-180');
				}
			else if (divContenedor.classList.contains('rotate-180')) {
				$(divContenedor).toggleClass('rotate-180 rotate-270');
				}
			else if (divContenedor.classList.contains('rotate-270')) {
				$(divContenedor).toggleClass('rotate-270');
				}
			else {
				$(divContenedor).toggleClass('rotate-90');
				}
			
			}
		divContenedor = document.createElement('div');
		divContenedor.id='acta-img';
		embed = document.createElement('img');
		embed.className='zoom-in';
		embed.onclick = function () {$(this).toggleClass('zoom-in zoom-out zoomed')};
		$('#div_cuerpo').empty();
		$('#div_cuerpo').append(btn);
		$('#div_cuerpo').append("<br><br>");
		//console.log('Viene imagen')
		}
	
	embed.src = uri;
	if (fileType=='imagen'){
		$(divContenedor)
			.css({'display':'inline-block','vertical-align': 'middle','margin':'auto','border':'1px solid silver','padding':'10px','width':'500px','height':'500px','overflow':'auto'})
			.addClass('image-wrapper')
			.append(embed);
		$('#div_cuerpo').append(divContenedor);
		}
	else{
		$('#div_cuerpo').append(embed);
		}
	
	}

function base64toBlob(base64Data, contentType) {
// Hay que investigar bien que hace esta cosa, pero sirve
// Básicamente esta función transforma una cadena de texto en base64 a un objeto de contenido binario que javascript puede manejar
// Ya creado el objeto se puede convertir en URL para descargarlo (ver funcion downloadFile)
// Una vez que lo entendamos bien debemos incorporarlo a todos los tipos de archivo que necesitemos descargar 
	contentType = contentType || '';
	var sliceSize = 1024;
	var byteCharacters = atob(base64Data);
	var bytesLength = byteCharacters.length;
	var slicesCount = Math.ceil(bytesLength / sliceSize);
	var byteArrays = new Array(slicesCount);

	for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		var begin = sliceIndex * sliceSize;
		var end = Math.min(begin + sliceSize, bytesLength);

		var bytes = new Array(end - begin);
		for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
				bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, { type: contentType });
	}

// ------------ Scripts de comites_cargo.js -------------- //

function tomaCargos(){ //Esta funcion toma los valores seleccionados en todos los combo_secretaria y los devuelve en un arreglo
	var elements = document.getElementsByTagName('select');
	var valoresSeleccionados = new Array(); 
	var patron=new RegExp("combo_secretaria_");

	for (var i=0;i<elements.length;i++){
		var id=elements[i].getAttribute('id');
		if (patron.test(id)==true){
			var valor = document.getElementById(id).value;
			valoresSeleccionados.push(valor)
			}
		}
	return(valoresSeleccionados.toString())
	}
	
function swich_tex_input(ocultar,mostrar,boton){
	document.getElementById(ocultar).style.display = "none";
 	document.getElementById(mostrar).style.display = "block";
   document.getElementById(boton).style.display = "block";
   }
  
  function spinnerAppradio(elementoId){
   document.getElementById(elementoId).innerHTML='<img src="/img/spinner_red.gif" width="25" height="25" alt="Espera un momento">';
	}
	
function treechecks (divm, checkId, checkGroup) {
	if ($('#'+checkId).is(':checked')){
		$('.'+checkGroup+":checkbox:not(:checked):not(:disabled)").prop("checked", true);
		document.getElementById(divm).style.display = "block";
		}
	else{
		$('.'+checkGroup+":checkbox:checked").prop("checked",false);
		document.getElementById(divm).style.display = "none";
		}
	}

function sendFileData(formulario,data,url) {
	var XHR = new XMLHttpRequest();
	document.getElementById("upload_response").innerHTML = "<img src='/img/spinner_red.gif' alt='Espera un momento'>";
	document.getElementById("subir_archivo_aceptar").style.display="inline-block";
	document.getElementById("subir_archivo_volver").style.display="none";
	document.getElementById("subir_archivo_enviar").style.display="none";
	document.getElementById("subir_archivos").style.display="none";
	document.getElementById("progress_bar").style.display="none";
	
	// We need to access the form element
	var form = document.getElementById(formulario);

	// to takeover its submit event.
	if (form){
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			});
		}
	
	// We bind the FormData object and the form element
	var FD  = new FormData(form);
	
	if (data){
		for (name in data){
			FD.append(name,data[name]);
			}
		}
	
	// We define what will happen if the data are successfully sent
	XHR.addEventListener("load", function(event) {
		var html = event.target.responseText;
		$('div.upload_response').html(html);
		});
		
/*		if (document.getElementById('CAPTURA_formulario_dir')){
			pruebaClickEvent ("CAPTURA_formulario_dir","button_arma_gafete_volver");
			}*/
		document.querySelector('.percent').style.width = '100%';
		document.querySelector('.percent').textContent = '100%';
		//document.querySelector('#progress_bar').className = '';

	// We define what will happen in case of error
	XHR.addEventListener("error", function(event) {
		//console.log(event.target.responseText);
		alert('El archivo no se cargó correctamente, por favor recarga la página e intentalo de nuevo: '+event.target.responseText);
		});
	
	// Reset progress_bar
	document.querySelector('.percent').style.width = 0;
	document.querySelector('.percent').textContent = '0%';
	document.querySelector('#progress_bar').className = 'loading';
	
	XHR.upload.onprogress = function (event) {
		if (event.lengthComputable) {
				var percentLoaded = Math.round((event.loaded / event.total) * 100);
				// Increase the progress bar length.
				
				document.querySelector('.percent').style.width = Math.round(percentLoaded)  + '%';
				document.querySelector('.percent').textContent = Math.round(percentLoaded) + '%';
				
				}
		};
	
	// We setup our request
	XHR.open("POST",url);

	// The data sent are the one the user provide in the form
	//console.log("VALOR DE FD");
	//console.log(FD);
	XHR.send(FD);
}


function sendFileDataBaja(formulario,data,url) {
	var XHR = new XMLHttpRequest();
	document.getElementById("upload_response").innerHTML = "<img src='/img/spinner_red.gif' alt='Espera un momento'>";
	document.getElementById("subir_archivos").style.display="none";
	document.getElementById("progress_bar").style.display="none";
	
	// We need to access the form element
	var form = document.getElementById(formulario);

	// to takeover its submit event.
	if (form){
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			});
		}
	
	// We bind the FormData object and the form element
	var FD  = new FormData(form);
	
	if (data){
		for (name in data){
			FD.append(name,data[name]);
			}
		}
	
	// We define what will happen if the data are successfully sent
	XHR.addEventListener("load", function(event) {
		var html = event.target.responseText;
		$('div.upload_response').html(html);
		});
		
/*		if (document.getElementById('CAPTURA_formulario_dir')){
			pruebaClickEvent ("CAPTURA_formulario_dir","button_arma_gafete_volver");
			}*/
		document.querySelector('.percent').style.width = '100%';
		document.querySelector('.percent').textContent = '100%';
		//document.querySelector('#progress_bar').className = '';

	// We define what will happen in case of error
	XHR.addEventListener("error", function(event) {
		//console.log(event.target.responseText);
		alert('El archivo no se cargó correctamente, por favor recarga la página e intentalo de nuevo: '+event.target.responseText);
		});
	
	// Reset progress_bar
	document.querySelector('.percent').style.width = 0;
	document.querySelector('.percent').textContent = '0%';
	document.querySelector('#progress_bar').className = 'loading';
	
	XHR.upload.onprogress = function (event) {
		if (event.lengthComputable) {
				var percentLoaded = Math.round((event.loaded / event.total) * 100);
				// Increase the progress bar length.
				
				document.querySelector('.percent').style.width = Math.round(percentLoaded)  + '%';
				document.querySelector('.percent').textContent = Math.round(percentLoaded) + '%';
				
				}
		};
	
	// We setup our request
	XHR.open("POST",url);

	// The data sent are the one the user provide in the form
	//console.log("VALOR DE FD");
	//console.log(FD);
	XHR.send(FD);
}

function spinnerApp(elementoId){
    //document.getElementById(elementoId).innerHTML='<img src="/img/spinner_circle.gif" width="45px" alt="Espera un momento"><br><strong style="font-size:14px">CARGANDO<br>espera un momento...</strong>';
    document.getElementById(elementoId).innerHTML='<h3>Procesando tu solicitud</h3><img src="/img/spinner_red.gif" alt="Espera un momento">';
	}

function cambiaDivReporte(opcion,divTabla,divDocumento){
	if (opcion === 1){
		document.getElementById(divTabla).style.display="none";
		document.getElementById(divDocumento).style.display="block";
		}
	if (opcion === 2){
		document.getElementById(divTabla).style.display="block";
		document.getElementById(divDocumento).style.display="none";
		}
	}	

function program() {
	var x = document.getElementById("demo");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function presentacion() {
	var x = document.getElementById("presentacion");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function estudiantes() {
	var x = document.getElementById("estudiantes");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function sedes() {
	var x = document.getElementById("sedes");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function convocatorias() {
	var x = document.getElementById("convocatorias");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}


function program() {
	
	var x = document.getElementById("demo");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function presentacion() {
	
	var x = document.getElementById("presentacion");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function estudiantes() {
	
	var x = document.getElementById("estudiantes");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function sedes() {
	
	var x = document.getElementById("sedes");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function convocatorias() {
	
	var x = document.getElementById("convocatorias");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}


function closdown(){
	drop = document.getElementsByClassName('w3-dropdown-content');
	for (let index = 0; index < drop.length; index++) {
		if (drop[index].className.indexOf("w3-show") == -1) {
			
		} else { 
			drop[index].className = drop[index].className.replace(" w3-show", "");
		}
	}
}


window.onload = function() {
	
	var anchors = document.getElementsByClassName('w3-bar-item');
	//console.log(anchors.length);
	for(var i = 0; i < anchors.length; i++) {
		//console.log(i);
		var anchor = anchors[i];
		anchor.onclick = function() {
			closdown()
		}
	}
}


function estudiantes() {
	var x = document.getElementById("estudiantes");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function sedes() {
	var x = document.getElementById("sedes");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function convocatorias() {
	var x = document.getElementById("convocatorias");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}


function program() {
	
	var x = document.getElementById("demo");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function presentacion() {
	
	var x = document.getElementById("presentacion");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function estudiantes() {
	
	var x = document.getElementById("estudiantes");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function sedes() {
	
	var x = document.getElementById("sedes");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function convocatorias() {
	
	var x = document.getElementById("convocatorias");
	if (x.className.indexOf("w3-show") == -1) {
		closdown();
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}


function closdown(){
	drop = document.getElementsByClassName('w3-dropdown-content');
	for (let index = 0; index < drop.length; index++) {
		if (drop[index].className.indexOf("w3-show") == -1) {
			
		} else { 
			drop[index].className = drop[index].className.replace(" w3-show", "");
		}
	}
}


window.onload = function() {
	
	var anchors = document.getElementsByClassName('w3-bar-item');
	//console.log(anchors.length);
	for(var i = 0; i < anchors.length; i++) {
		//console.log(i);
		var anchor = anchors[i];
		anchor.onclick = function() {
			closdown()
		}
	}
}

$(document).on("click",".w3-button.btn-open", function(event){
	$(".w3-dropdown-click").addClass("w3-hide");
	$(this).parent().removeClass("w3-hide");
	var block = $(this).parent().find(".w3-dropdown-content.w3-bar-block.w3-card");
	if (!block.hasClass("w3-show")) {
		block.addClass("w3-show");
	} else { 
		
	}


});

$(document).on("click",'.backitem', function(event){
	$(".w3-dropdown-click").removeClass("w3-hide");
});
$(document).on("click",'.w3-bar-item.w3-button', function(event){
	$(".w3-dropdown-click").removeClass("w3-hide");
	$("navDemo").removeClass('w3-show');
});


$(document).on("click",'.w3-bar-item.w3-button.w3-hover-black.w3-hide-medium.w3-hide-large.w3-right',function(){
	//console.log("entra");
	$(".w3-dropdown-click").removeClass("w3-hide");
	var x = document.getElementById( "navDemo" );
	if ( x.className.indexOf( "w3-show" ) == -1 ) {
		x.className += " w3-show";
	}
	else {
		x.className = x.className.replace( " w3-show", "" );
	}
});
