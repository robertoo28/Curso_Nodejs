const {Schema,model}= require("mongoose");

const articuloSchema = Schema({
    titulo: {
        type:String,
        required:true
    },
    contenido:{
        type:String,
        required:true
    },
    fecha: {
        type:Date,
        default:Date.now
    },
    imagen: {
        type: String,
        default:"default.png"
    }
})//Aquí ponemos que esquemas tiene que tener nuestra colección
module.exports=model("Articulo",articuloSchema,"articulos");