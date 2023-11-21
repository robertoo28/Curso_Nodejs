const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");

console.log("holapaaaa");
//Conexion a la bdd
conexion();

// Crear servidor node
const app = express();
const puerto = 3900;
//configurar coors
app.use(cors());

//Convertir body a objeto objeto js

app.use(express.json());//Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true}));//Recibir datos por forms-urlenconded

//Crear rutas
const rutasArticulos = require("./rutas/RutaArticulo");//Carga rutas


//Cargar rutas
app.use("/api",rutasArticulos);

//Rutas puestas a lo bruto
app.get("/probando", (req, res) => {/* Se pone la ruta como primer parametro y el otro parametro es lo que quiero que muestre la ruta */
  console.log("Funciona el endpoint");
  return res.status(200).json({
    curso:"Pruebas",
    autor:"Roberto"
  }); //Siempre tiene que devolver una respuesta
}); 
app.get("/",(req,res)=>{

    return res.status(200).send("<p>Mi primera ruta</p>");
})

//Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
  console.log("Servidor en el puerto" + puerto);
 
});
