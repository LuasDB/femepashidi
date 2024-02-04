//Agregamos express para empezar nuetro servidor ,para intalarlo : npm i express
const express = require('express');
//Traemos la libreria de cors para evitar estos errores en produccion
const cors = require('cors');
//exportamos nuestra funcion de routerApi para nuestra aplicación
const routerApi = require('./routes');
//Exportamos los Middlewares que utilizaremos para los errores
const { logErrors,errorHandler,boomErrorHandler } = require('./middleware/error.handler');
//Variable para llamar las funciones de express
const app = express();
//Definimos el puerto a utilizar
const port= process.env.PORT || 3000;
//Para que express pueda hacer la conversión de los JSON
app.use(express.json());
//Ejecutamos CORS, primero crearemos las url a las que le daremos acceso
// const whitelist = ['http://127.0.0.1:5500','https://myapp.co'];
// const options ={
//   origin: (origin,callback)=>{
//     if(whitelist.includes(origin) || !origin){
//       callback(null,true);
//     }else{
//       callback(new Error('No permitido'));
//     }
//   }
// }

// app.use(cors(options));
app.use(cors());
//Mandamos nuestra aplicación a las rutas
routerApi(app);
//Manejo de los Middlewares por parte de express, es importante el orden de los mismos
//Primero mandamos el LogErrors y despues el errorHandler
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);


//Estaticos
app.use('/app',express.static('public'));
//Arrancamos en el puerto declarado
app.listen(port,()=>{
  console.log('Mi port:' + port);
});
