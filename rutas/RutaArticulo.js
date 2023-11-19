const express = require("express");
const router = express.Router();
const articulosControlador = require("../controladores/Articulo")
//Rutas de pruebas

router.get("/ruta_prueba",articulosControlador.prueba);

module.exports=router;