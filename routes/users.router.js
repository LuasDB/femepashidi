// Mandamos a llamar express para poder utilizar el metodo Router
const express = require('express');
//Mandamos a llamar el servicio de Usuarios

//Agregamos el middleware Validation Handler
const { validationHandler } = require('./../middleware/validator.hanlder');
//Agregamos es Schema para la creación , edicion y obtencion de ususarios

//Mandamos a llamar el middleware para subida de archivos
const { uploadUsers } = require('../middleware/multer.Middleware');

//Creamos la variable router para acceder a nuestros endpoints
const router = express.Router();
//Llamammos al servicio que corresponde
const { User } = require('../services/users.service');

//Creamos una instancia de la clase User
const usuario = new User();

router.get('/',async(req,res,next)=>{
  try {
    const users = await usuario.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',async(req,res,next)=>{
  const { id }=req.params;
  try {
    const users = await usuario.findOne(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/validate/:curp',async(req,res,next)=>{
  const { curp }=req.params;
  try {
    const users = await usuario.validateExist(curp);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get('/verification/:curp/:status',async(req,res,next)=>{
  const { curp,status }=req.params;
  try {
    const verification = await usuario.verification(curp,status);
    if(verification.message === 'verificado'){
      res.redirect('http://localhost:3000/app/registro/');
    }

  } catch (error) {
    next(error);
  }
});
router.post('/',uploadUsers.single('archivo'),async(req,res,next)=>{
  try {
    const user = await usuario.create(req.body,req.file.filename);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.patch('/:id',async(req,res,next)=>{
  try {
    const user = await usuario.update(req.params.id,req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.delete('/:id',async(req,res,next)=>{
  try {
    const user = await usuario.delete(req.params.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});




//Retornamos el router
module.exports = router;