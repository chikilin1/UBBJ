from flaskApp import db
from passlib.hash import pbkdf2_sha256 as sha256
from sqlalchemy.sql import func

# --------------------------------------------------- #
# --------------- MODELO DE USUARIOS ---------------- #
# --------------------------------------------------- #
class userModel(db.Model):
    __tablename__ = 'ci_usuario'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_usuario = db.Column(db.Integer, primary_key = True)
    id_status = db.Column(db.Integer, nullable = False)
    curp = db.Column(db.String(18),nullable=False)
    nombre = db.Column(db.String(45), nullable = False)
    apaterno = db.Column(db.String(45),nullable=True)
    amaterno = db.Column(db.String(45),nullable=True)
    email = db.Column(db.String(45), unique = True, nullable = False)
    password = db.Column(db.String(250), nullable = True)
    numTel = db.Column(db.String(10), nullable = True)
    fcreacion = db.Column(db.DateTime(timezone=True), server_default=func.now())
    factualiza = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    b_estado = db.Column(db.Boolean, nullable = False)
    
    
    @staticmethod
    def generate_hash(password):
        return sha256.hash(password)    
    
    @staticmethod
    def verify_hash(password, hash):
        return sha256.verify(password, hash)
    
    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email = email).first()
    
    @classmethod
    def find_by_curp(cls, curp):
        return cls.query.filter_by(curp = curp).first()
    
    @classmethod
    def delete_if_disabled(cls, email):
        current_email = cls.find_by_email(email)
        if current_email.id_status == 3:
            db.session.delete(current_email)
            db.session.commit()
    
    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'email': x.email,
                'password': x.password,
                'Nombre' : x.nombre,
                'APaterno' : x.apaterno,
                'AMaterno' : x.amaterno,
                'numTel' : x.numTel,
                'id_status' : x.id_status,
                'b_estado' : x.b_estado,
                'CURP' : x.curp
            }
        return {'users': list(map(lambda x: to_json(x), userModel.query.all()))}

    @classmethod
    def delete_all(cls):
        try:
            num_rows_deleted = db.session.query(cls).delete()
            db.session.commit()
            return {'message': '{} filas eliminadas'.format(num_rows_deleted)}
        except:
            return {'message': 'Algo salio mal'}
    
    @classmethod
    def activate_account(cls,email):
        db.session.query(cls).filter(cls.email == email).\
        update({cls.id_status: 2}, synchronize_session=False)
        db.session.commit()
        
    @classmethod
    def desactivate_account(cls,email):
        db.session.query(cls).filter(cls.email == email).\
        update({cls.id_status: 3}, synchronize_session=False)
        db.session.commit()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        
class user_rolModel(db.Model):
    __tablename__ = 'ci_roles_usuario'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_rol_usuario = db.Column(db.Integer, primary_key = True)
    id_rol = db.Column(db.Integer, nullable = False)
    id_usuario = db.Column(db.Integer, nullable = False)
    b_logico = db.Column(db.Integer,nullable=False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

# ------------------------------------------------------------ #
# ----------------MODELO DE TOKENS ANULADOS ------------------ #
# ------------------------------------------------------------ #
class RevokedTokenModel(db.Model):
    __tablename__ = 'revoked_tokens'
    #__table_args__ = {'schema':'UBBJ_01'}
    
    idToken = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(120))
    
    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def is_jti_blacklisted(cls, jti):
        query = cls.query.filter_by(jti = jti).first()
        return bool(query)
    
# --------------------------------------------------- #
# ------------------ MODELO ESTADOS ----------------- #
# --------------------------------------------------- #

class estadoModel(db.Model):
    __tablename__ = 'ci_estado'
    
    id_estado = db.Column(db.Integer, primary_key = True)
    estado = db.Column(db.String(45), nullable = False)
    b_estado = db.Column(db.Boolean, nullable = False)
    
    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'id_estado': x.id_estado,
                'estado' : x.estado
            }
        return {'Estados': list(map(lambda x: to_json(x), estadoModel.query.all()))}
    
class municipioModel(db.Model):
    __tablename__ = 'ci_municipio'
    id_municipio = db.Column(db.Integer, primary_key = True)
    id_estado = db.Column(db.Integer, nullable = False)
    municipio = db.Column(db.String(250), nullable = True)
    b_estado = db.Column(db.Boolean, nullable = False)
    
    @classmethod
    def return_all(cls,id_estado):
        def to_json(x):
            return {
                'id_municipio' : x.id_municipio,
                'municipio': x.municipio,
                'id_estado' : x.id_estado,
                'estado' : x.estado
            }
        return {'Municipios': list(map(lambda x: to_json(x), db.session.query(municipioModel,municipioModel.id_municipio, municipioModel.municipio,estadoModel.id_estado, estadoModel.estado).\
                                        outerjoin(estadoModel, estadoModel.id_estado==municipioModel.id_estado).\
                                        filter_by(id_estado=id_estado).all()))
                }
    
class localidadModel(db.Model):
    __tablename__ = 'ci_localidad'
    id_localidad = db.Column(db.Integer, primary_key = True)
    id_municipio = db.Column(db.Integer, nullable = False)
    localidad = db.Column(db.String(250), nullable = True)
    b_estado = db.Column(db.Boolean, nullable = False)
    cve_loc = db.Column(db.Integer, nullable = True)
    
    @classmethod
    def return_all(cls,id_municipio):
        def to_json(x):
            return {
                'id_localidad' : x.id_localidad,
                'localidad': x.localidad,
                'id_municipio' : x.id_municipio,
                'municipio' : x.municipio
            }
        return {'Localidades': list(map(lambda x: to_json(x), db.session.query(localidadModel,localidadModel.id_localidad, localidadModel.localidad, municipioModel.id_municipio, municipioModel.municipio).\
                                        outerjoin(municipioModel, municipioModel.id_municipio==localidadModel.id_municipio).\
                                        filter_by(id_municipio=id_municipio).all()))
                }

class CodigoPostalModel(db.Model):
    __tablename__ = 'ci_codigo_postal'
    id_codigo_postal = db.Column(db.Integer, primary_key = True)
    id_localidad = db.Column(db.Integer, nullable = False)
    codigo_postal = db.Column(db.Integer, nullable = True)
    b_estado = db.Column(db.Boolean, nullable = False)
    
    @classmethod
    def buscar_cp(cls,cp):
        def to_json(x):
            return {
                'id_localidad' : x.id_localidad,
                'localidad': x.localidad,
                'codigo_postal' : x.codigo_postal,
                'id_municipio' : x.id_municipio,
                'municipio' : x.municipio,
                'id_estado' : x.id_estado,
                'estado' : x.estado
            }
        return {'Localidades': list(map(lambda x: to_json(x), db.session.query(localidadModel,localidadModel.id_localidad, localidadModel.localidad,CodigoPostalModel.codigo_postal, municipioModel.id_municipio, municipioModel.municipio, estadoModel.id_estado, estadoModel.estado).\
                                        outerjoin(municipioModel, municipioModel.id_municipio==localidadModel.id_municipio).\
                                        outerjoin(estadoModel, estadoModel.id_estado==municipioModel.id_estado).\
                                        outerjoin(CodigoPostalModel, localidadModel.id_localidad==CodigoPostalModel.id_localidad).\
                                        filter_by(codigo_postal=cp).all()))}
 
# --------------------------------------------------- #
# ------------------ MODELOS IMAGENES --------------- #
# --------------------------------------------------- #   
class ImagenesModel(db.Model):
    __tablename__ = 'im_imagenes'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_imagen = db.Column(db.Integer, primary_key = True)
    imagen = db.Column(db.String(45), nullable = True)
    url = db.Column(db.String(255), nullable = False)
    alto = db.Column(db.Integer, nullable = True)
    ancho = db.Column(db.Integer, nullable = True)
    fcreacion = db.Column(db.DateTime(timezone=True), server_default=func.now())
    b_estado = db.Column(db.Boolean, nullable = False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        db.session.refresh(self)
        
class im_ResgistroSedeModel(db.Model):
    __tablename__ = 'im_registro_sede'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_imagen_registro_sede = db.Column(db.Integer, primary_key = True)
    id_imagen = db.Column(db.Integer, nullable = False)
    id_reg_sed_columna = db.Column(db.Integer, nullable = False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

# --------------------------------------------------- #
# ---------------- MODELO DOCUMENTOS ---------------- #
# --------------------------------------------------- #
class DocumentoSedeModel(db.Model):
    __tablename__ = 'dd_documento_sede'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_documento = db.Column(db.Integer, primary_key = True)
    id_sede = db.Column(db.Integer, nullable = False)
    documento = db.Column(db.String(45), nullable = False)
    url = db.Column(db.String(255), nullable = False)
    b_estado = db.Column(db.Boolean, nullable = False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        db.session.refresh(self)
        
class DocRegSedesModel(db.Model):
    __tablename__ = 'ci_doc_reg_sedes'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_doc_reg_sede = db.Column(db.Integer, primary_key = True)
    id_reg_sed_columna = db.Column(db.Integer, nullable = False)
    id_documento = db.Column(db.Integer, nullable = False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

# --------------------------------------------------- #
# ------------------ MODELO SEDES ------------------- #
# --------------------------------------------------- #
class resedeModel(db.Model):
    __tablename__ = 're_sedes'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_reg_extra_sedes = db.Column(db.Integer, primary_key = True)
    id_reg_sed_columna = db.Column(db.Integer, nullable = False)
    id_sede = db.Column(db.Integer, nullable = False)
    valor = db.Column(db.String, nullable = True)
    b_estado = db.Column(db.Boolean, nullable = False)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def findCampo(cls, idSede, idrs):
        return cls.query.filter_by(id_sede = idSede, id_reg_sed_columna = idrs).first()
        
class convocatoriaModel(db.Model):
    __tablename__ = 'ci_convocatoria'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_convocatoria = db.Column(db.Integer, primary_key = True)
    id_sedes = db.Column(db.Integer, nullable = False)
    id_convocatoria_sede = db.Column(db.Integer, nullable = False)
    folio = db.Column(db.String, nullable = True)
    
    @classmethod
    def find_by_idSede(cls, idSede):
        return cls.query.filter_by(id_sedes = idSede).first()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        db.session.refresh(self)
        
class sedes_usuarioModel(db.Model):
    __tablename__ = 'ci_sedes_usuario'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_sedes_usuario = db.Column(db.Integer, primary_key = True)
    id_sede = db.Column(db.Integer, nullable = False)
    id_usuario = db.Column(db.Integer, nullable = False)
    cladirgenpro = db.Column(db.String, nullable = False)
    b_estado = db.Column(db.Boolean, nullable = False)
    
    @classmethod
    def find_by_idUsuario(cls, idUsuario):
        return cls.query.filter_by(id_usuario = idUsuario).first()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        
class sedeModel(db.Model):
    __tablename__ = 'ci_sedes'
    #__table_args__ = {'schema':'UBBJ_01'}

    id_sede = db.Column(db.Integer, primary_key = True)
    id_localidad = db.Column(db.Integer, nullable = True)
    colonia = db.Column(db.String(45), nullable = True)
    calle = db.Column(db.String(255), nullable = True)
    numero = db.Column(db.String(255), nullable = True)
    codigo_postal = db.Column(db.Integer, nullable = True)
    fecha_actualizacion = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    fecha_creacion = db.Column(db.DateTime(timezone=True), server_default=func.now())
    b_estado = db.Column(db.Boolean, nullable = True)
    id_status = db.Column(db.Integer, nullable = True)
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        db.session.refresh(self)
        
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id_sede = id).first()
    
    @classmethod
    def supdate_sede(cls,id,id_localidad,colonia,calle,numero,codigo_postal,b_estado):
        db.session.query(cls).filter(cls.id_sede == id).\
        update({cls.id_localidad:id_localidad,
                cls.colonia:colonia,
                cls.calle:calle,
                cls.numero:numero,
                cls.codigo_postal:codigo_postal,
                cls.b_estado:b_estado,
                cls.id_status:5}, synchronize_session=False)
        db.session.commit()
    
    @classmethod
    def fupdate_sede(cls,id):
        db.session.query(cls).filter(cls.id_sede == id).\
        update({cls.id_status:4}, synchronize_session=False)
        db.session.commit()
    
    @classmethod
    def tupdate_sede(cls,id):
        db.session.query(cls).filter(cls.id_sede == id).\
        update({cls.id_status:6}, synchronize_session=False)
        db.session.commit()
    
    @classmethod
    def return_all(cls):
        def to_json(x):
            return {
                'id_sede': x.id_sede,
                'b_estado' : x.b_estado
            }
        return {'sedes': list(map(lambda x: to_json(x), sedeModel.query.all()))}