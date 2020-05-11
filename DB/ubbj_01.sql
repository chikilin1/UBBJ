-- =============================================================================
-- Diagram Name: ubbj_01_05052020
-- Created on: 11/05/2020 05:23:18 p. m.
-- Diagram Version: 
-- =============================================================================


CREATE TABLE "cc_sedescarrera" (
	"id_sedescarrera" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_sedes" int4 NOT NULL,
	"id_carrera" int4 NOT NULL,
	CONSTRAINT "id_sedesCarrera" PRIMARY KEY("id_sedescarrera")
)
WITH (
	OIDS = False
);

ALTER TABLE "cc_sedescarrera" OWNER TO "peuani";

CREATE TABLE "cc_tipo_columna_sede" (
	"id_tipo_columna" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_convocatoria_sede" int4 NOT NULL,
	"tipo" varchar(45),
	"magnitud" int8,
	"regex" varchar(1023),
	"b_estado" bool NOT NULL,
	CONSTRAINT "cc_tipo_columna_sede_pkey" PRIMARY KEY("id_tipo_columna")
)
WITH (
	OIDS = False
);

ALTER TABLE "cc_tipo_columna_sede" OWNER TO "peuani";

CREATE TABLE "ci_carrera" (
	"id_carrera" int4 NOT NULL,
	"carrera" varchar NOT NULL,
	"b_estasdo" bool NOT NULL,
	CONSTRAINT "id_carrera" PRIMARY KEY("id_carrera")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_carrera" OWNER TO "peuani";

CREATE TABLE "ci_codigo_postal" (
	"id_codigo_postal" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_localidad" int4 NOT NULL,
	"codigo_postal" int8,
	"b_estado" bool NOT NULL DEFAULT true,
	CONSTRAINT "ci_codigo_postal_pkey" PRIMARY KEY("id_codigo_postal")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_codigo_postal" OWNER TO "peuani";

CREATE TABLE "ci_convocatoria" (
	"id_convocatoria" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_sedes" int4 NOT NULL,
	"id_convocatoria_sede" int4 NOT NULL,
	"folio" varchar(20),
	CONSTRAINT "ci_convocatoria_pkey" PRIMARY KEY("id_convocatoria")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_convocatoria" OWNER TO "peuani";

CREATE TABLE "ci_doc_reg_sedes" (
	"id_doc_reg_sede" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_reg_sed_columna" int4 NOT NULL,
	"id_documento" int4 NOT NULL,
	CONSTRAINT "ci_doc_reg_sedes_pkey" PRIMARY KEY("id_doc_reg_sede")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_doc_reg_sedes" OWNER TO "peuani";

CREATE TABLE "ci_estado" (
	"id_estado" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"estado" varchar(45) NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "ci_estado_pkey" PRIMARY KEY("id_estado")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_estado" OWNER TO "peuani";

CREATE TABLE "ci_localidad" (
	"id_localidad" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_municipio" int4 NOT NULL,
	"localidad" varchar(250),
	"b_estado" bool NOT NULL DEFAULT true,
	"cve_loc" int4,
	CONSTRAINT "ci_localidad_pkey" PRIMARY KEY("id_localidad")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_localidad" OWNER TO "peuani";

CREATE TABLE "ci_municipio" (
	"id_municipio" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"municipio" varchar(250),
	"id_estado" int4 NOT NULL,
	"b_estado" bool NOT NULL DEFAULT true,
	CONSTRAINT "ci_municipio_pkey" PRIMARY KEY("id_municipio")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_municipio" OWNER TO "peuani";

CREATE TABLE "ci_opciones_columna_registro" (
	"id_opciones_columna_registro" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_tipo_columna" int4 NOT NULL,
	"texto" varchar(255),
	"valor" int4,
	CONSTRAINT "ci_opciones_columna_registro_pkey" PRIMARY KEY("id_opciones_columna_registro")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_opciones_columna_registro" OWNER TO "peuani";

CREATE TABLE "ci_roles_usuario" (
	"id_rol_usuario" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_rol" int4 NOT NULL,
	"id_usuario" int4 NOT NULL,
	"b_logico" int4 NOT NULL,
	CONSTRAINT "ci_roles_usuario_pkey" PRIMARY KEY("id_rol_usuario")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_roles_usuario" OWNER TO "peuani";

CREATE TABLE "ci_sedes" (
	"id_sede" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_localidad" int4,
	"colonia" varchar(45),
	"calle" varchar(255),
	"numero" varchar(255),
	"codigo_postal" int4,
	"fecha_actualizacion" timestamp,
	"fecha_creacion" timestamp,
	"b_estado" bool,
	"id_status" int8,
	CONSTRAINT "ci_sedes_pkey" PRIMARY KEY("id_sede")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_sedes" OWNER TO "peuani";

CREATE TABLE "ci_sedes_usuario" (
	"id_sedes_usuario" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_sede" int4 NOT NULL,
	"id_usuario" int4 NOT NULL,
	"cladirgenpro" varchar(50) NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "id_usuariosede" PRIMARY KEY("id_sedes_usuario")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_sedes_usuario" OWNER TO "peuani";

CREATE TABLE "ci_usuario" (
	"id_usuario" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_status" int4 NOT NULL,
	"curp" varchar(18) NOT NULL,
	"nombre" varchar(45) NOT NULL,
	"apaterno" varchar(45),
	"amaterno" varchar(45),
	"email" varchar(45) NOT NULL,
	"password" varchar(250),
	"numTel" varchar(10),
	"factualiza" timestamp,
	"fcreacion" timestamp,
	"b_estado" bool NOT NULL,
	CONSTRAINT "id_usuario" PRIMARY KEY("id_usuario")
)
WITH (
	OIDS = False
);

ALTER TABLE "ci_usuario" OWNER TO "peuani";

CREATE TABLE "cs_rol" (
	"id_rol" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"rol" char(45) NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "id_rol" PRIMARY KEY("id_rol")
)
WITH (
	OIDS = False
);

ALTER TABLE "cs_rol" OWNER TO "peuani";

CREATE TABLE "cs_status" (
	"id_status" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"status" char(45) NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "id_status" PRIMARY KEY("id_status")
)
WITH (
	OIDS = False
);

ALTER TABLE "cs_status" OWNER TO "peuani";

CREATE TABLE "dd_bitacora" (
	"id_bitacora" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_usuario" int4 NOT NULL,
	"accion" varchar(45) NOT NULL,
	"query" varchar(500) NOT NULL,
	"falta" timestamp NOT NULL,
	CONSTRAINT "id_bitacora" PRIMARY KEY("id_bitacora")
)
WITH (
	OIDS = False
);

ALTER TABLE "dd_bitacora" OWNER TO "peuani";

COMMENT ON CONSTRAINT "id_bitacora" ON "dd_bitacora" IS 'False';

CREATE TABLE "dd_bitacora_eventos" (
	"id_bitacora_eventos" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_usuario" int4 NOT NULL,
	"evento" varchar(255) NOT NULL,
	"tabla" varchar(45) NOT NULL,
	"codigo" int4 NOT NULL,
	CONSTRAINT "id_bitacora_evento" PRIMARY KEY("id_bitacora_eventos")
)
WITH (
	OIDS = False
);

ALTER TABLE "dd_bitacora_eventos" OWNER TO "peuani";

CREATE TABLE "dd_convocatoria_sede" (
	"id_convocatoria_sede" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"etiqueta" varchar(45) NOT NULL,
	"descripcion" varchar(255),
	"periodo" varchar(45) NOT NULL,
	"inicio" date NOT NULL,
	"fin" date NOT NULL,
	"fecha_actualizacion" timestamp NOT NULL,
	"fecha_creacion" timestamp NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "dd_convocatoria_sede_pkey" PRIMARY KEY("id_convocatoria_sede")
)
WITH (
	OIDS = False
);

ALTER TABLE "dd_convocatoria_sede" OWNER TO "peuani";

CREATE TABLE "dd_documento_sede" (
	"id_documento" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_sede" int4 NOT NULL,
	"documento" varchar(45) NOT NULL,
	"url" varchar(255) NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "dd_documento_sede_pkey" PRIMARY KEY("id_documento")
)
WITH (
	OIDS = False
);

ALTER TABLE "dd_documento_sede" OWNER TO "peuani";

CREATE TABLE "im_imagenes" (
	"id_imagen" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"imagen" varchar(45),
	"url" varchar(255) NOT NULL,
	"alto" int4,
	"ancho" int4,
	"fcreacion" timestamp,
	"b_estado" bool NOT NULL,
	CONSTRAINT "im_imagenes_pkey" PRIMARY KEY("id_imagen")
)
WITH (
	OIDS = False
);

ALTER TABLE "im_imagenes" OWNER TO "peuani";

CREATE TABLE "im_registro_sede" (
	"id_imagen_registro_sede" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_imagen" int4 NOT NULL,
	"id_reg_sed_columna" int4 NOT NULL,
	CONSTRAINT "im_registro_sede_pkey" PRIMARY KEY("id_imagen_registro_sede")
)
WITH (
	OIDS = False
);

ALTER TABLE "im_registro_sede" OWNER TO "peuani";

CREATE TABLE "im_usuario" (
	"id_imagen_usuario" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_imagen" int4 NOT NULL,
	"id_usuario" int4 NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "im_usuario_pkey" PRIMARY KEY("id_imagen_usuario")
)
WITH (
	OIDS = False
);

ALTER TABLE "im_usuario" OWNER TO "peuani";

CREATE TABLE "re_sedes" (
	"id_reg_extra_sedes" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_reg_sed_columna" int4 NOT NULL,
	"id_sede" int4 NOT NULL,
	"valor" varchar(255),
	"b_estado" bool NOT NULL,
	CONSTRAINT "re_sedes_pkey" PRIMARY KEY("id_reg_extra_sedes")
)
WITH (
	OIDS = False
);

ALTER TABLE "re_sedes" OWNER TO "peuani";

CREATE TABLE "revoked_tokens" (
	"idToken" SERIAL NOT NULL,
	"jti" varchar(120),
	CONSTRAINT "revoked_tokens_pkey" PRIMARY KEY("idToken")
)
WITH (
	OIDS = False
);

ALTER TABLE "revoked_tokens" OWNER TO "peuani";

CREATE TABLE "rs_columna" (
	"id_reg_sed_columna" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"nombre_columna" varchar(45),
	"id_convocatoria_sede" int4 NOT NULL,
	"id_tipo_columna" int4 NOT NULL,
	"b_estado" bool NOT NULL,
	CONSTRAINT "rs_columna_pkey" PRIMARY KEY("id_reg_sed_columna")
)
WITH (
	OIDS = False
);

ALTER TABLE "rs_columna" OWNER TO "peuani";

CREATE TABLE "ci_docente" (
	"id_docente " int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_status " int4 NOT NULL,
	"grado_estudios " int4,
	"anios_exp" int2,
	"disponibilidad" int4,
	"movilidad" bool NOT NULL DEFAULT False,
	"lengua_originaria " varchar(100),
	"lengua_desc " varchar(100),
	"factualiza" timestamp,
	"fcreacion" timestamp NOT NULL,
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_docente ")
);

CREATE TABLE "ci_docente_usuario" (
	"id_docente_usuario" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente " int4 NOT NULL,
	"id_usuario " int4 NOT NULL,
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_docente_usuario")
);

CREATE TABLE "ci_perfil_docente" (
	"id_perfil_docente" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"id_perfil_profesional" int4 NOT NULL,
	"id_carrera" int4 NOT NULL,
	"id_sede" int4 NOT NULL,
	"new_field0" int4,
	"prioridad" int4,
	PRIMARY KEY("id_perfil_docente")
);

CREATE TABLE "dd_direccion" (
	"id_direccion" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_usuario" int4 NOT NULL,
	"id_cp" int4,
	"id_estado" int4,
	"id_municipio" int4,
	"id_localidad" int4,
	"calle" varchar(250),
	"num_ext" varchar(25),
	"num_int" varchar(15),
	"país" varchar(25),
	"referencias" varchar(500),
	PRIMARY KEY("id_direccion")
);

CREATE TABLE "dd_info_contacto" (
	"id_contacto" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_usuario " int4 NOT NULL,
	"email_alt " varchar(100),
	"telefono_alt " varchar(10),
	PRIMARY KEY("id_contacto")
);

CREATE TABLE "ci_convocatoria_docente" (
	"id_convocatoria_docente" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"id_convocatoria_sede" int4 NOT NULL,
	"folio" varchar(50),
	PRIMARY KEY("id_convocatoria_docente","id_docente","id_convocatoria_sede")
);

CREATE TABLE "dd_formacion_profesional" (
	"id_formacion" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"grado_academico" varchar(50),
	"periodo_ingreso" date,
	"periodo_sallida" date,
	"carrera" varchar(100),
	"titulado" bool,
	"cedula_bool" bool,
	"cedula" varchar(50),
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_formacion")
);

CREATE TABLE "dd_experiencia_laboral" (
	"id_expereiencia" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"institucion" varchar(150),
	"actividad" varchar(150),
	"fecha_ingreso" date,
	"fecha_salida" date,
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_expereiencia")
);

CREATE TABLE "dd_documento_docente" (
	"id_documento" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"id_tipodoc" int4 NOT NULL,
	"documento" varchar(150),
	"url" varchar(250),
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_documento")
);

CREATE TABLE "ci_doc_docente_conv" (
	"id_doc_docente_conv" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_documento" int4 NOT NULL,
	"id_convocatoria_sede" int4 NOT NULL,
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_doc_docente_conv")
);


ALTER TABLE "cc_sedescarrera" ADD CONSTRAINT "id_sede1" FOREIGN KEY ("id_sedes")
	REFERENCES "ci_sedes"("id_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "cc_sedescarrera" ADD CONSTRAINT "id_carrera" FOREIGN KEY ("id_carrera")
	REFERENCES "ci_carrera"("id_carrera")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "cc_tipo_columna_sede" ADD CONSTRAINT "id_convocatoria_sede1" FOREIGN KEY ("id_convocatoria_sede")
	REFERENCES "dd_convocatoria_sede"("id_convocatoria_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_codigo_postal" ADD CONSTRAINT "id_localidad0" FOREIGN KEY ("id_localidad")
	REFERENCES "ci_localidad"("id_localidad")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_convocatoria" ADD CONSTRAINT "id_sedes0" FOREIGN KEY ("id_sedes")
	REFERENCES "ci_sedes"("id_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_convocatoria" ADD CONSTRAINT "id_convocatoria_sede" FOREIGN KEY ("id_convocatoria_sede")
	REFERENCES "dd_convocatoria_sede"("id_convocatoria_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_doc_reg_sedes" ADD CONSTRAINT "id_documento_sede" FOREIGN KEY ("id_documento")
	REFERENCES "dd_documento_sede"("id_documento")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_doc_reg_sedes" ADD CONSTRAINT "id_reg_sed_columna1" FOREIGN KEY ("id_reg_sed_columna")
	REFERENCES "rs_columna"("id_reg_sed_columna")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_localidad" ADD CONSTRAINT "id_municipio" FOREIGN KEY ("id_municipio")
	REFERENCES "ci_municipio"("id_municipio")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_municipio" ADD CONSTRAINT "id_estado0" FOREIGN KEY ("id_estado")
	REFERENCES "ci_estado"("id_estado")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_opciones_columna_registro" ADD CONSTRAINT "id_tipo_columna" FOREIGN KEY ("id_tipo_columna")
	REFERENCES "cc_tipo_columna_sede"("id_tipo_columna")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_roles_usuario" ADD CONSTRAINT "id_rol" FOREIGN KEY ("id_rol")
	REFERENCES "cs_rol"("id_rol")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_roles_usuario" ADD CONSTRAINT "id_usuario2" FOREIGN KEY ("id_usuario")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_sedes" ADD CONSTRAINT "id_status0" FOREIGN KEY ("id_status")
	REFERENCES "cs_status"("id_status")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_sedes" ADD CONSTRAINT "id_localidad" FOREIGN KEY ("id_localidad")
	REFERENCES "ci_localidad"("id_localidad")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_sedes_usuario" ADD CONSTRAINT "id_usuario" FOREIGN KEY ("id_usuario")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_sedes_usuario" ADD CONSTRAINT "id_sede0" FOREIGN KEY ("id_sede")
	REFERENCES "ci_sedes"("id_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_usuario" ADD CONSTRAINT "id_status" FOREIGN KEY ("id_status")
	REFERENCES "cs_status"("id_status")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_bitacora" ADD CONSTRAINT "id_usuario" FOREIGN KEY ("id_usuario")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_bitacora_eventos" ADD CONSTRAINT "id_usuario0" FOREIGN KEY ("id_usuario")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_documento_sede" ADD CONSTRAINT "id_sedes" FOREIGN KEY ("id_sede")
	REFERENCES "ci_sedes"("id_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "im_registro_sede" ADD CONSTRAINT "id_imagen" FOREIGN KEY ("id_imagen")
	REFERENCES "im_imagenes"("id_imagen")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "im_registro_sede" ADD CONSTRAINT "id_reg_sed_columna" FOREIGN KEY ("id_reg_sed_columna")
	REFERENCES "rs_columna"("id_reg_sed_columna")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "im_usuario" ADD CONSTRAINT "id_usuario1" FOREIGN KEY ("id_usuario")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "im_usuario" ADD CONSTRAINT "id_imagenes" FOREIGN KEY ("id_imagen")
	REFERENCES "im_imagenes"("id_imagen")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "re_sedes" ADD CONSTRAINT "id_reg_sed_columna0" FOREIGN KEY ("id_reg_sed_columna")
	REFERENCES "rs_columna"("id_reg_sed_columna")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "re_sedes" ADD CONSTRAINT "id_sede" FOREIGN KEY ("id_sede")
	REFERENCES "ci_sedes"("id_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "rs_columna" ADD CONSTRAINT "id_convocatoria_sede0" FOREIGN KEY ("id_convocatoria_sede")
	REFERENCES "dd_convocatoria_sede"("id_convocatoria_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "rs_columna" ADD CONSTRAINT "id_tipo_columna0" FOREIGN KEY ("id_tipo_columna")
	REFERENCES "cc_tipo_columna_sede"("id_tipo_columna")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_docente" ADD CONSTRAINT "id_status1" FOREIGN KEY ("id_status ")
	REFERENCES "cs_status"("id_status")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_docente_usuario" ADD CONSTRAINT "id_docente" FOREIGN KEY ("id_docente ")
	REFERENCES "ci_docente"("id_docente ")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_docente_usuario" ADD CONSTRAINT "id_usuario3" FOREIGN KEY ("id_usuario ")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_perfil_docente" ADD CONSTRAINT "id_docente0" FOREIGN KEY ("id_docente")
	REFERENCES "ci_docente"("id_docente ")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_direccion" ADD CONSTRAINT "id_usuario4" FOREIGN KEY ("id_usuario")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_direccion" ADD CONSTRAINT "id_codigo_postal" FOREIGN KEY ("id_cp")
	REFERENCES "ci_codigo_postal"("id_codigo_postal")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_direccion" ADD CONSTRAINT "id_municipio0" FOREIGN KEY ("id_municipio")
	REFERENCES "ci_municipio"("id_municipio")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_direccion" ADD CONSTRAINT "id_estado" FOREIGN KEY ("id_estado")
	REFERENCES "ci_estado"("id_estado")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_info_contacto" ADD CONSTRAINT "id_usuario5" FOREIGN KEY ("id_usuario ")
	REFERENCES "ci_usuario"("id_usuario")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_convocatoria_docente" ADD CONSTRAINT "id_docente1" FOREIGN KEY ("id_docente")
	REFERENCES "ci_docente"("id_docente ")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_convocatoria_docente" ADD CONSTRAINT "id_convocatoria_sede3" FOREIGN KEY ("id_convocatoria_sede")
	REFERENCES "dd_convocatoria_sede"("id_convocatoria_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_formacion_profesional" ADD CONSTRAINT "id_docente3" FOREIGN KEY ("id_docente")
	REFERENCES "ci_docente"("id_docente ")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_experiencia_laboral" ADD CONSTRAINT "id_docente2" FOREIGN KEY ("id_docente")
	REFERENCES "ci_docente"("id_docente ")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "dd_documento_docente" ADD CONSTRAINT "id_docente4" FOREIGN KEY ("id_docente")
	REFERENCES "ci_docente"("id_docente ")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;

ALTER TABLE "ci_doc_docente_conv" ADD CONSTRAINT "id_convocatoria_sede2" FOREIGN KEY ("id_convocatoria_sede")
	REFERENCES "dd_convocatoria_sede"("id_convocatoria_sede")
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE;


