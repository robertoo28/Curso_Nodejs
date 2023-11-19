const prueba = (req,res)=>{
    return res.status(200).json({
        mesnaje:"Prueba controlador articulos"
    });

}

module.exports={
    prueba
}