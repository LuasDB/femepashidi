//Agregamos express para empezar nuetro servidor ,para intalarlo : npm i express
const express = require('express');
const { Server } = require('socket.io');
//Agregamos la libreria de http para poder utilizar el servidor
const {createServer} = require('http');

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


//Configuracion para manejar datos de formulario
app.use(express.urlencoded({ extended: true }));
//Para que express pueda hacer la conversión de los JSON
app.use(express.json());

//Ejecutamos CORS, primero crearemos las url a las que le daremos acceso
// const whitelist = ['http://localhost:3000','https://femepashidi.siradiacion.com.mx/','https://www.femepashidi.com.mx','http://127.0.0.1'];
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
// para todas las url
app.use(cors());




const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Asegúrate de que sea la URL de tu frontend
    methods: ["GET", "POST"]
  }
});
// Verificar que la instancia de io se ha creado correctamente


// Evento de conexión único para socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Usuario desconectado', socket.id);
  });
});

//Mandamos nuestra aplicación a las rutas
routerApi(app,io);
//Manejo de los Middlewares por parte de express, es importante el orden de los mismos
//Primero mandamos el LogErrors y despues el errorHandler

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

//Estaticos
app.use('/app',express.static('public'));
app.use('/images',express.static('uploads'));

//Arrancamos en el puerto declarado
httpServer.listen(port,()=>{
  console.log('Mi port:' + port);
});
