const mongoose = require("mongoose");//Importar mongooose.

//Hacemos una función asincrona por si tarda en conectar
const conexion = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/mi_blog");//la url de mi bdd de mongodb
        console.log("Conectado correctamente");

        
    } catch (error) {
        console.log(error);
        throw new Error("error al conectar");
        
    }
}
module.exports={
    conexion
}// exportar mi clase conexion