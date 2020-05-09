const menu=new Vue({
    el:"#elemento",
    data:{
      user:localStorage.user, status:localStorage.status, curp:localStorage.curp,
      documentos:[{nombre:"Estatuto Orgánico",link:'resources/documentos/Documentos Basicos/Estatuto_orgánico.pdf'},
                  {nombre:"Estatuto Académico",link:'resources/documentos/Documentos Basicos/Estatuto_académico.pdf'},
                  {nombre:"Decreto de Creación",link:'resources/documentos/Documentos Basicos/Decreto_de_creación.pdf'},
                  {nombre:"Lineamientos de Sedes",link:'resources/documentos/Documentos Basicos/Lineamientos_de_sedes.pdf'},  
                  {nombre:"Órgano de Gobierno 2020",link:''}, ],
              ED:[/*{nombre:"Registro de Aspirantes",link:'/aspirantes'},*/ 
                  {nombre:"Calendario 14 semanas 2020",link:'resources/documentos/Estudios y Docentes/Calendario_14_semanas_2020.pdf'},
                  {nombre:"Calendario 18 semanas 2020",link:'resources/documentos/Estudios y Docentes/Calendario_18_semanas_2020.pdf'},
                  {nombre:"Estudiantes y Docentes por Sede",link:''},
                  {nombre:"Reglamento Escolar",link:'resources/documentos/Estudios y Docentes/reglamento_escolar.pdf'}, ],
  sedes_carreras:[{nombre:"Carreras y Mallas",link:'/carrera'},
                  {nombre:"Áreas de Conocimiento",link:'/areas_de_conocimiento'},
                  {nombre:"Avance de Obras",link:''}, ],
  /*avance_sede_sub:[{nombre:"Informe financiero",link:''},
                  {nombre:"Avance de uso de recursos",link:''}, ],*/
        sedesSub:[{nombre:"Registro de Sedes ante la DGP",link:'/sedes'},
                  {nombre:"",link:''}, ],
                  Convocatorias_Eventos:[{nombre:"Convocatoria para estudiantes (10 de Junio 2020)",link:'resources/documentos/Convocatorias y Eventos/Convocatoria estudiantes 2020-2.pdf'},
                  {nombre:"Convocatoria para docentes (1 de Junio 2020)",link:'resources/documentos/Convocatorias y Eventos/Convocatoria_docentes_2020.pdf'},
                  {nombre:"Convocatoria para nuevas sedes educativas (6 de Mayo 2020)",link:'resources/documentos/Convocatorias y Eventos/Convocatoria de nuevas sedes educativas_2020.pdf'},
                  {nombre:"Registro para nuevas sedes educativas (6 de Mayo 2020)",link:'/registro_usuarios'}, ],
    }
  })


