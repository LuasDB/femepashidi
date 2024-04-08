//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db,server }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");
//Traemos nodemailer para los correos automaticos
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


const categories = {
  4:`PRE-INFANTIL 'A'`,
  5:`PRE-INFANTIL 'B'`,
  6:`PRE-INFANTIL 'B'`,
  7:`INFANTIL 'A'`,
  8:`INFANTIL 'A'`,
  9:`INFANTIL 'B'`,
  10:`INFANTIL 'B'`,
  11:`INFANTIL 'C'`,
  12:`INFANTIL 'C'`,
  13:`JUVENIL 'A'`,
  14:`JUVENIL 'A'`,
  15:`JUVENIL 'B'`,
  16:`JUVENIL 'B'`,
  17:`JUVENIL 'c'`,
  18:`JUVENIL 'c'`,
  19:`MAYOR`,
  29:`ADULTO`,

}



// const categories = {
//   2:`A`,
//   3:`A`,
//   4:`A`,
//   5:`A`,
//   6:`B`,
//   7:`B`,
//   8:`B`,
//   9:`B`,
//   10:`C`,
//   11:`C`,
//   12:`C`,
//   13:`C`,
//   14:`C`,
//   15:`D`,
//   16:`D`,
//   17:`D`,
//   18:`D`,
//   19:`D`,
//   20:`MAYOR`,
//   28:`ADULTO`,
// }


const verifyCategory=(fecha_nacimiento)=>{
  const fecha = new Date(fecha_nacimiento);
  const hoy = new Date();
  const diferenciaMilisegundos = hoy - fecha;
  let edadExacta = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));
  console.log('Edad exacta',edadExacta)

  const diaNacimiento = fecha.getDate();
  const mesNacimiento = fecha.getMonth();

  const diaActual = hoy.getDate();
  const mesActual = hoy.getMonth();

  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edadExacta++;
  }



  console.log('ED',edadExacta)
  let verificacion = edadExacta;
    if(edadExacta >= 29){
      verificacion=29;
    }else if (edadExacta >= 19){
      verificacion=19;

    }
    console.log(categories[verificacion])

    return categories[verificacion];

}


//Creamos una clase para la gestión de usuarios
class User {
  constructor(){

  }

  async create(data,img_name){

    data['img']=img_name;
    const id_association = data.id_asociacion;

    const asociacion = await getDoc(doc(db,'associations',id_association));
    data['asociacion']=asociacion.data();
    data['verificacion']=false;
    const categoria = verifyCategory(data.fecha_nacimiento);
    data['categoria']=`${categoria}`;
    const res = await addDoc(collection(db,'users'),data);
    if(res.id){
      const destinatario=data.asociacion.correo;
      const usuarioMail = data.correo;

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
        <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
          <h2 style="
          color:#268dee;">${data.asociacion.representante.toUpperCase()}</h2>
          <p style="
          color:#333;">FEMEPASHIDI esta enviando esta solicitud para registrar al siguiente participante como parte de su asociación.</p>
          <p style="
          color:#333;">Nombre: ${data.nombre}  ${data.apellido_paterno} ${data.apellido_materno}</p>
          <p style="
          color:#333;">Nivel: ${data.nivel_actual}</p>
          <p style="
          color:#333;">Categoria: ${data.categoria}</p>
          <p style="
          color:#333;">Fecha de nacimeinto: ${data.fecha_nacimiento}</p>
          <p style="
          color:#333;">Es necesario que dé su Visto Bueno para que esta solicitud sea enviada al Presidente de FEMEPASHIDI</p>
            <a href="${server}api/v1/users/verification/${data.curp}/true" target="_self">
              <img style="width:200px;" src="cid:aceptarImg" alt="Imagen Adjunta">
            </a>
            <a href="${server}api/v1/users/verification/${data.curp}/false" target="_self">
              <img style="width:200px;" src="cid:rechazarImg" alt="Imagen Adjunta">
            </a>
            <p style="
            color:#333;">Una vez realizada la autorización se notificara al participante que se acepto su registro</p>
            <p style="
            color:#333;">Saludos,</p>
            <p style="
            color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
            <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
          </div>
      </body>
      </html>


      `;
      const contenidoHtmlUsuario = `
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
        <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
          <h2 style="
          color:#268dee;">${data.nombre.toUpperCase()} ${data.apellido_paterno.toUpperCase()} ${data.apellido_materno.toUpperCase()}</h2>
          <p style="color:#333;">FEMEPASHIDI ha recibido y esta gestionando tu solicitud de registro en nuestra plataforma. </p>
          <p style="color:#333;">En cuanto se autorice por parte del presidente de tu asociación te enviaremos un correo notificando tu aceptación para que puedas inscribirte a las competencias vigentes.</p>
          <p style="color:#333;">Te pedimos estes pendiente de tu correo.</p>

          <p style="
          color:#333;">Saludos,</p>
          <p style="
          color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
          <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
          </div>
      </body>
    </html>
      `;
      // Opciones del correo
      const opcionesCorreo = {
      // from:'luasjcr.3543@gmail.com',
      from:'registros@femepashidi.com.mx',
      to: destinatario,
      subject: 'SOLICITUD DE REGISTRO FEMEPASHIDI A.C.',
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
          },
          {
            filename: 'encabezado.png',  // Nombre del archivo adjunto
            path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
            cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
            }
    ]
      };

      // Opciones del correo
      const opcionesCorreoUsuario = {
        from:'registros@femepashidi.com.mx',
        to: usuarioMail,
        subject: 'Registro FEMEPASHIDI A.C.',
        html: contenidoHtmlUsuario,
        attachments:[
            {
              filename: 'encabezado.png',  // Nombre del archivo adjunto
              path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
              cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
              }
      ]
        };
      // Enviar el correo a la asociación
      transporter.sendMail(opcionesCorreo, (error, info) => {
        console.log('[ERROR MAIL ASOCIACION]',error);
        console.log(info);
      });

      transporter.sendMail(opcionesCorreoUsuario, (error, info) => {
        console.log('[ERROR MAIL USUARIO]',error);
        console.log(info);
      });


    }
    return {message:'Creado',id:res.id,data:data }
  }
  async findAll(){
    const resfirebase = await getDocs(collection(db,'users'));
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
    const q = query(collection(db,'users'),where('curp','==',id));
    const res = await getDocs(q);
    let documents = []
    res.forEach(item =>{
      let obj ={}
      obj['id']=item.id;
      obj['data']=item.data();
      documents.push(obj);
    })
    if(documents.length === 0){
      throw boom.notFound('Usuario no encontrado');
    }
    //Actualizar categoria
    const categoria=verifyCategory(documents[0].data.fecha_nacimiento);
    documents[0].data['categoria']=categoria;
    await this.update(documents[0].data.curp,{categoria:categoria});
    const nombre_imagen =documents[0].data.img;
    const imagen = `${server}images/users/${nombre_imagen}`;

    return { message:'UNO', documents,img:imagen}
  }
  async verification(curp,status){

    const user = await this.findOne(curp);
    if(user.documents[0].data.verificacion){
      console.log('YA REGISTRADO');
      return { message: 'Ya registrado'}

    }else{
      console.log('SE ENVIA CORREO');
      let boolValue = true;
      if(status === 'false'){ boolValue = false;};
      const data = { verificacion:boolValue}
      await this.update(curp,data);

      const destinatario=user.documents[0].data.correo;

      let contenidoHtmlUsuario='';
      // Opciones del correo
      let opcionesCorreo = {
        from:'registros@femepashidi.com.mx',
        to: destinatario,
        subject: '',
        html: contenidoHtmlUsuario,
        attachments:[
          {
            filename: 'encabezado.png',  // Nombre del archivo adjunto
            path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
            cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
            },
            {
              filename: 'registro.png',  // Nombre del archivo adjunto
              path: './uploads/others/registro.png',  // Ruta a la imagen en tu sistema
              cid: 'registroImg'  // Identificador único para la imagen, usado en el contenido HTML
              }
      ]
        };



      if(boolValue){
        // Contenido HTML del correo
        contenidoHtmlUsuario = `
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
          <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
            <h2 style="
            color:#268dee;">FELICIDADES ${user.documents[0].data.nombre.toUpperCase()} ${user.documents[0].data.apellido_paterno.toUpperCase()} ${user.documents[0].data.apellido_materno.toUpperCase()}!</h2>
            <p style="color:#333;">Se ha confirmado tu registro en nuestra plataforma!!!! </p>
            <p style="color:#333;">Accede al siguiente link y accede con tu CURP para poder inscribirte a nuestras competencias vigentes!</p>

            <a href="https://www.femepashidi.com.mx/inicio/registro/" target="_self">
                <img style="width:200px;" src="cid:registroImg" alt="Imagen Adjunta">
              </a>





            <p style="
            color:#333;">Saludos,</p>
            <p style="
            color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
            <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
            </div>
        </body>
        </html>


        `;
         // Opciones del correo
          opcionesCorreo['subject'] = 'ACEPTACION DE REGISTRO FEMEPASHIDI A.C.';
          opcionesCorreo['html'] =contenidoHtmlUsuario
      }else{
        // Opciones del correo
        opcionesCorreo['subject'] = 'REGISTRO RECHAZADO FEMEPASHIDI A.C.'
          // Contenido HTML del correo
         contenidoHtmlUsuario = `
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
            <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
              <h2 style="
              color:#268dee;"> ${user.documents[0].data.nombre.toUpperCase()} ${user.documents[0].data.apellido_paterno.toUpperCase()} ${user.documents[0].data.apellido_materno.toUpperCase()}</h2>
              <p style="color:#333;">Lamentamos informarte que se rechazo tu registro a nuestra plataforma</p>
              <p style="color:#333;">Contacta a tu asociación para mas informes</p>

              <a href="${server}app/registro/" target="_self">
                  <img style="width:200px;" src="cid:registroImg" alt="Imagen Adjunta">
                </a>





             <p style="
              color:#333;">Saludos,</p>
              <p style="
              color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
              <a href="https://www.femepashidi.com.mx/">https://www.femepashidi.com.mx/</a>
              </div>
          </body>
          </html>


          `;
          opcionesCorreo['html'] =contenidoHtmlUsuario

      }

       // Enviar el correo a la asociación
       transporter.sendMail(opcionesCorreo, (error, info) => {
        console.log('[ERROR MAIL ASOCIACION]',error);
        console.log(info);
      });
      return { message:'verificado'}

    }



  }
  async update(id,data){
    const q = query(collection(db,'users'),where('curp','==',id));
    const res = await getDocs(q);
    let obj ={}
    res.forEach(item=>{
      obj['id']=item.id;
      obj['data']=item.data();
    })
    console.log(obj);
    console.log(data);
    let copy = obj['data'];
    obj['data']={
      ...copy,
      ...data}
    const actualizarUsuario = await updateDoc(doc(db,'users',obj.id),obj.data);
    return {actualizarUsuario}

  }
  async delete(id){


    await deleteDoc(doc(db,'users',id));


    return {message:'Eliminado'}
  }
  async validateExist(curp){
    const q = query(collection(db,'users'),where('curp','==',curp.toUpperCase()))
    const res = await getDocs(q);
    let respuesta=false;

    res.forEach(element=>{
      const curpQ=element.data().curp;
      console.log('query:', curpQ);
      console.log('curp:',curp);
      if(curpQ.toUpperCase() === curp.toUpperCase()){
        respuesta=true;
      }
    })
    return { resultado:respuesta }

  }
}

module.exports = { User }
