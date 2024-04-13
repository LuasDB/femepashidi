//Agregamos express para empezar nuetro servidor ,para intalarlo : npm i express
const express = require('express');

//Traemos la libreria de cors para evitar estos errores en produccion
const cors = require('cors');
//exportamos nuestra funcion de routerApi para nuestra aplicación
const routerApi = require('./routes');
//Exportamos los Middlewares que utilizaremos para los errores
const { logErrors,errorHandler,boomErrorHandler } = require('./middleware/error.handler');
//Exportamos middleware multer para manejo de archivos
const { upload } = require('./middleware/multer.Middleware');
//Variable para llamar las funciones de express
const app = express();
//Definimos el puerto a utilizar
const port= process.env.PORT || 3000;
//Configuracion para manejar datos de formulario
app.use(express.urlencoded({ extended: true }));
//Para que express pueda hacer la conversión de los JSON
app.use(express.json());

//Ejecutamos CORS, primero crearemos las url a las que le daremos acceso
const whitelist = ['http://localhost:3000/','https://femepashidi.siradiacion.com.mx/','https://www.femepashidi.com.mx'];
const options ={
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors(options));
// para todas las url
// app.use(cors());
//Mandamos nuestra aplicación a las rutas
routerApi(app);
//Manejo de los Middlewares por parte de express, es importante el orden de los mismos
//Primero mandamos el LogErrors y despues el errorHandler

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);


//Estaticos
app.use('/app',express.static('public'));
app.use('/images',express.static('uploads'));


//Arrancamos en el puerto declarado
app.listen(port,()=>{
  console.log('Mi port:' + port);
});
