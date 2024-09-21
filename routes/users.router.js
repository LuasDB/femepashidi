const express = require('express');
const Boom = require('@hapi/boom')
const {configureUploadUsers} = require('./../middleware/configureUpload.js')


const { User } = require('../services/users.service');

const router = express.Router();
const user = new User();

router.post('/', configureUploadUsers ,(req,res,next)=>{
  const uploadMiddleware = req.upload.any()

  uploadMiddleware(req,res,async(err)=>{
    if(err){
      return next(Boom.badRequest(err.message))
    }

    const { body, files } = req

    let data ={}
    if(files){
      files.forEach(item=>{
        data[item.fieldname] = `${item.filename}`
      })
    }
    data ={...body,...data}

    try {
      const create = await user.create(data)
      if(!create.success){
        res.status(400).json({
          success:false,
          message:'El usuario ya existe',

        })
        return
      }
      res.status(201).json({
        success:true,
        message:'Registro creado correctamente',
        data:create
      })
    } catch (error) {
      next(Boom.internal('Algo salio mal al intentar crear el registro',error.message))
    }
  })
})

router.get('/',async(req,res,next)=>{
  try {
    const services = await user.getAll()
    if(!services){
      return next(Boom.notFound('No se encotraron registros '))
    }
    res.status(200).json({
      success:true,
      data:services
    })
  } catch (error) {
    return next(Boom.internal('Algo salio mal al buscar los registros', error))

  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
console.log('entrando al get id')
  try {
    const doc = await user.getOneById(id);
    if (!doc) {
      return next(Boom.notFound('Registro no encontrado'));
    }
    res.status(200).json({
      success: true,
      data: doc
    });
  } catch (error) {
    next(Boom.internal('Algo salio mal al intentar obtener el registro', error));
  }
});

router.get('/obtain/by/curp/one/user/:curp',async(req,res,next)=>{
  const { curp }=req.params;

  try {
    const oneUser = await user.getByCurp(curp)
    if(!oneUser){
      return next(Boom.notFound('Registro no encontrado'));
    }
    res.status(200).json({
      success:true,
      data:oneUser
    })
  } catch (error) {
    next(Boom.internal('Algo salio mal al intentar obtener el registro', error));
  }
});

router.get('/verification/:curp/:status',async(req,res,next)=>{
    const { curp,status }=req.params;
    try {
      const verification = await user.verification(curp,status);
      if(verification.message === 'verificado'){
        res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html');
      }else{
        res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html');
      }
    } catch (error) {
      next(error);
    }
});

router.get('/para/la/correccion/de/assoc/:curp',async(req,res,next)=>{
  const { curp }=req.params;

  try {
    const oneUser = await user.getByCurpA(curp)
    if(!oneUser){
      return next(Boom.notFound('Registro no encontrado'));
    }
    res.status(200).json({
      success:true,
      data:oneUser
    })
  } catch (error) {
    next(Boom.internal('Algo salio mal al intentar obtener el registro', error));
  }
});

router.get('/validate/:curp',async(req,res,next)=>{
  const { curp }=req.params;
  try {
    const dataUser = await user.validateExist(curp);
    let ressult = true
    if(!dataUser){
      ressult=false
    }
    res.status(200).json({
      success:ressult,
      data:dataUser
    })
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',configureUploadUsers,async(req,res,next)=>{
  const uploadMiddleware = req.upload.any()

  uploadMiddleware(req,res,async(err)=>{
    if(err){
      return next(Boom.badRequest(err.message))
    }

    const { body, files } = req
    const {id} = req.params

    let data ={}
    if(files){
      files.forEach(item=>{
        data[item.fieldname] = `${item.filename}`
      })
    }
    data ={...body,...data}

    try {
      const create = await user.updateOne(id,data)
      if(!create.success){
        res.status(404).json({
          success:false,
          message:'El usuario No encontrado',

        })
        return
      }
      res.status(201).json({
        success:true,
        message:'Registro creado correctamente',
        data:create
      })
    } catch (error) {
      next(Boom.internal('Algo salio mal al intentar crear el registro',error.message))
    }
  })

});

//
// router.get('/resend-email-register/:curp',async(req,res,next)=>{
//   const { curp }=req.params;
//   try {
//     const users = await usuario.resendMailRegister(curp);
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/',uploadUsers.single('archivo'),async(req,res,next)=>{
//   try {
//     const user = await usuario.create(req.body,req.file.filename);
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// });
// router.patch('/:curp',upload.none(),async(req,res,next)=>{
//   try {
//     console.log('El body:',req.body);
//     const user = await usuario.update(req.params.curp,req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// });
// router.delete('/:id',async(req,res,next)=>{
//   try {
//     const user = await usuario.delete(req.params.id);
//     res.status(201).json(user);
//   } catch (error) {
//     next(error);
//   }
// });




//Retornamos el router
module.exports = router;
