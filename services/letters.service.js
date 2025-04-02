//Traemos la credencial para la base de datos de firestore
const { db,server }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");
const { connectStorageEmulator } = require('firebase/storage');
//Traemos nodemailer para los correos automaticos
const nodemailer = require('nodemailer');
require('dotenv').config();
const fontkit = require('fontkit'); // Importa fontkit
//Configurar las carpetas para guardar las cartas permiso
  const fs = require('fs');
  const path = require('path');

const uploadDirectoryLetter = './uploads/lettersA'
// Verificar si la carpeta de subida existe, si no, crearla
  if (!fs.existsSync(uploadDirectoryLetter)) {
    fs.mkdirSync(uploadDirectoryLetter);
  }



const { mailParticipanteInicio,mailPresidenteInicio ,mailPresidenteFemepashidi,mailParticipanteAceptacion} = require('../scripts/cartasPermiso')
function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // correo de  servidor SMTP
  port: process.env.EMAIL_PORT, // Puerto SMTP seguro
  secure: true, // Habilitar SSL/TLS
  auth: {
      user:process.env.EMAIL_USER, // Reemplaza con tu dirección de correo electrónico
      pass: process.env.EMAIL_PASS // Reemplaza con tu contraseña de correo electrónico
  }
});


const { PDFDocument, rgb ,StandardFonts } = require('pdf-lib');
const { get } = require('http');
const fsP = fs.promises


function formatearFecha(date) {
  const meses = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  console.log("Fecha original:", date);
  const newDate = new Date(date);
  console.log("Fecha interpretada por new Date:", newDate);

  const dia = newDate.getUTCDate();
  const mes = meses[newDate.getUTCMonth()];
  const año = newDate.getUTCFullYear();
  console.log("Fecha formateada:", `${dia}-${mes}-${año}`);

  return `${dia}-${mes}-${año}`;
}

// Prueba la función con diferentes valores de fecha
console.log(formatearFecha("2023-08-15"));

//Funcion para formateo de nombre

async function modificarPDF({ letter }) {
  try {
    // Leer el archivo PDF original
    const pdfBytes = await fsP.readFile('./scripts/machote.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    pdfDoc.registerFontkit(fontkit);

    // Obtener la primera página del documento
    const page = pdfDoc.getPage(0);
    console.log('Iniciado')

    // Fecha
    const fecha = new Date();

    page.drawText(`Mexico City,Mexico ${formatearFecha(fecha)}`, {
      x: 360,
      y: page.getHeight() - 120,
      size: 14,
      color: rgb(0, 0, 0),
    });
    const fontBytes = await fsP.readFile('./scripts/RobotoMono-Bold.ttf')
    const font = await pdfDoc.embedFont(fontBytes);
     // Texto a centrar
     const texto = `${capitalizeFirstLetter(letter.user.nombre)} ${letter.user.apellido_paterno.toUpperCase()} ${letter.user.apellido_materno.toUpperCase()}`

     // Calcular el ancho del texto en la fuente y el tamaño de fuente dado
     const textSize = font.widthOfTextAtSize(texto, 13);

     // Obtener el ancho de la página
     const pageWidth = page.getWidth();

     // Calcular la posición x para centrar el texto
     const xPos = (pageWidth - textSize) / 2;
    page.drawText(texto, {
      x: xPos+30,
      y: page.getHeight() - 210,
      size: 15,
      color: rgb(0, 0, 0),
      font: font
    });


    page.drawText(letter.association.nombre, {
      x: 150,
      y: page.getHeight() - 272,
      size: 13,
      color: rgb(0, 0, 0),
      font:font

    });

    let renglon=20

    page.drawText(`Therefore, ${letter.user.sexo==='MASCULINO'?'he':'she'} has the necessary authorization to participate`, {
      x: 150,
      y: page.getHeight() - 315 -renglon,
      size: 15,
      color: rgb(0, 0, 0)
    });
    page.drawText(`in the following event:`, {
      x: 150,
      y: page.getHeight() - 330 -renglon,
      size: 15,
      color: rgb(0, 0, 0)
    });
    //Table
    let xData = 190
    let yLine = 360+renglon
    let carriet = 25

    page.drawText(`${letter.nombreCompetencia.toUpperCase()}`, {
      x: xData ,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0),
      font:font
    });
    yLine=yLine+carriet

    page.drawText(`${letter.domicilioCompetencia.toUpperCase()}`, {
      x: xData,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0)
    });
    yLine=yLine+carriet

    const fechaI=new Date(letter.fechaInicialCompetencia)
    const fechaF=new Date(letter.fechaFinalCompetencia)
    page.drawText(`${formatearFecha(fechaI)} to ${formatearFecha(fechaF)}`, {
      x: xData,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0)
    });
    yLine=yLine+carriet
    page.drawText(`Level:`, {
      x: xData,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0),
      font: font
    });
    page.drawText(`${letter.nivelCompeticion}`, {
      x: xData +55,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0)
    });


    // Guardar el PDF modificado en un nuevo archivo
    const modifiedPdfBytes = await pdfDoc.save();
    await fsP.writeFile(`./uploads/lettersA/carta-${letter.folio}.pdf`, modifiedPdfBytes);

    console.log('Archivo PDF modificado creado exitosamente.');
    return `carta-${letter.folio}.pdf`
  } catch (error) {
    console.error('Error al modificar el PDF:', error);
  }
}


class Letters {
  consturctor(){

  }

  async create(data,file){
    // const getUser = await db.collection('users').doc(data.id_user).get()
    // const user = await getUser.data()
    // const getAssociation = await db.collection('associations').doc(user.id_asociacion).get()
    // const association = await getAssociation.data()
    const getUsers = await db.collection('femepashidi').doc('users').get()
    const user = getUsers.data().usersList.filter(user=>user.id === data.id_user)[0]
    const getAssociations = await db.collection('femepashidi').doc('associations').get()

    const association = getAssociations.data().associationsList.filter(association=>association.id === user.id_asociacion )[0]

    const folio = file.filename.split('-')[0]

    const register = {
      user,
      association,
      ...data,
      file_name:file.filename,
      folio:folio
    }
    console.log(register)

    const create = await db.collection('letters').add(register)

    if(create.id){

      console.log('[EMAIL USER]',user.correo)
      console.log('[EMAIL ASSOC]',association.correo)

      //Creamos el contenido HTML
      const htmlUser = mailParticipanteInicio({
        competencia:data,
        user:user,
        folio:folio
      });

      const htmlPresidente =  mailPresidenteInicio({
        competencia:data,
        user:user,
        folio:folio,
        server,
        id:create.id
      });
      // Opciones del correo
      const opcionesCorreoUsuario = {
        from:process.env.EMAIL_USER,
        to: user.correo,
        subject: `SOLICTUD CARTA PERMISO ${folio}-${capitalizeFirstLetter(user.nombre)} ${user.apellido_paterno.toUpperCase()}`,
        html: htmlUser,
        attachments:[
            {
              filename: 'encabezado.png',  // Nombre del archivo adjunto
              path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
              cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
              }
      ]
        };

      const opcionesCorreoPresidente = {
        from:process.env.EMAIL_USER,
        to: association.correo,
        subject: `SOLICTUD CARTA PERMISO ${folio}-${capitalizeFirstLetter(user.nombre)} ${user.apellido_paterno.toUpperCase()}`,
        html: htmlPresidente,
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
              },
              {
                filename:`${file.filename}`,
                path:`./uploads/letters/${file.filename}`,

              }
      ]
        };

        // Enviar el correo al usuario y presidente
      transporter.sendMail(opcionesCorreoUsuario, (error, info) => {
        console.log('[INFO USER]',info)
        console.log('[ERROR USER]',error)
      });
      transporter.sendMail(opcionesCorreoPresidente, (error, info) => {
        console.log('[INFO PRESIDENT]',info)
        console.log('[ERROR PRESIDENT]',error)
      });



      return {success:true,
        message:'Creado',
        data:register,id:create.id
      }
    }else{
      return { message:'No creado'}
    }

  }

  async findOne(id){
    const getLetter = await db.collection('letters').doc(id).get()
    const letter = getLetter.data();
    return letter
  }

  async verification(id, status){
    console.log('Entrando a verificacion')
    const letter =await this.findOne(id);
    letter['verificacionAsociacion']=status
    this.update(id,letter)
    let mensaje=''
    let htmlPresidencia=''



    if(status==='true'){
      mensaje='Aprobado'
      htmlPresidencia =mailPresidenteFemepashidi({
        competencia:letter,
        user:letter.user,
        folio:letter.folio,
        server,
        id:id
      })

    }else{
      mensaje='Rechazado'

    }
    const opcionesCorreoPresidente = {
      from:process.env.EMAIL_USER,
      to: 'analuisa@femepashidi.com.mx',
      subject: `SOLICTUD CARTA PERMISO ${letter.folio}-${capitalizeFirstLetter(letter.user.nombre)} ${letter.user.apellido_paterno.toUpperCase()}`,
      html: htmlPresidencia,
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
            },
            {
              filename:`${letter.file_name}`,
              path:`./uploads/letters/${letter.file_name}`,

            }
    ]
      };

      transporter.sendMail(opcionesCorreoPresidente, (error, info) => {
        if(error){
          console.error(error)
        }else{
          console.log(info)
        }
      });
      return {message:mensaje, success:true}
  }

  async update(id,data){
    const actualLetter = this.findOne(id);
    const actualizar = await db.collection('letters').doc(id).update({...actualLetter,...data});
    return { message:'Actualizado', nuevo:actualizar}
  }
  async approve(id,status){
    const letter =await this.findOne(id);
    letter['verificacionPresidencia']=status


    if(status === 'true'){
      const carta = await modificarPDF({letter})
      letter['carta_pdf']= await carta
      this.update(id,letter)
      //Creamos el HTML de respuesta del Usuario
      const htmlUserApprove = mailParticipanteAceptacion({
        competencia:letter,
        user:letter.user
      })
      //Configuracion del correo
      const opcionesCorreoUsuario = {
        from:process.env.EMAIL_USER,
        to: letter.user.correo,
        subject: `CARTA PERMISO ${letter.folio}-${capitalizeFirstLetter(letter.user.nombre)} ${letter.user.apellido_paterno.toUpperCase()}`,
        html: htmlUserApprove,
        attachments:[
            {
              filename: 'encabezado.png',  // Nombre del archivo adjunto
              path: './uploads/others/encabezado.png',  // Ruta a la imagen en tu sistema
              cid: 'encabezadoImg'  // Identificador único para la imagen, usado en el contenido HTML
            },
            {
              filename:`${carta}`,
              path:`./uploads/lettersA/${carta}`,
            }
      ]
        };
      //Envio de correo
      if(carta){
        transporter.sendMail(opcionesCorreoUsuario, (error, info) => {
        });
        return {message:'A crear la carta y enviarla',...letter,success:true}

      }
    }
  }





}

module.exports= { Letters }
