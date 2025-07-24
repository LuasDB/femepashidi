const { db,server } = require('../db/firebase')
const nodemailer = require('nodemailer');
const { generateUID } = require('./../functions/generales')




// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  host: 'mail.femepashidi.com.mx', // Reemplaza 'tudominio.com' con el nombre de tu servidor SMTP
  port: 465, // Puerto SMTP seguro (reemplaza con el puerto adecuado)
  secure: true, // Habilitar SSL/TLS
  auth: {
      user: process.env.EMAIL_USER, // Reemplaza con tu dirección de correo electrónico
      pass: process.env.EMAIL_PASS // Reemplaza con tu contraseña de correo electrónico
  }

});

const categories = {
  2:`PRE-INFANTIL A`,
  3:`PRE-INFANTIL A`,
  4:`PRE-INFANTIL A`,
  5:`PRE-INFANTIL B`,
  6:`PRE-INFANTIL B`,
  7:`INFANTIL A`,
  8:`INFANTIL A`,
  9:`INFANTIL B`,
  10:`INFANTIL B`,
  11:`INFANTIL C`,
  12:`INFANTIL C`,
  13:`JUVENIL A`,
  14:`JUVENIL A`,
  15:`JUVENIL B`,
  16:`JUVENIL B`,
  17:`JUVENIL C`,
  18:`JUVENIL C`,
  19:`MAYOR`,
  29:`ADULTO`,
}
// const categories = {
//   4:`PRE-INFANTIL 'A'`,
//   5:`PRE-INFANTIL 'B'`,
//   6:`PRE-INFANTIL 'B'`,
//   7:`INFANTIL 'A'`,
//   8:`INFANTIL 'A'`,
//   9:`INFANTIL 'B'`,
//   10:`INFANTIL 'B'`,
//   11:`INFANTIL 'C'`,
//   12:`INFANTIL 'C'`,
//   13:`JUVENIL 'A'`,
//   14:`JUVENIL 'A'`,
//   15:`JUVENIL 'B'`,
//   16:`JUVENIL 'B'`,
//   17:`JUVENIL 'c'`,
//   18:`JUVENIL 'c'`,
//   19:`MAYOR`,
//   29:`ADULTO`,

// }



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
  console.log('Estro bien')
  const fecha = new Date(fecha_nacimiento);
  const hoy = new Date();
  const diferenciaMilisegundos = hoy - fecha;
  let edadExacta = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));
  console.log('Edad exacta',edadExacta);

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
    this.collection = 'femepashidi'
    this.document = 'users'
  }

  // async create(data){



  //   try {
  //     const searchOne = await this.getByCurp(data.curp)

  //     if(searchOne.length > 0){
  //     return {success:false}

  //     }

  //     const asociacion = await db.collection('associations').doc(data.id_asociacion).get()


  //     if(!asociacion.exists){
  //       return null
  //     }
  //     data['asociacion'] = {id:asociacion.id,...asociacion.data()}
  //     data['categoria']=verifyCategory(data.fecha_nacimiento);

  //     const newDoc = await db.collection(this.collection).add(data)
  //     if(newDoc.id){
  //       console.log('Creado con :',newDoc.id)
  //       console.log('OBJETO :',data)
  //       const destinatario=data.asociacion.correo;
  //       const usuarioMail = data.correo;
  //       console.log('Dest 1:',destinatario)
  //       console.log('Dest 2:',usuarioMail)

  //        // Contenido HTML del correo
  //     const contenidoHtml = `
  //     <!DOCTYPE html>
  //     <html lang="es">
  //     <head>
  //       <meta charset="UTF-8">
  //       <style>
  //         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
  //         :root{
  //           --primary-color-r:#268dee;
  //           --background-input:#f0f0f0;
  //           --font-input:#333;
  //         }
  //         body{
  //           font-family: 'Nunito', sans-serif;
  //         }

  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           width: 100%;
  //           justify-content: center;
  //           align-items: center;"
  //         }

  //           </style>
  //     </head>
  //     <body>


  //       <div class="container">
  //       <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
  //         <h2 style="
  //         color:#268dee;">${data.asociacion.representante.toUpperCase()}</h2>
  //         <p style="
  //         color:#333;">FEMEPASHIDI esta enviando esta solicitud para registrar al siguiente participante como parte de su asociación.</p>
  //         <p style="
  //         color:#333;">Nombre: ${data.nombre}  ${data.apellido_paterno} ${data.apellido_materno}</p>
  //         <p style="
  //         color:#333;">Nivel: ${data.nivel_actual}</p>
  //         <p style="
  //         color:#333;">Categoria: ${data.categoria}</p>
  //         <p style="
  //         color:#333;">Fecha de nacimeinto: ${data.fecha_nacimiento}</p>
  //         <p style="
  //         color:#333;">Es necesario que dé su Visto Bueno para que esta solicitud sea enviada al Presidente de FEMEPASHIDI</p>
  //           <a href="${server}api/v1/users/verification/${data.curp}/true" target="_self">
  //             <img style="width:200px;" src="cid:aceptarImg" alt="Imagen Adjunta">
  //           </a>
  //           <a href="${server}api/v1/users/verification/${data.curp}/false" target="_self">
  //             <img style="width:200px;" src="cid:rechazarImg" alt="Imagen Adjunta">
  //           </a>
  //           <p style="
  //           color:#333;">Una vez realizada la autorización se notificara al participante que se acepto su registro</p>
  //           <p style="
  //           color:#333;">Saludos,</p>
  //           <p style="
  //           color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
  //           <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
  //         </div>
  //     </body>
  //     </html>


  //     `;
  //     const contenidoHtmlUsuario = `
  //     <!DOCTYPE html>
  //     <html lang="es">
  //     <head>
  //       <meta charset="UTF-8">
  //       <style>
  //         @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
  //         :root{
  //           --primary-color-r:#268dee;
  //           --background-input:#f0f0f0;
  //           --font-input:#333;
  //         }
  //         body{
  //           font-family: 'Nunito', sans-serif;
  //         }

  //         .container{
  //           display: flex;
  //           flex-direction: column;
  //           width: 100%;
  //           justify-content: center;
  //           align-items: center;"
  //         }

  //           </style>
  //     </head>
  //     <body>
  //       <div class="container">
  //       <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
  //         <h2 style="
  //         color:#268dee;">${data.nombre.toUpperCase()} ${data.apellido_paterno.toUpperCase()} ${data.apellido_materno.toUpperCase()}</h2>
  //         <p style="color:#333;">FEMEPASHIDI ha recibido y esta gestionando tu solicitud de registro en nuestra plataforma. </p>
  //         <p style="color:#333;">En cuanto se autorice por parte del presidente de tu asociación te enviaremos un correo notificando tu aceptación para que puedas inscribirte a las competencias vigentes.</p>
  //         <p style="color:#333;">Te pedimos estes pendiente de tu correo.</p>

  //         <p style="
  //         color:#333;">Saludos,</p>
  //          <p style="
  //       color:#333;">
  //        Por favor, no responda a este correo electrónico, ya que no podemos responder a los mensajes enviados a esta dirección. Para cualquier consulta, póngase en contacto con su asociación o con su entrenador.
  //        </p>

  //         <p style="
  //         color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
  //         <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
  //         </div>
  //     </body>
  //   </html>
  //     `;

  //     const opcionesCorreo = {

  //     from:process.env.EMAIL_USER,
  //     to: destinatario,
  //     subject: 'SOLICITUD DE REGISTRO FEMEPASHIDI A.C.',
  //     html: contenidoHtml,
  //     attachments:[
  //       {
  //       filename: 'ACEPTAR.png',  // Nombre del archivo adjunto
  //       path: './uploads/others/ACEPTAR.png',  // Ruta a la imagen en tu sistema
  //       cid: 'aceptarImg'  // Identificador único para la imagen, usado en el contenido HTML
  //       },
  //       {
  //         filename: 'RECHAZAR.png',  // Nombre del archivo adjunto
  //         path: './uploads/others/RECHAZAR.png',  // Ruta a la imagen en tu sistema
  //         cid: 'rechazarImg'  // Identificador único para la imagen, usado en el contenido HTML
  //         },
  //         {
  //           filename: 'encabezado.png',  // Nombre del archivo adjunto
  //           path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
  //           cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
  //           }
  //   ]
  //     };

  //     // Opciones del correo
  //     const opcionesCorreoUsuario = {
  //       from:process.env.EMAIL_USER,
  //       to: usuarioMail,
  //       subject: 'Registro FEMEPASHIDI A.C.',
  //       html: contenidoHtmlUsuario,
  //       attachments:[
  //           {
  //             filename: 'encabezado.png',  // Nombre del archivo adjunto
  //             path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
  //             cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
  //             }
  //     ]
  //       };
  //     // Enviar el correo a la asociación
  //     await transporter.sendMail(opcionesCorreo, (error, info) => {
  //      console.log('[ERROR 1]',error)
  //      console.log('[INFO 1]',info)
  //     });
  //     await transporter.sendMail(opcionesCorreoUsuario, (error, info) => {
  //       console.log('[ERROR 2]',error)
  //       console.log('[INFO 2]',info)
  //     });


  //     return {
  //       success:true,id:newDoc.id
  //     }
  //     }

  //   } catch (error) {
  //     return { dataError:error, message: 'se envia falla'};
  //   }
  // }

  async create(data){

    try {
      const searchOne = await this.getByCurp(data.curp)

      if(searchOne.length > 0){
      throw new Error('El usuario ya existe')

      }

      const asociaciones = await db.collection(this.collection).doc('associations').get()
      const asociacion = asociaciones.data().associationsList.filter(item => item.id === data.id_asociacion)

      // if(!asociacion.exists){
      //   return null
      // }
      data['asociacion'] = {...asociacion[0]}
      data['categoria']=verifyCategory(data.fecha_nacimiento);
      data['id'] = generateUID(20)

      const getUsers = await db.collection(this.collection).doc(this.document).get()
      const list = getUsers.data().usersList
      list.push(data)
      await db.collection(this.collection).doc(this.document).update({
        usersList:list
      })

      const destinatario=data.asociacion.correo;
      const usuarioMail = data.correo;






    //   const newDoc = await db.collection(this.collection).add(data)
    //   if(newDoc.id){
    //     console.log('Creado con :',newDoc.id)
    //     console.log('OBJETO :',data)
    //     const destinatario=data.asociacion.correo;
    //     const usuarioMail = data.correo;
    //     console.log('Dest 1:',destinatario)
    //     console.log('Dest 2:',usuarioMail)

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
        color:#333;">
         Por favor, no responda a este correo electrónico, ya que no podemos responder a los mensajes enviados a esta dirección. Para cualquier consulta, póngase en contacto con su asociación o con su entrenador.
         </p>

          <p style="
          color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
          <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
          </div>
      </body>
    </html>
      `;

      const opcionesCorreo = {

      from:process.env.EMAIL_USER,
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
        from:process.env.EMAIL_USER,
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
      await transporter.sendMail(opcionesCorreo, (error, info) => {
       console.log('[ERROR 1]',error)
       console.log('[INFO 1]',info)
      });
      await transporter.sendMail(opcionesCorreoUsuario, (error, info) => {
        console.log('[ERROR 2]',error)
        console.log('[INFO 2]',info)
      });

      return { data,success:true}


    //   return {
    //     success:true,id:newDoc.id
    //   }
    //   }


    } catch (error) {
      console.log('[ERROR]',error)
      return { dataError:error, message: 'se envia falla'};
    }
  }

  async getAll(){

    // try {
    //   const docs = await db.collection(this.collection).get();
    //   if(docs.empty){
    //     return null
    //   }
    //   const data = docs.docs.map(item=>({id:item.id,...item.data()}))
    //   return [...data];
    // } catch (error) {
    //   throw new Error(`Algo salio mal al obtener los registros: ${error.message}`);
    // }

    try {
      const getAll = await db.collection(this.collection).doc(this.document).get()
      if(!getAll.exists){
        return null
      }
      return [...getAll.data().usersList]
    } catch (error) {
      throw new Error(`Algo salio mal al obtener los registros: ${error.message}`);
    }
  }

  async getByCurp(curp){

    // try {
    //   const doc = await db.collection(this.collection).where('curp','==',curp).get();
    //   let userData = []
    //   if(doc.docs.length > 0){
    //     userData = doc.docs.map(item=>({id:item.id, ...item.data()}))
    //   }
    //   return [...userData]

    // } catch (error) {
    //   throw new Error(`Algo salio mal al obtener el registro:${error.message}`);
    // }

    //Nueva versión
    try {
      console.log('CURP:',curp)


      const skater = await db.collection(this.collection).doc(this.document).get()
      if(!skater.exists){
        console.log('No existen registros')
        throw new Error('No se encuentra')
      }

      const userData = skater.data().usersList.find(item => item.curp === curp)

      if(!userData){
          throw new Error('No se encuentra ese usuario')
      }
      return userData



    } catch (error) {
      throw new Error(`Algo salio mal al obtener el registro:${error.message}`);
    }
  }

  async update(id,newData){

    // try {
    //   await db.collection(this.collection).doc(id).update(newData)
    //   return { status: 'ok'}
    // } catch (error) {
    //   throw new Error(`Failed to update document: ${error.message}`);
    // }

    try {
      const users = await this.getAll()
      const index = users.findIndex(item => item.id === id)
      users[index] = {...users[index],...newData}
      await db.collection(this.collection).doc(this.document).update({
        usersList:users
      })
      return { status: 'ok'}
    } catch (error) {
      throw new Error(`Failed to update document: ${error.message}`);
    }


  }

  async verification(curp,status){

    const user = await this.getByCurp(curp);


    if(!user.verificacion){
      await this.update(user.id,{verificacion:status})
      const destinatario = user.correo
      let contenidoHtmlUsuario='';
       // Opciones del correo
       let opcionesCorreo = {
        from:process.env.EMAIL_USER,
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

      if(status){
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
                color:#268dee;">FELICIDADES ${user.nombre.toUpperCase()} ${user.apellido_paterno.toUpperCase()} ${user.apellido_materno.toUpperCase()}!</h2>
                <p style="color:#333;">Se ha confirmado tu registro en nuestra plataforma!!!! </p>
                <p style="color:#333;">Accede al siguiente link y accede con tu CURP para poder inscribirte a nuestras competencias vigentes!</p>

                <a href="https://www.femepashidi.com.mx/inicio/" target="_self">
                    <img style="width:200px;" src="cid:registroImg" alt="Imagen Adjunta">
                  </a>





                <p style="
                color:#333;">Saludos,</p>
                 <p style="
        color:#333;">
         Por favor, no responda a este correo electrónico, ya que no podemos responder a los mensajes enviados a esta dirección. Para cualquier consulta, póngase en contacto con su asociación o con su entrenador.
         </p>

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
                  color:#268dee;"> ${user.nombre.toUpperCase()} ${user.apellido_paterno.toUpperCase()} ${user.apellido_materno.toUpperCase()}</h2>
                  <p style="color:#333;">Lamentamos informarte que se rechazo tu registro a nuestra plataforma</p>
                  <p style="color:#333;">Contacta a tu asociación para mas informes</p>

                  <a href="${server}app/registro/" target="_self">
                      <img style="width:200px;" src="cid:registroImg" alt="Imagen Adjunta">
                    </a>





                 <p style="
                  color:#333;">Saludos,</p>
                   <p style="
        color:#333;">
         Por favor, no responda a este correo electrónico, ya que no podemos responder a los mensajes enviados a esta dirección. Para cualquier consulta, póngase en contacto con su asociación o con su entrenador.
         </p>

                  <p style="
                  color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
                  <a href="https://www.femepashidi.com.mx/">https://www.femepashidi.com.mx/</a>
                  </div>
              </body>
              </html>


              `;
              opcionesCorreo['html'] =contenidoHtmlUsuario

          }
      transporter.sendMail(opcionesCorreo, (error, info) => {
        console.log('[ERROR MAIL ASOCIACION]',error);
        console.log(info);



      });
      return{ message:'verificado'}
    }
  }

  async getByCurpA(curp){
    try {
    const user = await this.getByCurp(curp)
    const associaciones = await db.collection(this.collection).doc('associations').get()
    const asociacion = associaciones.data().associationsList.filter(item => item.id === user.id_asociacion)
    await this.update(user.id,{asociacion:asociacion[0]})
    return {...user}

    } catch (error) {
      throw new Error(`Algo salio mal al obtener el registro:${error.message}`);
    }


    // const associacion = await db.collection('associations').doc(data.id_asociacion).get()
    // console.log(associacion.data())
    // await this.update(data.id,{asociacion:associacion.data()})




  }
  async validateExist(curp){

    // try {
    //   const user = await this.getByCurp(curp)
    //   console.log(user)

    //   if(user[0].verificacion){
    //     return [...user]
    //   }else{
    //     return null
    //   }
    // } catch (error) {
    //   throw new Error("Error en la busqueda");

    // }
    try {
      const user = await this.getByCurp(curp)
      console.log(user)
      if(user.verificacion){
        return {...user}
      }else{
          return null
        }
    } catch (error) {
      throw new Error("Error en la busqueda");
    }

  }
  async updateOne(id,data){
    console.log('[UPDATE]',data)
    // try {
    //   const asociacion = await db.collection('associations').doc(data.id_asociacion).get()
    //   data['asociacion'] = asociacion.data()
    // await this.update(id,data)


    //   return { success:true, message:'Registro Actualizado'}
    // } catch (error) {
    //   return { success:true, message:'Registro No Actualizado'}

    // }

    try {
      const asociaciones = await db.collection(this.collection).doc('associations').get()
      const asociacion = asociaciones.data().associationsList.filter(item => item.id === data.id_asociacion)
      data['asociacion'] = asociacion[0]
      await this.update(id,data)
      return { success:true, message:'Registro Actualizado'}
    } catch (error) {
      return { success:true, message:'Registro No Actualizado'}
    }
  }

  async getOneById(id){
    // try {
    //   const doc = await db.collection('users').doc(id).get();
    //   console.log(doc)
    //   if (!doc.exists) {
    //     return null;
    //   }
    //   return { id: doc.id, ...doc.data() };
    // } catch (error) {
    //   throw new Error(`Algo salio mal al obtener el registro: ${error.message}`);
    // }
    try {
      const users = await this.getAll()
      const user = users.filter(item => item.id === id)
      return {...user[0]}
    } catch (error) {
      throw new Error(`Algo salio mal al obtener el registro: ${error.message}`);
    }
  }

















//
//   async resendMailRegister(curp){
//     const q = query(collection(db,'users'),where('curp','==',curp));
//     const res = await getDocs(q);
//     let documents = []
//     res.forEach(item =>{
//       let obj ={}
//       obj['id']=item.id;
//       obj['data']=item.data();
//       documents.push(obj);
//     })
//     if(documents.length === 0){
//       throw boom.notFound('Usuario no encontrado');
//     }
//     const data = documents[0].data;
//     console.log(data)
//     if(data){
//       console.log('Se reenvia el correo');
//       const destinatario=data.asociacion.correo;
//       const usuarioMail = data.correo;

//       // Contenido HTML del correo
//       const contenidoHtml = `
//       <!DOCTYPE html>
//       <html lang="es">
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
//           :root{
//             --primary-color-r:#268dee;
//             --background-input:#f0f0f0;
//             --font-input:#333;
//           }
//           body{
//             font-family: 'Nunito', sans-serif;
//           }

//           .container{
//             display: flex;
//             flex-direction: column;
//             width: 100%;
//             justify-content: center;
//             align-items: center;"
//           }

//             </style>
//       </head>
//       <body>


//         <div class="container">
//         <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
//           <h2 style="
//           color:#268dee;">${data.asociacion.representante.toUpperCase()}</h2>
//           <p style="
//           color:#333;">FEMEPASHIDI esta enviando esta solicitud para registrar al siguiente participante como parte de su asociación.</p>
//           <p style="
//           color:#333;">Nombre: ${data.nombre}  ${data.apellido_paterno} ${data.apellido_materno}</p>
//           <p style="
//           color:#333;">Nivel: ${data.nivel_actual}</p>
//           <p style="
//           color:#333;">Categoria: ${data.categoria}</p>
//           <p style="
//           color:#333;">Fecha de nacimeinto: ${data.fecha_nacimiento}</p>
//           <p style="
//           color:#333;">Es necesario que dé su Visto Bueno para que esta solicitud sea enviada al Presidente de FEMEPASHIDI</p>
//             <a href="${server}api/v1/users/verification/${data.curp}/true" target="_self">
//               <img style="width:200px;" src="cid:aceptarImg" alt="Imagen Adjunta">
//             </a>
//             <a href="${server}api/v1/users/verification/${data.curp}/false" target="_self">
//               <img style="width:200px;" src="cid:rechazarImg" alt="Imagen Adjunta">
//             </a>
//             <p style="
//             color:#333;">Una vez realizada la autorización se notificara al participante que se acepto su registro</p>
//             <p style="
//             color:#333;">Saludos,</p>
//             <p style="
//             color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
//             <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
//           </div>
//       </body>
//       </html>


//       `;
//       const contenidoHtmlUsuario = `
//       <!DOCTYPE html>
//       <html lang="es">
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;800&family=Rubik+Maps&display=swap');
//           :root{
//             --primary-color-r:#268dee;
//             --background-input:#f0f0f0;
//             --font-input:#333;
//           }
//           body{
//             font-family: 'Nunito', sans-serif;
//           }

//           .container{
//             display: flex;
//             flex-direction: column;
//             width: 100%;
//             justify-content: center;
//             align-items: center;"
//           }

//             </style>
//       </head>
//       <body>
//         <div class="container">
//         <img style="width: 100%;" src="cid:encabezadoImg" alt="Imagen Adjunta">
//           <h2 style="
//           color:#268dee;">${data.nombre.toUpperCase()} ${data.apellido_paterno.toUpperCase()} ${data.apellido_materno.toUpperCase()}</h2>
//           <p style="color:#333;">FEMEPASHIDI ha recibido y esta gestionando tu solicitud de registro en nuestra plataforma. </p>
//           <p style="color:#333;">En cuanto se autorice por parte del presidente de tu asociación te enviaremos un correo notificando tu aceptación para que puedas inscribirte a las competencias vigentes.</p>
//           <p style="color:#333;">Te pedimos estes pendiente de tu correo.</p>

//           <p style="
//           color:#333;">Saludos,</p>
//           <p style="
//           color:black;">Federación Mexicana de Patinaje Sobre Hielo y Deportes de Invierno,A.C.</p>
//           <a href="https://www.femepashidi.com.mx/sistema/">https://www.femepashidi.com.mx/sistema/</a>
//           </div>
//       </body>
//     </html>
//       `;
//       // Opciones del correo
//       const opcionesCorreo = {
//       // from:'luasjcr.3543@gmail.com',
//       from:'registros@femepashidi.com.mx',
//       to: destinatario,
//       subject: 'SOLICITUD DE REGISTRO FEMEPASHIDI A.C.',
//       html: contenidoHtml,
//       attachments:[
//         {
//         filename: 'ACEPTAR.png',  // Nombre del archivo adjunto
//         path: './uploads/others/ACEPTAR.png',  // Ruta a la imagen en tu sistema
//         cid: 'aceptarImg'  // Identificador único para la imagen, usado en el contenido HTML
//         },
//         {
//           filename: 'RECHAZAR.png',  // Nombre del archivo adjunto
//           path: './uploads/others/RECHAZAR.png',  // Ruta a la imagen en tu sistema
//           cid: 'rechazarImg'  // Identificador único para la imagen, usado en el contenido HTML
//           },
//           {
//             filename: 'encabezado.png',  // Nombre del archivo adjunto
//             path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
//             cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
//             }
//     ]
//       };

//       // Opciones del correo
//       const opcionesCorreoUsuario = {
//         from:'registros@femepashidi.com.mx',
//         to: usuarioMail,
//         subject: 'Registro FEMEPASHIDI A.C.',
//         html: contenidoHtmlUsuario,
//         attachments:[
//             {
//               filename: 'encabezado.png',  // Nombre del archivo adjunto
//               path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
//               cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
//               }
//       ]
//         };
//       // Enviar el correo a la asociación
//       transporter.sendMail(opcionesCorreo, (error, info) => {
//         console.log('[ERROR MAIL ASOCIACION]',error);
//         console.log(info);
//       });

//       transporter.sendMail(opcionesCorreoUsuario, (error, info) => {
//         console.log('[ERROR MAIL USUARIO]',error);
//         console.log(info);
//       });


//     }



//   }
//   async update(curp,data){
//     console.log('Entrando al update')

//     const q = query(collection(db,'users'),where('curp','==',curp));
//     const res = await getDocs(q);
//     let obj ={}
//     res.forEach(item=>{
//       obj['id']=item.id;
//       obj['data']=item.data();
//     })

//     let boolValue=true;
//     if(obj.data.verificacion === 'false'){ boolValue = false;};
//       obj.data['verificacion'] =boolValue
//     let copy = obj['data'];
//     obj['data']={
//       ...copy,
//       ...data}
//       console.log(obj)
//     const actualizarUsuario = await updateDoc(doc(db,'users',obj.id),obj.data);
//     return {actualizarUsuario,message:'Actualizado'}

//   }
//   async delete(id){


//     await deleteDoc(doc(db,'users',id));


//     return {message:'Eliminado'}
//   }
//   async validateExist(curp){
//     const q = query(collection(db,'users'),where('curp','==',curp.toUpperCase()))
//     const res = await getDocs(q);
//     let respuesta=false;

//     res.forEach(element=>{
//       const curpQ=element.data().curp;
//       console.log('query:', curpQ);
//       console.log('curp:',curp);
//       if(curpQ.toUpperCase() === curp.toUpperCase()){
//         respuesta=true;
//       }
//     })
//     return { resultado:respuesta }

//   }
//

}

module.exports = { User }
