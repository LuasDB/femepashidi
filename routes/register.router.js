// Mandamos a llamar express para poder utilizar el metodo Router
const express = require('express');
// Llamamos a multer para gestionar el uso de Formularios en el POTS
const multer = require('multer');
const upload = multer();

//Agregamos el middleware Validation Handler
const { validationHandler } = require('../middleware/validator.hanlder');
//Agregamos es Schema para la creación , edicion y obtencion de ususarios


//Verificacion de archivos

const { uploadUsers } = require('../middleware/multer.Middleware')
//Creamos la variable router para acceder a nuestros endpoints
const router = express.Router();
//Llamammos al servicio que corresponde
const { Register } = require('../services/register.service');

//Creamos una instancia de la clase User
const registro = new Register();

router.get('/',async(req,res,next)=>{
  try {
    const users = await registro.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',async(req,res,next)=>{
  const { id }=req.params;
  try {
    const user = await registro.findOne(id);
    res.status(200).json({success: true, data:user});
  } catch (error) {
    next(error);
  }
});
router.post('/',upload.none(),async(req,res,next)=>{
  try {
    const register = await registro.create(req.body);
    res.status(201).json(register);
  } catch (error) {
    next(error);
  }
});
router.get('/confirmation/:id',async(req,res,next)=>{
  const { id } = req.params
  try {
    const register = await registro.confirmate(id);
    if(register.message === 'Correo enviado'){
      res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html');
    }else if(register.message === 'Ya confirmado'){
      res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html');
    }

  } catch (error) {
    next(error);
  }
});
router.get('/approval/:id/:status',async(req,res,next)=>{

  try {
    const register = await registro.approval(req.params);
    if(register.message === 'Correo enviado'){
      res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html');
    }
  } catch (error) {
    next(error);
  }
});
router.get('/get/event/by/:name',async(req,res,next)=>{
  const { name }=req.params;

  try {
    const events = await registro.findOneByName(name);
    res.status(200).json({
      success:true,
      data:events
    });
  } catch (error) {
    next(error);
  }
});
router.patch('/:id',async(req,res,next)=>{
  try {
    const user = await registro.update(req.params.id,req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id',async(req,res,next)=>{
  try {
    const user = await registro.delete(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

//Retornamos el router
module.exports = router;
