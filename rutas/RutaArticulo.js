const express = require("express");
const router = express.Router();
const multer = require("multer");
const articulosControlador = require("../controladores/Articulo");
const almacenamiento = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './imagenes/articulos/')

    },
    filename: function(req,file,cb){
        cb(null,"articulo"+Date.now()+file.originalname);

    }
})
const subidas = multer({storage : almacenamiento});

//Rutas de pruebas

router.get("/ruta_prueba", articulosControlador.prueba);
router.post("/crear", articulosControlador.crear);
router.get("/buscar/:ultimos?", articulosControlador.conseguirArticulos);
router.get("/buscar_un_articulo/:id", articulosControlador.uno);
router.delete("/eliminar/:id", articulosControlador.borrar);
router.put("/actualizar/:id", articulosControlador.actualizar);
router.post("/subir-imagen/:id",[subidas.single("file0")],articulosControlador.subir);

module.exports = router;
