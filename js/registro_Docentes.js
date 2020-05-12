const Registro_Docentes = {
    data: function(){
    //VARIABLES
      return{
            x:true
            }
    //VARIABLES A CACHE
      },mounted() {
       //cache
       if (localStorage.folio) 
       { 
         this.folio = localStorage.folio; 
        }
      },
    //METODOS 
      methods:{
        //Accion del boton
        sendData:function(e){ 
          e.preventDefault();
          //ACCIONES
        },
//AXIOS
          if(x=true){
            axios.post(api+'/registro_Docentes',
            {
             headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                         "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                }, 
// JSON
                id_rol : 7,
                id_status : 1,
                      
/*ACCIONES*/   }).then(response => {
                  console.log(response.data);
                                
                  
              }).catch(e => {
//ERROR
                  console.log(e);
              }); 
//FIN AXIOS
           
        }, 
        
       //funciones
      }, 
      template: `
      
      
      `
}
    
  