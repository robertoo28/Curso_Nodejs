const validator = require("validator");
const Articulo = require("../modelos/Articulos");
const fs = require("fs");
const prueba = (req, res) => {
  return res.status(200).json({
    mesnaje: "Prueba controlador articulos",
  });
};
const crear = (req, res) => {
  //Recoger parametros

  let parametros = req.body;

  //Validar datos
  try {
    let validarTitulo = !validator.isEmpty(parametros.titulo);
    let validarContenido = !validator.isEmpty(parametros.contenido);
    if (!validarContenido || !validarContenido) {
      throw new Error("Información no validada");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //Crear el objeto a guardar
  const articulo = new Articulo(parametros);

  //Asingnar valores a objeto basado en el modelo
  //articulo.titulo = parametros.titulo;  /* Esta seria la forma manual*/

  //Guardar el articulo en la base de datos
  articulo.save().then((articuloGuardado) => {
    if (!articuloGuardado) {
      return res.status(400).json({
        status: "error",
        mensaje: "Faltan datos por enviar",
      });
    }
    //Devolver resultado
    return res.status(200).json({
      status: "Succes",
      articulo: articuloGuardado,
      mensaje: "guardado con exito",
    });
  });
};
const conseguirArticulos = async (req, res) => {
  try {
    let consulta = Articulo.find({});
    if (req.params.ultimos) {
      consulta.limit(3);
    }
    let articulos = await consulta.sort({ fecha: -1 }).exec();

    if (!articulos) {
      return res.status(400).json({
        status: "error",
        mensaje: "No se ha encontrado articulos",
      });
    }
    return res.status(200).send({
      status: "succes",
      articulos,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      mensaje: "Se produjo un error",
      error,
    });
  }
};
const uno = (req, res) => {
  //Recoger un id por la url

  let id = req.params.id;

  //Buscar el articulo
  Articulo.findById(id).then((articulo) => {
    console.log("Aca llega");
    //Si no existe devolver error
    if (!articulo) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado el articulo",
      });
    }
    //Devolver el resultado
    return res.status(200).json({
      status: "succes",
      articulo,
    });
    /*.catch((error) =>{
                return res.status(500).json({
                    status: "error",
                    mensaje: "No se encontrado articulo",
                    error
                });
        });*/ //Se debe probar por que no funciona
  });
};
const borrar = (req, res) => {
  let id = req.params.id;
  console.log("Aca llega");
  Articulo.findOneAndDelete({ _id: id }).then((articuloBorrado) => {
    if (!articuloBorrado) {
      return res.status(500).json({
        status: "error",
        message: "Error al borrar",
      });
    }
    return res.status(200).json({
      status: "succes",
      articulo: articuloBorrado,
      message: "Borrado",
    });
  });
};

const actualizar = (req, res) => {
  //Recoger id
  let id = req.params.id;
  //Recoger datos
  let parametros = req.body;

  //Validar datos
  try {
    let validarTitulo = !validator.isEmpty(parametros.titulo);
    let validarContenido = !validator.isEmpty(parametros.contenido);
    if (!validarContenido || !validarContenido) {
      throw new Error("Información no validada");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //Buscar y actualizar articulo

  Articulo.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(
    (articuloActualizado) => {
      if (!articuloActualizado) {
        return res.status(500).json({
          status: "error",
          message: "Error al actualizar",
        });
      }
      //Devolver respuesta
      return res.status(200).json({
        status: "succes",
        articulo: articuloActualizado,
      });
    }
  );

  //Devolver respuesta
};

const subir = (req,res)=>{

  //Configurar multer

  //Recoger el fichero de imagen subida
  if(!req.file && !req.files){
    return res.status(404).json({
      status: "errro",
      mensaje:"Petición no valida"
    })

  }

  //Nombre del archivo
  let archivo = req.file.originalname;
  // Extension del archivo
  let archivo_split = archivo.split("\.");
  let extension = archivo_split[1];

  //comprobar extension correcta
  if(extension != "png"&& extension != "jpg"&& extension !="jpeg"&& extension != "gif"){
      //Borrar archivo
      fs.unlink(req.file.path,(error)=>{
        return res.status(400).json({
          status: "errro",
          mensaje:"Extension invalida"
        })
      })


  }else{
    return res.status(200).json({
      status: "succes",
      archivo_split,
      files: req.file
    });

  }


 
}

module.exports = {
  prueba,
  crear,
  conseguirArticulos,
  uno,
  borrar,
  actualizar,
  subir
};
