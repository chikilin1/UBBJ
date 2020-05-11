



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

ALTER TABLE "ci_docente" OWNER TO "peuani";

CREATE TABLE "ci_docente_usuario" (
	"id_docente_usuario" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente " int4 NOT NULL,
	"id_usuario " int4 NOT NULL,
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_docente_usuario")
);

ALTER TABLE "ci_docente_usuario" OWNER TO "peuani";

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

ALTER TABLE "ci_perfil_docente" OWNER TO "peuani";

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

ALTER TABLE "dd_direccion" OWNER TO "peuani";

CREATE TABLE "dd_info_contacto" (
	"id_contacto" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_usuario " int4 NOT NULL,
	"email_alt " varchar(100),
	"telefono_alt " varchar(10),
	PRIMARY KEY("id_contacto")
);

ALTER TABLE "dd_info_contacto" OWNER TO "peuani";

CREATE TABLE "ci_convocatoria_docente" (
	"id_convocatoria_docente" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"id_convocatoria_sede" int4 NOT NULL,
	"folio" varchar(50),
	PRIMARY KEY("id_convocatoria_docente","id_docente","id_convocatoria_sede")
);

ALTER TABLE "ci_convocatoria_docente" OWNER TO "peuani";

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

ALTER TABLE "dd_formacion_profesional" OWNER TO "peuani";

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

ALTER TABLE "dd_experiencia_laboral" OWNER TO "peuani";

CREATE TABLE "dd_documento_docente" (
	"id_documento" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_docente" int4 NOT NULL,
	"id_tipodoc" int4 NOT NULL,
	"documento" varchar(150),
	"url" varchar(250),
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_documento")
);

ALTER TABLE "dd_documento_docente" OWNER TO "peuani";

CREATE TABLE "ci_doc_docente_conv" (
	"id_doc_docente_conv" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
	"id_documento" int4 NOT NULL,
	"id_convocatoria_sede" int4 NOT NULL,
	"b_estado" bool NOT NULL DEFAULT True,
	PRIMARY KEY("id_doc_docente_conv")
);

ALTER TABLE "ci_doc_docente_conv" OWNER TO "peuani";



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
