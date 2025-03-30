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
      user: process.env.EMAIL_USER, // Reemplaza con tu dirección de correo electrónico
      pass:process.env.EMAIL_PASS // Reemplaza con tu contraseña de correo electrónico
  }
  // service: 'gmail',
  // auth: {
  //     user:'luasjcr.3543@gmail.com',
  //     pass:'fyzb llwd vqrv epaa'
  //}
});
function fechaLarga(fecha){
  const meses = {
    0:'ENERO',
    1:'FEBRERO',
    2:'MARZO',
    3:'ABRIL',
    4:'MAYO',
    5:'JUNIO',
    6:'JULIO',
    7:'AGOSTO',
    8:'SEPTIEMBRE',
    9:'OCTUBRE',
    10:'NOVIEMBRE',
    11:'DICIEMBRE'
}
  const e = fecha.split('-');
  console.log(e)
  const f = new Date(e[0],e[1]-1,e[2]);
  console.log(`${f.getDate()} DE ${meses[f.getMonth()]} DE ${f.getFullYear()} `)
  return `${f.getDate()} DE ${meses[f.getMonth()]} DE ${f.getFullYear()} `;
}

//Creamos una clase para la gestión de usuarios
class Register {
  constructor(){

  }
  async create(data){


    const { id_user, id_association,id_events,fecha_solicitud,status, nivel_actual,categoria} = data;
    const users = await db.collection('femepashidi').doc('users').get()
    if(!users.exists){
      return {message:'No hay usuarios',success:false}
    }
    const user = users.data().usersList.filter(item=>item.id === id_user)[0]
    console.log('EL USUARIO ES',user)

    const associations = await db.collection('femepashidi').doc('associations').get()
    if(!associations.exists){
      return {message:'No hay asociaciones',success:false}
    }
    const association = associations.data().associationsList.filter(item=>item.id === id_association)[0]
    console.log('LA ASOCIACION ES',association)
    const events = await db.collection('femepashidi').doc('events').get()
    if(!events.exists){
      return {message:'No hay eventos',success:false}
    }
    const event = events.data().eventsList.filter(item=>item.id === id_events)[0]


    const register ={
      user:{id:id_user,...user},
      association:{id:id_association,...association},
      event:{id:id_events,...event},
      fecha_solicitud,
      status,nivel_actual,categoria
    }
    if(user.verificacion === 'true' || user.verificacion === true || !user.verificacion){
      const isRegisterd = await db.collection('register').where('user.id','==',id_user).where('event.nombre','==',event.nombre).get()
      if(!isRegisterd.empty){
        return {message:'Ya estas registrado en este evento',success:false}
      }
      const res = await db.collection('register').add(register);
      if(res.id){
        const destinatario=user.correo;
        console.log(res.id)

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
            color:#268;">HOLA ${user.nombre}</h2>

          <p style="
          color:#333;">Recibimos tu solicitud de inscripcion para la competencia ${event.nombre} que se llevará a cabo del ${fechaLarga(event.fecha_inicio)} al ${fechaLarga(event.fecha_fin)}</p>
          <p style="
          color:#333;">Haz click en el siguiente boton para confirmar tu inscripción y continuar con tu proceso</p>

            <a href="${server}api/v1/register/confirmation/${res.id}" target="_self"
            style="
            width: 50%;
            padding: 10px;
            background-color:#268dee;
            border-radius: 1rem;
            color: #f0f0f0;
            text-decoration: none;
            text-align: center;">
              CONFIRMAR MI Inscripción
            </a>
          </div>
          <br>
          <p style="
          color:#333;">Una vez que confirmes tu inscripción tendras que esperar a que te enviemos un correo confirmando la aceptación por parte del presidente de tu asociación. Te recomendamos estar pendiente de tu correo</p>


          <p style="
          color:#333;">
           Por favor, no responda a este correo electrónico, ya que no podemos responder a los mensajes enviados a esta dirección. Para cualquier consulta, póngase en contacto con su asociación o con su entrenador.
           </p>




        </body>
        </html>


        `;
        // Opciones del correo
        const opcionesCorreo = {
        from:'registros@femepashidi.com.mx',
        to: destinatario,
        subject: 'Inscripcion a competencia FEMEPASHIDI A.C.',
        html: contenidoHtml
        };
        // Enviar el correo
        transporter.sendMail(opcionesCorreo, (error, info) => {
          if(error){
            console.log('Error al enviar el correo:', error);
          }
          else{
            console.log('Correo enviado:', info.response);
          }

        });
      }
      return {message:'Creado',id:res.id, success:true}
    }else{
      return {message:'Este usuario no ha sido autorizado en el registro a nuestra plataforma, contacte a su asociación',success:false}
    }

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
    try {
      const register = await db.collection('register').doc(id).get()
      if(!register.exists){
        return {message:'No existe el registro',success:false}
      }

      return {id:register.id,...register.data()}
    } catch (error) {
      return {success:false,message:error}
    }
  }
  async update(id,data){
    try {

      const update = await db.collection('register').doc(id).update(data)
      return{ success:true}
    } catch (error) {
      return { success:false,message:error}
    }



  }
  async delete(id){
    try {
      await db.collection('register').doc(id).delete()
      return {success:true,message:'Registro eliminado'}
    } catch (error) {
      return { success:false, message: 'No se puede eliminar'}
    }
  }

  async confirmate(id){
    const registro = await db.collection('register').doc(id).get()

    let obj=registro.data();

    console.log('En confirmate',obj)



    if(obj.confirmado){
      console.log('YA ESTABA CONFIRMADO NO SE ENVIA CORREO');
      return {message:'Ya confirmado'}
    }
    if(obj && obj.status === 'Preinscrito'){
      obj['confirmado']='confirmado';
      const res = await this.update(id,{confirmado:'confirmado'});
      if(!res.success){
        return {success:false}
      }
      const destinatario=registro.data().association.correo;

      // Contenido HTML del correo
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
        color:#333;">${registro.data().event.nombre} que se llevará a cabo del ${fechaLarga(registro.data().event.fecha_inicio)} al ${fechaLarga(registro.data().event.fecha_fin)}</p>
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

    await this.update(id,{status:status});

    const destinatario=register.user.correo;

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
          color:#268;">FELICIDADES ${register.user.nombre.toUpperCase()}</h2>

        <p style="
        color:#333;">Nos complace informarte que se ha aceptada tu inscripción para competir en:</p>

        <p style="
        color:#333;">${register.event.nombre} que se llevará a cabo del ${fechaLarga(register.event.fecha_inicio)} al ${fechaLarga(register.event.fecha_fin)}</p>
        <p style="
        color:#333;">En el nivel : ${register.nivel_actual} categoria  ${register.categoria}</p>
        </div>
        <p>
        Por favor, no responda a este correo electrónico, ya que no podemos responder a los mensajes enviados a esta dirección. Para cualquier consulta, póngase en contacto con su asociación o con su entrenador.
        </p>

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
  async findOneByName(name){
    try {
      console.log('EN EL PUNTO',name)
      const events =await db.collection('register').where('event.nombre','==',name).get()
      if(events.empty){
        return null
      }
      const data = events.docs.map(item=>({id:item.id,...item.data()}))
      return [...data];
    } catch (error) {
      console.log('EL ERROR ES',error)
      return { success:false,message:error}
    }
  }
}

module.exports = { Register }
