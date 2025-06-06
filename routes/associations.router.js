// Mandamos a llamar express para poder utilizar el metodo Router
const express = require('express');// Llamamos a multer para gestionar el uso de Formularios en el POTS
const multer = require('multer');
const upload = multer();
//Agregamos el middleware Validation Handler
const { validationHandler } = require('../middleware/validator.hanlder');
//Agregamos es Schema para la creación , edicion y obtencion de ususarios

//Creamos la variable router para acceder a nuestros endpoints
const router = express.Router();
//Llamammos al servicio que corresponde
const { Association } = require('../services/associations.service');

//Creamos una instancia de la clase User
const association = new Association();

router.get('/',async(req,res,next)=>{
  try {
    const users = await association.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',async(req,res,next)=>{
  const { id }=req.params;
  try {
    const users = await association.findOne(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.post('/',upload.none(),async(req,res,next)=>{
  try {
    const user = await association.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.patch('/:id',upload.none(),async(req,res,next)=>{
  try {
    const user = await association.update(req.params.id,req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id',async(req,res,next)=>{
  try {
    const user = await association.delete(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/importar/todos/registros',async(req,res,next)=>{
  try {
    const importacion = await association.import()
    res.status(200).json({
      success:true,message:'Importada',importacion
    })
  } catch (error) {
    next(error);
  }
});


//Retornamos el router
module.exports = router;
