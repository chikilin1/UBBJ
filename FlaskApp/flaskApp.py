from flask import Flask, request, redirect, jsonify ### <---- últimos 3 para carga de archivos y usos múltiples
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
from flask_mail import Mail, Message
from flask_cors import CORS
import os ### <---- para carga de archivos
import urllib.request ### <---- para carga de archivos
from werkzeug.utils import secure_filename ### <---- para carga de archivos


app = Flask(__name__)

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": "fiction.rever@gmail.com",
    "MAIL_PASSWORD": ""
}

app.config.update(mail_settings)
mail = Mail(app)

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api=Api(app)

### ---> Carga Múltiple de Archivos <--- By Chris ###
#rutaAlmacenTepito = 'almacenTepito'
rutaAlmacenTepito = '/var/www/html/FlaskApp/almacen/'
rutaAlmacenTepito = '/opt/peuani/persona_documentos/ubbjg'
app.config['CARPETA_SUBIDA'] = rutaAlmacenTepito
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# ------CADENAS DE CONEXIÓN A BASE DE DATOS--------- #
#conn='mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}'.format(username="root", password="", hostname="localhost", databasename="ubbj_2")
conn = 'postgresql+psycopg2://{username}:{password}@{hostname}/{databasename}'.format(username="peuani", password="4f1l1c10n35!", hostname="10.142.0.23:5432", databasename="ubbj_01")

# ------------------CONFIGURACIÓN DE CONEXIÓN A LA BD---------------------- #
app.config['SQLALCHEMY_DATABASE_URI'] = conn
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'some-secret-string'
db = SQLAlchemy(app)

@app.before_first_request
def create_tables():
    db.create_all()

# ----------------- VERIFICACIÓN DE VALIDEZ DE TOKENS ------------------- #    
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return models.RevokedTokenModel.is_jti_blacklisted(jti)
# ----------------- --------------------------------- ------------------ # 

import views, models, resources


@app.route('/')
def index():
	return 'PAGINA INICIO API'

# ------------- Activación de la cuenta por correo ---------------- #
@app.route('/confirm_email/<token>')
def confirm_email(token):
    s = URLSafeTimedSerializer('secretSerializer')   
    try:   
        email = s.loads(token, salt='email-confirm', max_age=259200)
        models.userModel.activate_account(email)
    except SignatureExpired:
        email = s.loads(token, salt='email-confirm')
        models.userModel.desactivate_account(email)
        return '<h1> El token ha expirado, vuelva a registrarse. </h1>'
    return '<h1> Cuenta activada para el correo: {}</h1>'.format(email)  

# ------------- ENDPOINTS DE LA API ---------------- #
api.add_resource(resources.UserRegistration, '/registro')
api.add_resource(resources.firstStepSedeRegistration, '/registro/sedes/1')
api.add_resource(resources.secondStepSedeRegistration, '/registro/sedes/2')
api.add_resource(resources.thirdStepSedeRegistration, '/registro/sedes/3')
api.add_resource(resources.UserLogin, '/login')
api.add_resource(resources.UserLogoutAccess, '/logout/access')
api.add_resource(resources.UserLogoutRefresh, '/logout/refresh')
api.add_resource(resources.TokenRefresh, '/token/refresh')
api.add_resource(resources.AllUsers, '/usuarios')
api.add_resource(resources.AllSedes, '/sedes')
api.add_resource(resources.SecretResource, '/secret')
api.add_resource(resources.MostrarEstados, '/estados')
api.add_resource(resources.MostrarMunicipios, '/municipios')
api.add_resource(resources.MostrarLocalidades, '/localidades')
api.add_resource(resources.BuscarCP, '/cp')

####################################################
### ---> INICIO Carga de Archivos Múltiples <--- ###
####################################################
EXTENSIONES_PERMITIDAS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in EXTENSIONES_PERMITIDAS

@app.route('/cargarArchivos', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    if 'files[]' not in request.files:
        resp = jsonify({'message' : 'No hay Archivos que Cargar en la Solicitud'})
        resp.status_code = 400
        return resp
    
    files = request.files.getlist('files[]')
    
    errors = {}
    success = False
    
    for file in files:		
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['CARPETA_SUBIDA'], filename))
            success = True
        else:
            errors[file.filename] = 'Extesión de Archivos no Permitidos'
    
    if success and errors:
        errors['message'] = 'Archivo(s) Cargados Correctamente'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        resp = jsonify({'message' : 'Archivos Cargados Correctamente'})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
####################################################
### ---> FIN Carga de Archivos Múltiples <--- ###
####################################################

#Initialize app
if __name__ == "__main__":
	app.run(debug = True)
