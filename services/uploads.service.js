//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");


//configuramos multer
// Configura Multer
const storage = multer.diskStorage({
  destination: './public/uploads/', // Carpeta de destino
  filename: function (req, file, cb) {
    // Cambia el nombre del archivo si es necesario
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

//Creamos una clase para la gestión de usuarios
class Upload {
  constructor(){

  }
  upload(body){
    upload.single(body);
  }



}

module.exports = { Upload }
