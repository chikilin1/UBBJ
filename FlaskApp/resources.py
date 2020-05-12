import re
from flask_restful import Resource, reqparse
from flask import request, url_for
from models import *
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from sqlalchemy.sql import func
from flaskApp import app
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer

# ---------------- ARGUMENTOS PARA EL REGISTRO DE USUARIOS ------------------------ #
parser = reqparse.RequestParser()
parser.add_argument('id_rol', help = 'Este campo no puede estar vacío', required = True)
parser.add_argument('id_status', help = 'Este campo no puede estar vacío', required = True)
parser.add_argument('curp', help = 'Este campo no puede estar vacío', required = True)
parser.add_argument('nombre', help = 'Este campo no puede estar vacío', required = True)
parser.add_argument('apaterno', help = 'Este campo no puede estar vacío', required = False)
parser.add_argument('amaterno', help = 'Este campo no puede estar vacío', required = False)
parser.add_argument('email', help = 'Este campo no puede estar vacío', required = True)
parser.add_argument('password', help = 'Este campo no puede estar vacío', required = True)
parser.add_argument('numTel', required = False)
parser.add_argument('b_estado', help = 'Este campo no puede estar vacío', required = True)


s = URLSafeTimedSerializer('secretSerializer')
mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": "ubbj.test@gmail.com",
    "MAIL_PASSWORD": "passwordubbj"
}

# --------------------------------------------------------- #
# --------- RECURSO: REGISTRO DE USUARIOS ----------------- #
# --------------------------------------------------------- #
class UserRegistration(Resource):
    def post(self):
        regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
        regex_curp = '^([A-Z&]|[a-z&]{1})([AEIOU]|[aeiou]{1})([A-Z&]|[a-z&]{1})([A-Z&]|[a-z&]{1})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([HM]|[hm]{1})([AS|as|BC|bc|BS|bs|CC|cc|CS|cs|CH|ch|CL|cl|CM|cm|DF|df|DG|dg|GT|gt|GR|gr|HG|hg|JC|jc|MC|mc|MN|mn|MS|ms|NT|nt|NL|nl|OC|oc|PL|pl|QT|qt|QR|qr|SP|sp|SL|sl|SR|sr|TC|tc|TS|ts|TL|tl|VZ|vz|YN|yn|ZS|zs|NE|ne]{2})([^A|a|E|e|I|i|O|o|U|u]{1})([^A|a|E|e|I|i|O|o|U|u]{1})([^A|a|E|e|I|i|O|o|U|u]{1})([0-9]{2})$'
        data = parser.parse_args()
        
        if not (re.search(regex_curp,data['curp'])):
            return {'message': 'Obligatorio. Ingrese un formato de curp correcto.'}
        
        if not (re.search(regex,data['email'])):
            return {'message': 'Obligatorio. Ingrese un formato de correo correcto.'}
        
        if userModel.find_by_curp(data['curp']):
            return {'message': 'Ya existe una cuenta con la curp {}'.format(data['curp'])}
        
        if userModel.find_by_email(data['email']): 
            if userModel.find_by_email(data['email']).id_status==2 or userModel.find_by_email(data['email']).id_status==1:
                return {'message': 'ya existe una cuenta con el correo {}'.format(data['email'])}
           
            #---- Borra el registro si es una cuenta inactiva ---#
            userModel.delete_if_disabled(data['email'])
        
        new_user = userModel(
            id_status = data['id_status'],
            curp = data['curp'],
            nombre = data['nombre'],
            apaterno = data['apaterno'],
            amaterno = data['amaterno'],
            email = data['email'],
            password = userModel.generate_hash(data['password']),
            numTel = data['numTel'],
            fcreacion = func.now(),
            b_estado = 1
            
        )
        
        try:
            #Registro en la tabla ci_usuario
            new_user.save_to_db()
            current_user = userModel.find_by_email(data['email'])
            #Registro en la tabla ci_roles_usuario
            new_userRol = user_rolModel(
                id_rol=data['id_rol'],
                id_usuario = current_user.id_usuario,
                b_logico = 1
            )
            new_userRol.save_to_db()
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            
            new_sede = sedeModel(fecha_creacion = func.now())
            new_sede.save_to_db()
            
            new_convocatoria = convocatoriaModel(
                id_sedes = new_sede.id_sede,
                id_convocatoria_sede = 2,
                folio = 'ASE2010000{}'.format(new_sede.id_sede)
            )
            new_convocatoria.save_to_db()
            folio = new_convocatoria.folio
            
            new_sedes_usuario = sedes_usuarioModel(
                id_sede = new_sede.id_sede,
                id_usuario = current_user.id_usuario,
                cladirgenpro = "palabra",
                b_estado = 1
            )
            new_sedes_usuario.save_to_db()

            #Envío de correo con enlace de activación de cuenta
            app.config.update(mail_settings)
            mail = Mail(app)
            
            token = s.dumps(data['email'], salt='email-confirm')
            link = url_for('confirm_email', token=token, _external=True)
            with app.app_context():
                msg = Message(subject="Confirmación de cuenta",
                            sender=app.config.get("MAIL_USERNAME"),recipients=[data['email']], # replace with your email for testing
                            body = " Estimada/Estimado {}, \n Usted se ha registrado como usuario con el folio {}. Para completar su registro, cuenta con 72hrs, después   de recibir este correo, haga clic en el siguiente enlace para activar su cuenta:\n {} \nGracias, \n \n Universidades para el Bienestar Benito Juárez García".format(data['nombre'],folio,link))
                mail.send(msg)
            
            return {
                'message': 'Se ha enviado un correo de confirmacion de cuenta al correo {}'.format(data['email']),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'folio' : '{}'.format(folio)
                }
        except:
            return {'message': 'Algo salió mal'}, 500 
        

# --------------------------------------------------------- #
# ------------------- RECURSO: LOGIN ---------------------- #
# --------------------------------------------------------- #
class UserLogin(Resource):
    def post(self):
        parserLogin = reqparse.RequestParser()
        parserLogin.add_argument('email', help = 'Campo requerido', required = True)
        parserLogin.add_argument('password', help = 'Campo requerido', required = True)
        data = parserLogin.parse_args()
        current_user = userModel.find_by_email(data['email'])

        if not current_user:
            return {'message': 'No existe un usuario con el correo {}'.format(data['email'])}
        if current_user.id_status!=2:
            return {'message': 'La cuenta de correo {} no se ha activado aún, favor de revisar su correo electrónico.'.format(data['email'])}
        
        
        
        if userModel.verify_hash(data['password'], current_user.password):
            sede = sedes_usuarioModel.find_by_idUsuario(current_user.id_usuario)
            conv = convocatoriaModel.find_by_idSede(sede.id_sede)
            access_token = create_access_token(identity = data['email'])
            refresh_token = create_refresh_token(identity = data['email'])
            #-------------- Campos registro sede ----------------#
            id_status = sedeModel.find_by_id(sede.id_sede).id_status if sedeModel.find_by_id(sede.id_sede) else ''
            
            id_localidad = sedeModel.find_by_id(sede.id_sede).id_localidad if sedeModel.find_by_id(sede.id_sede) else ''
            
            colonia = sedeModel.find_by_id(sede.id_sede).colonia if sedeModel.find_by_id(sede.id_sede) else ''
            
            representacion = resedeModel.findCampo(sede.id_sede, 1).valor if resedeModel.findCampo(sede.id_sede, 1) else ''
            
            superficie_terreno = resedeModel.findCampo(sede.id_sede, 2).valor if resedeModel.findCampo(sede.id_sede, 2) else ''
            
            latitud = resedeModel.findCampo(sede.id_sede, 3).valor if resedeModel.findCampo(sede.id_sede, 3) else ''
            
            longitud = resedeModel.findCampo(sede.id_sede, 4).valor if resedeModel.findCampo(sede.id_sede, 4) else ''
            
            medida_noreste = resedeModel.findCampo(sede.id_sede, 5).valor if resedeModel.findCampo(sede.id_sede, 5) else ''
            
            medida_sureste = resedeModel.findCampo(sede.id_sede, 6).valor if resedeModel.findCampo(sede.id_sede, 6) else ''
            
            medida_suroeste = resedeModel.findCampo(sede.id_sede, 7).valor if resedeModel.findCampo(sede.id_sede, 7) else ''
            
            medida_noroeste = resedeModel.findCampo(sede.id_sede, 8).valor if resedeModel.findCampo(sede.id_sede, 8) else ''
            
            espacio_libre = resedeModel.findCampo(sede.id_sede, 9).valor if resedeModel.findCampo(sede.id_sede, 9) else ''
            
            servicios = resedeModel.findCampo(sede.id_sede, 10).valor if resedeModel.findCampo(sede.id_sede, 10) else ''
            
            imagenTerreno1 = resedeModel.findCampo(sede.id_sede, 11).valor if resedeModel.findCampo(sede.id_sede, 11) else ''
            
            imagenTerreno2 = resedeModel.findCampo(sede.id_sede, 12).valor if resedeModel.findCampo(sede.id_sede, 12) else ''
            
            imagenTerreno3 = resedeModel.findCampo(sede.id_sede, 13).valor if resedeModel.findCampo(sede.id_sede, 13) else ''
            
            usoPrevioTerreno = resedeModel.findCampo(sede.id_sede, 14).valor if resedeModel.findCampo(sede.id_sede, 14) else ''
            
            levantamiento_topografico = resedeModel.findCampo(sede.id_sede, 15).valor if resedeModel.findCampo(sede.id_sede, 15) else ''
            
            acreditacion_propiedad = resedeModel.findCampo(sede.id_sede, 16).valor if resedeModel.findCampo(sede.id_sede, 16) else ''
            
            carta_solicitud = resedeModel.findCampo(sede.id_sede, 17).valor if resedeModel.findCampo(sede.id_sede, 17) else ''
            
            levantamiento_terreno = resedeModel.findCampo(sede.id_sede, 18).valor if resedeModel.findCampo(sede.id_sede, 18) else ''
            
            carta_respaldo = resedeModel.findCampo(sede.id_sede, 19).valor if resedeModel.findCampo(sede.id_sede, 19) else ''
            
            acta_asamblea = resedeModel.findCampo(sede.id_sede, 20).valor if resedeModel.findCampo(sede.id_sede, 20) else ''
            
            identificacion = resedeModel.findCampo(sede.id_sede, 21).valor if resedeModel.findCampo(sede.id_sede, 21) else ''
            
            if current_user.numTel is None: current_user.numTel=''
            if current_user.amaterno is None: current_user.amaterno=''
            
            return {
                'message': 'Inicio sesión como {}'.format(current_user.nombre),
                'access_token': access_token,
                'refresh_token': refresh_token,
                'folio' : '{}'.format(conv.folio),
                'id_usuario': '{}'.format(current_user.id_usuario),
                'CURP' : '{}'.format(current_user.curp),
                'nombre': '{} {} {}'.format(current_user.nombre,current_user.apaterno,current_user.amaterno),
                'email': '{}'.format(current_user.email),
                'telefono': '{}'.format(current_user.numTel),
                'id_status' : id_status,
                'representacion' : representacion,
                'id_localidad' : id_localidad,
                'colonia' : colonia,
                'superficie_terreno' : superficie_terreno,
                'latitud' : latitud,
                'longitud' : longitud,
                'medidas_noreste' : medida_noreste,
                'medidas_sureste' : medida_sureste,
                'medida_suroeste' : medida_suroeste,
                'medida_noroeste' : medida_noroeste,
                'espacio_libre' : espacio_libre,
                'servicios' : servicios,
                'imagenTerreno1' : imagenTerreno1,
                'imagenTerreno2' : imagenTerreno2,
                'imagenTerreno3' : imagenTerreno3,
                'usoPrevio_terreno' : usoPrevioTerreno,
                'levantamiento_topografico' : levantamiento_topografico,
                'acreditacion_propiedad' : acreditacion_propiedad,
                'carta_solicitud' : levantamiento_terreno,
                'levantamiento_terreno' : carta_respaldo,
                'acta_asamblea' :  acta_asamblea,
                'identificacion' : identificacion
                }
        else:
            return {'message': 'Credenciales incorrectas'}
      
# --------------------------------------------------------- #
# ----------- RECURSOS: LOGOUT(ACESS y REFRESH) ----------- #
# --------------------------------------------------------- #      
class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'El token de acceso ha sido anulado'}
        except:
            return {'message': 'Algo salió mal'}, 500   
      
class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti = jti)
            revoked_token.add()
            return {'message': 'El token ha sido anulado'}
        except:
            return {'message': 'Algo salió mal'}, 500
      
# --------------------------------------------------------- #
# ------------- RECURSO: REFRESH TOKEN -------------------- #
# --------------------------------------------------------- #      
class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return {'access_token': access_token}    
      
class AllUsers(Resource):
    def get(self):
        return userModel.return_all()
    
    def delete(self):
        return userModel.delete_all()
           
class SecretResource(Resource):
    @jwt_required
    def get(self):
        return {
            'answer': 42
        }
        
# -----------------------------------**********************--------------------------------------- #
# ----------------------------------- ***RECURSOS SEDES*** --------------------------------------- #
# -----------------------------------**********************--------------------------------------- # 

# ------------------------------------------------------------ #
# ------------- RECURSO: REGISTRO DE SEDE -------------------- #
# ------------------------------------------------------------ # 
class firstStepSedeRegistration(Resource):
    def post(self):
        
        parser = reqparse.RequestParser()
        parser.add_argument('representacion', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('id_usuario', required = True)
        data = parser.parse_args()
        
        new_sede = sedes_usuarioModel.find_by_idUsuario(data['id_usuario'])
        
        new_resede = resedeModel(
            id_reg_sed_columna = 1,
            id_sede = new_sede.id_sede,
            valor = data['representacion'],
            b_estado = 1
        )
        
        current_sede = sedes_usuarioModel.find_by_idUsuario(data['id_usuario'])
        sede = sedeModel.find_by_id(current_sede.id_sede)

        try:
            if sede.id_status == 6:
                return {'message': 'Ya ha concluido el registro de la sede, por favor espere los resultados.'}, 500
            if sede.id_status == 4 or sede.id_status == 5:
                return {'message': 'Ya ha registrado datos de contacto.'}, 500
            sedeModel.fupdate_sede(current_sede.id_sede)
            
            new_resede.save_to_db()
            return {
                'message': 'Se han guardado los datos con representación: {}'.format(data['representacion'])
                }
        except:
            return {'message': 'Algo salió mal'}, 500
class secondStepSedeRegistration(Resource):
    def post(self):
        
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario', required = True)
        parser.add_argument('id_localidad', required = True)
        parser.add_argument('colonia', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('calle', required = False)
        parser.add_argument('numero', required = False)
        parser.add_argument('codigo_postal', required = False)
        #---  ---#
        parser.add_argument('superficie_terreno', required = False)
        parser.add_argument('latitud', required = False)
        parser.add_argument('longitud', required = False)
        parser.add_argument('medida_noreste', required = False)
        parser.add_argument('medida_sureste', required = False)
        parser.add_argument('medida_suroeste', required = False)
        parser.add_argument('medida_noroeste', required = False)
        parser.add_argument('espacio_libre', required = False)
        parser.add_argument('servicios', required = False)
        # -------------------- IMAGENES ---------------------- #
        parser.add_argument('imagenTerreno1', required = False)
        parser.add_argument('imagenTerreno2', required = False)
        parser.add_argument('imagenTerreno3', required = False)
        #----------------------------------------------------- #
        parser.add_argument('usoPrevio_terreno', required = False)
        parser.add_argument('levantamiento_topografico', required = False)


        data = parser.parse_args()
        
        current_sede = sedes_usuarioModel.find_by_idUsuario(data['id_usuario'])
        sede = sedeModel.find_by_id(current_sede.id_sede)
        try:
            if sede.id_status == 6:
                return {'message': 'Ya ha concluido el registro de la sede, por favor espere los resultados.'}, 500
            if sede.id_status == 5:
                return {'message': 'Ya ha registrado datos del terrenno.'}, 500
            if sede.id_status != 4:
                return {'message': 'Primero tiene que registrar los datos de contacto para continuar.'}, 500
            sedeModel.supdate_sede(current_sede.id_sede,
                                  data['id_localidad'],
                                  data['colonia'],
                                  data['calle'],
                                  data['numero'],
                                  data['codigo_postal'],
                                  1)
            
            superficie = resedeModel(
            id_reg_sed_columna = 2,
            id_sede = current_sede.id_sede,
            valor = data['superficie_terreno'],
            b_estado = 1
            )
            superficie.save_to_db()
            latitud = resedeModel(
                id_reg_sed_columna = 3,
                id_sede = current_sede.id_sede,
                valor = data['latitud'],
                b_estado = 1
            )
            latitud.save_to_db()
            longitud = resedeModel(
                id_reg_sed_columna = 4,
                id_sede = current_sede.id_sede,
                valor = data['longitud'],
                b_estado = 1
            )
            longitud.save_to_db()
            medida_noreste = resedeModel(
                id_reg_sed_columna = 5,
                id_sede = current_sede.id_sede,
                valor = data['medida_noreste'],
                b_estado = 1
            )
            medida_noreste.save_to_db()
            medida_sureste = resedeModel(
                id_reg_sed_columna = 6,
                id_sede = current_sede.id_sede,
                valor = data['medida_sureste'],
                b_estado = 1
            )
            medida_sureste.save_to_db()
            medida_suroeste = resedeModel(
                id_reg_sed_columna = 7,
                id_sede = current_sede.id_sede,
                valor = data['medida_suroeste'],
                b_estado = 1
            )
            medida_suroeste.save_to_db()
            medida_noroeste = resedeModel(
                id_reg_sed_columna = 8,
                id_sede = current_sede.id_sede,
                valor = data['medida_noroeste'],
                b_estado = 1
            )
            medida_noroeste.save_to_db()
            espacio_libre = resedeModel(
                id_reg_sed_columna = 9,
                id_sede = current_sede.id_sede,
                valor = data['espacio_libre'],
                b_estado = 1
            )
            espacio_libre.save_to_db()
            servicios = resedeModel(
                id_reg_sed_columna = 10,
                id_sede = current_sede.id_sede,
                valor = data['servicios'],
                b_estado = 1
            )
            servicios.save_to_db()
            
            #----- EN ESTE PUNTO SE DEBERÍAN GUARDAR LAS IMAGENES---#
            imagenTerreno1 = ImagenesModel(
                imagen = data['imagenTerreno1'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['imagenTerreno2']),
                fcreacion = func.now(),
                b_estado = 1
            )
            imagenTerreno1.save_to_db()
            im_imagenTerreno1 = im_ResgistroSedeModel(
                id_imagen = imagenTerreno1.id_imagen,
                id_reg_sed_columna = 11
            )
            im_imagenTerreno1.save_to_db()
            re_imagenTerreno1 = resedeModel(
                id_reg_sed_columna = 11,
                id_sede = current_sede.id_sede,
                valor = data['imagenTerreno1'],
                b_estado = 1
            )
            re_imagenTerreno1.save_to_db() 
                
            if data['imagenTerreno2'] != None:
                imagenTerreno2 = ImagenesModel(
                    imagen = data['imagenTerreno2'],
                    url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['imagenTerreno2']),
                    fcreacion = func.now(),
                    b_estado = 1
                )
                imagenTerreno2.save_to_db()
                im_imagenTerreno2 = im_ResgistroSedeModel(
                    id_imagen = imagenTerreno1.id_imagen,
                    id_reg_sed_columna = 12
                )
                im_imagenTerreno2.save_to_db()
                re_imagenTerreno2 = resedeModel(
                    id_reg_sed_columna = 12,
                    id_sede = current_sede.id_sede,
                    valor = data['imagenTerreno2'],
                    b_estado = 1
                )
                re_imagenTerreno2.save_to_db() 
                  
            if data['imagenTerreno3'] != None:
                imagenTerreno3 = ImagenesModel(
                    imagen = data['imagenTerreno3'],
                    url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['imagenTerreno3']),
                    fcreacion = func.now(),
                    b_estado = 1
                )
                imagenTerreno3.save_to_db()
                im_imagenTerreno3 = im_ResgistroSedeModel(
                    id_imagen = imagenTerreno1.id_imagen,
                    id_reg_sed_columna = 13
                )
                im_imagenTerreno3.save_to_db()
                re_imagenTerreno3 = resedeModel(
                    id_reg_sed_columna = 13,
                    id_sede = current_sede.id_sede,
                    valor = data['imagenTerreno3'],
                    b_estado = 1
                )
                re_imagenTerreno3.save_to_db()       
            #----- EN LA TABLA IMAGENES E IMAGENES_REGISTRO_SEDE ---#
            
            usoPrevio_terreno = resedeModel(
                id_reg_sed_columna = 14,
                id_sede = current_sede.id_sede,
                valor = data['usoPrevio_terreno'],
                b_estado = 1
            )
            usoPrevio_terreno.save_to_db()
            levantamiento_topografico = resedeModel(
                id_reg_sed_columna = 15,
                id_sede = current_sede.id_sede,
                valor = data['levantamiento_topografico'],
                b_estado = 1
            )
            levantamiento_topografico.save_to_db()
            return {
                'message': 'Sede en la colonia {} creada exitosamente'.format(data['colonia'])
                }
        except:
            return {'message': 'Algo salió mal'}, 500
        
class thirdStepSedeRegistration(Resource):
    def post(self):
        
        parser = reqparse.RequestParser()
        parser.add_argument('id_usuario', required = True)
        parser.add_argument('acreditacion_propiedad', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('carta_solicitud', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('levantamiento_terreno', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('carta_respaldo', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('acta_asamblea', help = 'Este campo no puede estar vacío', required = True)
        parser.add_argument('identificacion', help = 'Este campo no puede estar vacío', required = True)
        data = parser.parse_args()
        
        current_sede = sedes_usuarioModel.find_by_idUsuario(data['id_usuario'])
        sede = sedeModel.find_by_id(current_sede.id_sede)
        try:
            
            
            if sede.id_status == 6:
                return {'message': 'Ya ha concluido el registro de la sede, por favor espere los resultados.'}, 500
            if sede.id_status != 5:
                return {'message': 'Primero tiene que registrar los datos de terreno para continuar.'}, 500
            
            sedeModel.tupdate_sede(current_sede.id_sede)
                
            acreditacion = DocumentoSedeModel(
                id_sede = current_sede.id_sede,
                documento = data['acreditacion_propiedad'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['acreditacion_propiedad']),
                b_estado=1
            )
            acreditacion.save_to_db()
            ci_acreditacion = DocRegSedesModel(
                id_reg_sed_columna = 16,
                id_documento = acreditacion.id_documento
            )
            ci_acreditacion.save_to_db()
            re_acreditacion = resedeModel(
                id_reg_sed_columna = 16,
                id_sede = current_sede.id_sede,
                valor = data['acreditacion_propiedad'],
                b_estado = 1
            )
            re_acreditacion.save_to_db()
            
            carta = DocumentoSedeModel(
                id_sede = current_sede.id_sede,
                documento = data['acreditacion_propiedad'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['carta_solicitud']),
                b_estado=1
            )
            carta.save_to_db()
            ci_carta = DocRegSedesModel(
                id_reg_sed_columna = 17,
                id_documento = carta.id_documento
            )
            ci_carta.save_to_db()
            re_carta = resedeModel(
                id_reg_sed_columna = 17,
                id_sede = current_sede.id_sede,
                valor = data['carta_solicitud'],
                b_estado = 1
            )
            re_carta.save_to_db()
            
            levantamiento = DocumentoSedeModel(
                id_sede = current_sede.id_sede,
                documento = data['levantamiento_terreno'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['levantamiento_terreno']),
                b_estado=1
            )
            levantamiento.save_to_db()
            ci_levantamiento = DocRegSedesModel(
                id_reg_sed_columna = 18,
                id_documento = levantamiento.id_documento
            )
            ci_levantamiento.save_to_db()
            re_levantamiento = resedeModel(
                id_reg_sed_columna = 18,
                id_sede = current_sede.id_sede,
                valor = data['levantamiento_terreno'],
                b_estado = 1
            )
            re_levantamiento.save_to_db()
            
            respaldo = DocumentoSedeModel(
                id_sede = current_sede.id_sede,
                documento = data['carta_respaldo'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['carta_respaldo']),
                b_estado=1
            )
            respaldo.save_to_db()
            ci_respaldo = DocRegSedesModel(
                id_reg_sed_columna = 19,
                id_documento = respaldo.id_documento
            )
            ci_respaldo.save_to_db()
            re_respaldo = resedeModel(
                id_reg_sed_columna = 19,
                id_sede = current_sede.id_sede,
                valor = data['carta_respaldo'],
                b_estado = 1
            )
            re_respaldo.save_to_db()
            
            acta = DocumentoSedeModel(
                id_sede = current_sede.id_sede,
                documento = data['acta_asamblea'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['acta_asamblea']),
                b_estado=1
            )
            acta.save_to_db()
            ci_acta = DocRegSedesModel(
                id_reg_sed_columna = 20,
                id_documento = acta.id_documento
            )
            ci_acta.save_to_db()
            re_acta = resedeModel(
                id_reg_sed_columna = 20,
                id_sede = current_sede.id_sede,
                valor = data['acta_asamblea'],
                b_estado = 1
            )
            re_acta.save_to_db()
            
            identificacion = DocumentoSedeModel(
                id_sede = current_sede.id_sede,
                documento = data['identificacion'],
                url = '/var/www/html/FlaskApp/almacenTepito/{}'.format(data['identificacion']),
                b_estado=1
            )
            identificacion.save_to_db()
            ci_identificacion = DocRegSedesModel(
                id_reg_sed_columna = 21,
                id_documento = identificacion.id_documento
            )
            ci_identificacion.save_to_db()
            re_identificacion = resedeModel(
                id_reg_sed_columna = 21,
                id_sede = current_sede.id_sede,
                valor = data['identificacion'],
                b_estado = 1
            )
            re_identificacion.save_to_db()
            
            return {
                'message': 'Documentos cargados correctamente.'
                }
        except:
            return {'message': 'Algo salió mal'}, 500

class AllSedes(Resource):
    def get(self):
        return sedeModel.return_all()
    
# --------------------------------------------------------- #
# --- RECURSOS: Mostrar Estados, Municipios y localidades - #
# --------------------------------------------------------- # 

class MostrarEstados(Resource):
    def post(self):
        return estadoModel.return_all()
    
class MostrarMunicipios(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_estado', required = True)
        data = parser.parse_args()
        return municipioModel.return_all(data['id_estado'])
    
class MostrarLocalidades(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id_municipio', required = True)
        data = parser.parse_args()
        return localidadModel.return_all(data['id_municipio'])
    
class BuscarCP(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('cp', required = True)
        data = parser.parse_args()
        return CodigoPostalModel.buscar_cp(data['cp'])
