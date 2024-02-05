// Mandamos a llamar express para poder utilizar el metodo Router
const express = require('express');
//Mandamos a llamar el servicio de Usuarios

//Agregamos el middleware Validation Handler
const { validationHandler } = require('../middleware/validator.hanlder');
//Agregamos es Schema para la creación , edicion y obtencion de ususarios

//Creamos la variable router para acceder a nuestros endpoints
const router = express.Router();
//Llamammos al servicio que corresponde
const { Communication } = require('../services/communications.service');

//Creamos una instancia de la clase User
const comunicado = new Communication();

router.get('/',async(req,res,next)=>{
  try {
    const users = await comunicado.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',async(req,res,next)=>{
  const { id }=req.params;
  try {
    const users = await comunicado.findOne(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.post('/',async(req,res,next)=>{
  try {
    const user = await comunicado.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.patch('/:id',async(req,res,next)=>{
  try {
    const user = await comunicado.update(req.params.id,req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id',async(req,res,next)=>{
  try {
    const user = await comunicado.delete(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});




//Retornamos el router
module.exports = router;
