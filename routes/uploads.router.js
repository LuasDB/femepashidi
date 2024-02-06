// Mandamos a llamar express para poder utilizar el metodo Router
const express = require('express');
//Mandamos a llamar el middleware para subida de archivos
const { upload } = require('../middleware/multer.Middleware');


//Creamos la variable router para acceder a nuestros endpoints
const router = express.Router();



router.post('/',upload.single('archivo'),(req,res)=>{
  console.log('ESTAMOS EN EL POST');
   // El archivo está disponible en req.file
   if (!req.file) {
    return res.status(400).send('No se ha proporcionado ningún archivo.');
  }

  // Puedes acceder al nombre del archivo y otros detalles en req.file
  const fileName = req.file.filename;
  console.log(fileName)

  // Puedes realizar otras operaciones con el archivo cargado aquí

  res.status(200).send('Archivo subido exitosamente: ' + fileName);
});


//Retornamos el router
module.exports = router;
