//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db,server }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");
const nodemailer = require('nodemailer');
// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  host: 'mail.femepashidi.com.mx', // Reemplaza 'tudominio.com' con el nombre de tu servidor SMTP
  port: 465, // Puerto SMTP seguro (reemplaza con el puerto adecuado)
  secure: true, // Habilitar SSL/TLS
  auth: {
      user: 'registros@femepashidi.com.mx', // Reemplaza con tu dirección de correo electrónico
      pass: 'Registros2024@' // Reemplaza con tu contraseña de correo electrónico
  }
  // service: 'gmail',
  // auth: {
  //     user:'luasjcr.3543@gmail.com',
  //     pass:'fyzb llwd vqrv epaa'
  //}
});

//Creamos una clase para la gestión de usuarios
class Register {
  constructor(){

  }
  async create(data){
    const { id_user, id_association,id_events,fecha_solicitud,status, nivel_actual,categoria} = data;
    const user = await getDoc(doc(db,'users',id_user));
    const association = await getDoc(doc(db,'associations',id_association));
    const event =await getDoc(doc(db,'events',id_events));
    const res = await addDoc(collection(db,'register'),{
      user:user.data(),
      association:association.data(),
      event:event.data(),
      fecha_solicitud,
      status,nivel_actual,categoria
    });
    if(res.id){
      const destinatario=user.data().correo;

      // Contenido HTML del correo al Competidor
      const contenidoHtml = `
      <!DOCTYPE html>
      <html lang="es">

      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
          :root{
            --primary-color-r:#268dee;
            --background-input:#f0f0f0;
            --font-input:#333;
          }
          body{
            font-family: 'Nunito', sans-serif;
          }
          a:hover{
            color:red;
          }
          .container{
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;"
          }

            </style>
      </head>
      <body>
        <div class="container">
          <h2 style="
          color:#268;">HOLA ${user.data().nombre}</h2>

        <p style="
        color:#333;">Recibimos tu solicitud de registro para la copetencia ${event.data().nombre} que se llevará a cabo el proximo ${event.data().fecha_larga}</p>
        <p style="
        color:#333;">Haz click en el siguiente boton para confirmar tu registro y continuar con tu proceso</p>

          <a href="${server}api/v1/register/confirmation/${res.id}" target="_self"
          style="
          width: 50%;
          padding: 10px;
          background-color:#268dee;
          border-radius: 1rem;
          color: #f0f0f0;
          text-decoration: none;
          text-align: center;">
            CONFIRMAR MI REGISTRO
          </a>
        </div>
        <br>
        <p style="
        color:#333;">Una vez que confirmes tu registro tendras que esperar a que te enviemos un correo confirmando la aceptación por parte del presidente de tu asociación. Te recomendamos estar pendiente de tu correo</p>


      </body>
      </html>


      `;
      // Opciones del correo
      const opcionesCorreo = {
      from:'registros@femepashidi.com.mx',
      to: destinatario,
      subject: 'Registro a competencia FEMEPASHIDI A.C.',
      html: contenidoHtml
      };
      // Enviar el correo
      transporter.sendMail(opcionesCorreo, (error, info) => {


      });
    }
    return {message:'Creado',id:res.id}
  }
  async findAll(){
    const resfirebase = await getDocs(collection(db,'register'));
    if(!resfirebase){
      throw boom.notFound('No se encontraron usuarios');
    }
    let documents =[]
    resfirebase.forEach(item =>{
      let obj={}
      obj['id']=item.id;
      obj['data']=item.data();
      documents.push(obj);
    })

    return {
      message:'TODOS',documents
    }
  }
  async findOne(id){
    const q = doc(db,'register',id);
    const document = await getDoc(q);

    if(document.exists()){
    return { message:'UNO', data:document.data()}

    }else{
      throw boom.notFound('Usuario no encontrado');
    }
  }
  async update(id,data){
    const q = doc(db,'register',id);
    const document = await getDoc(q);
    if(document.exists()){
      let obj ={}
      obj['data']=document.data();
      let copy = obj['data'];
      obj['data']={
        ...copy,
        ...data
      }
      const actualizar = await updateDoc(doc(db,'register',id),obj.data);
      return {actualizar}

    }else{
      throw boom.notFound('No se encontro la asociacion');
    }



  }
  async delete(id){
    const q = doc(db,'register',id);
    const eleiminar=await deleteDoc(q);
    return {message:'Eliminado',id,eleiminar}
  }

  async confirmate(id){
    const registro = await getDoc(doc(db,'register',id));
    console.log(registro.data())
    if(registro.data()){

      const destinatario=registro.data().association.correo;

      // Contenido HTML del correo al Competidor
      const contenidoHtml = `
      <!DOCTYPE html>
      <html lang="es">

      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
          :root{
            --primary-color-r:#268dee;
            --background-input:#f0f0f0;
            --font-input:#333;
          }
          body{
            font-family: 'Nunito', sans-serif;
          }
          a:hover{
            color:red;
          }
          .container{
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;"
          }

            </style>
      </head>
      <body>
        <div class="container">
          <h2 style="
          color:#268;">BUEN DÍA ${registro.data().association.representante.toUpperCase()}</h2>

        <p style="
        color:#333;">El deportista  ${registro.data().user.nombre}  ${registro.data().user.apellido_paterno} ${registro.data().user.apellido_materno} envía esta solicitud para competir en:</p>

        <p style="
        color:#333;">${registro.data().event.nombre} que se llevará a cabo el proximo ${registro.data().event.fecha_larga}</p>
        <p style="
        color:#333;">En el nivel : ${registro.data().nivel_actual} categoria  ${registro.data().categoria}</p>
        <p style="
        color:#333;">Es necesario que dé su Visto Bueno para que esta solicitud sea enviada al presidente de FEMEPASHIDI:</p>
        <br>

        <a href="${server}api/v1/register/approval/${id}/aprobado" target="_self">
          <img style="width:200px;" src="cid:aceptarImg" alt="Imagen Adjunta">
        </a>
        <br>
        <a href="${server}api/v1/register/approval/${id}/rechazado" target="_self">
          <img style="width:200px;" src="cid:rechazarImg" alt="Imagen Adjunta">
        </a>

        </div>

      </body>
      </html>
      `;
      // Opciones del correo
      const opcionesCorreo = {
      from:'registros@femepashidi.com.mx',
      to: destinatario,
      subject: 'SOLICITUD DE INSCRIPCIÓN A COMPETENCIA FEMEPASHIDI A.C.',
      html: contenidoHtml,
      attachments:[
        {
        filename: 'ACEPTAR.png',  // Nombre del archivo adjunto
        path: './uploads/others/ACEPTAR.png',  // Ruta a la imagen en tu sistema
        cid: 'aceptarImg'  // Identificador único para la imagen, usado en el contenido HTML
        },
        {
          filename: 'RECHAZAR.png',  // Nombre del archivo adjunto
          path: './uploads/others/RECHAZAR.png',  // Ruta a la imagen en tu sistema
          cid: 'rechazarImg'  // Identificador único para la imagen, usado en el contenido HTML
          }]
      };
      // Enviar el correo
      transporter.sendMail(opcionesCorreo, (error, info) => {


      });
      return {message:'Correo enviado'}



    }
  }
  async approval(params){
    const { id, status } = params;
    const register =await this.findOne(id)
    console.log(register)
    this.update(id,{status:status});

    const destinatario=register.data.user.correo;

      // Contenido HTML del correo al Competidor
      const contenidoHtml = `
      <!DOCTYPE html>
      <html lang="es">

      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
          :root{
            --primary-color-r:#268dee;
            --background-input:#f0f0f0;
            --font-input:#333;
          }
          body{
            font-family: 'Nunito', sans-serif;
          }
          a:hover{
            color:red;
          }
          .container{
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: center;"
          }

            </style>
      </head>
      <body>
        <div class="container">
          <h2 style="
          color:#268;">FELICIDADES ${register.data.user.nombre.toUpperCase()}</h2>

        <p style="
        color:#333;">Nos complace informarte que se ha aceptado tu registro para competir en:</p>

        <p style="
        color:#333;">${register.data.event.nombre} que se llevará a cabo el proximo ${register.data.event.fecha_larga}</p>
        <p style="
        color:#333;">En el nivel : ${register.data.user.nivel_actual} categoria  ${register.data.user.categoria}</p>


        </div>

      </body>
      </html>
      `;
      // Opciones del correo
      const opcionesCorreo = {
      from:'registros@femepashidi.com.mx',
      to: destinatario,
      subject: 'ACEPTACIÓN DE INSCRIPCIÓN A COMPETENCIA FEMEPASHIDI A.C.',
      html: contenidoHtml
      };
      // Enviar el correo
      transporter.sendMail(opcionesCorreo, (error, info) => {


      });
      return {message:'Correo enviado'}




  }
}

module.exports = { Register }
