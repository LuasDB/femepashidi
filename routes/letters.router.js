const express = require('express')
const fs = require('fs');
const path = require('path');
const uploadDirectory = './uploads/letters'
//Configuracion multer
const multer = require('multer')
// Verificar si la carpeta de subida existe, si no, crearla
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,uploadDirectory )
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-'+file.originalname)
  }
})
const multerLeters = multer({storage:storage})

const router = express.Router()

const { Letters } = require('../services/letters.service')
const letters = new Letters();


router.post('/',multerLeters.single('archivo'),async(req,res)=>{
  console.log('[ENTRANDO A LA GENERACIÓN CARTAS]')
  const { body,file } = req
  const newLetter = await letters.create(body,file);
  // if(newLetter.success){
  //   res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html')
  // }
  res.status(201).json(newLetter)
});
router.get('/verification/:id/:status',async(req,res)=>{
  const {id, status} = req.params
  const presidentLetter = await letters.verification(id,status);
  if(presidentLetter.success){
    res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html')
  }
})

router.get('/approve/:id/:status',async(req,res)=>{
  const {id, status} = req.params
  const presidentLetter = await letters.approve(id,status);
  if(presidentLetter.success){
    res.redirect('https://www.femepashidi.com.mx/inicio/respuesta.html')
  }
})

//Retornamos el router
module.exports = router;

