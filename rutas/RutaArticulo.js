const express = require("express");
const router = express.Router();
const articulosControlador = require("../controladores/Articulo")
//Rutas de pruebas

router.get("/ruta_prueba",articulosControlador.prueba);
router.post("/crear",articulosControlador.crear);
router.get("/buscar/:ultimos?",articulosControlador.conseguirArticulos)
router.get("/buscar_un_articulo/:id",articulosControlador.uno)

module.exports=router;