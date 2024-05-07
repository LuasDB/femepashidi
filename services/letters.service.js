//Traemos la credencial para la base de datos de firestore
const { db,server }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");
const { connectStorageEmulator } = require('firebase/storage');
//Traemos nodemailer para los correos automaticos
const nodemailer = require('nodemailer');
require('dotenv').config();

//Configurar las carpetas para guardar las cartas permiso
const fs = require('fs');
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
  host: 'mail.femepashidi.com.mx', // Reemplaza 'tudominio.com' con el nombre de tu servidor SMTP
  port: 465, // Puerto SMTP seguro (reemplaza con el puerto adecuado)
  secure: true, // Habilitar SSL/TLS
  auth: {
      user: 'registros@femepashidi.com.mx', // Reemplaza con tu dirección de correo electrónico
      pass: 'Registros2024@' // Reemplaza con tu contraseña de correo electrónico
  }
});


const { PDFDocument, rgb ,StandardFonts } = require('pdf-lib');
const fs = require('fs').promises;
//Funcion para formateo de fechas
function formatearFecha(date) {
  const meses = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dia = date.getDate();
  const mes = meses[date.getMonth()];
  const año = date.getFullYear();

  return `${dia}-${mes}-${año}`;
}
//Funcion para formateo de nombre

async function modificarPDF({ letter }) {
  try {
    // Leer el archivo PDF original
    const pdfBytes = await fs.readFile('./scripts/machote.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Obtener la primera página del documento
    const page = pdfDoc.getPage(0);



    // Fecha
    const fecha = new Date();

    page.drawText(`Mexico City,Mexico ${formatearFecha(fecha)}`, {
      x: 350,
      y: page.getHeight() - 100,
      size: 13,
      color: rgb(0, 0, 0),
    });

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
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
      y: page.getHeight() - 195,
      size: 12,
      color: rgb(0, 0, 0),
      font: font
    });

    page.drawText(`Therefore, she has the necessary authorization to participate`, {
      x: 160,
      y: page.getHeight() - 270,
      size: 13,
      color: rgb(0, 0, 0)
    });
    page.drawText(`in the following event:`, {
      x: 160,
      y: page.getHeight() - 285,
      size: 13,
      color: rgb(0, 0, 0)
    });
    //Table
    let xData = 160
    let yLine = 310
    page.drawText(`State game:`, {
      x: xData,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0),
      font: font
    });
    page.drawText(`${letter.nombreCompetencia.toUpperCase()}`, {
      x: xData +70,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0)
    });
    yLine=330
    page.drawText(`Address:`, {
      x: xData,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0),
      font: font
    });
    page.drawText(`${letter.domicilioCompetencia.toUpperCase()}`, {
      x: xData +55,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0)
    });
    yLine=350
    page.drawText(`Dates:`, {
      x: xData,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0),
      font: font
    });
    const fechaI=new Date(letter.fechaInicialCompetencia)
    const fechaF=new Date(letter.fechaFinalCompetencia)
    page.drawText(`${formatearFecha(fechaI)} to ${formatearFecha(fechaF)}`, {
      x: xData +55,
      y: page.getHeight() - yLine,
      size: 12,
      color: rgb(0, 0, 0)
    });
    yLine=370
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
    await fs.writeFile(`./uploads/lettersA/carta-${letter.folio}.pdf`, modifiedPdfBytes);

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

    const getUser = await getDoc(doc(db,'users',data.id_user))
    const user = await getUser.data()
    const getAssociation = await getDoc(doc(db,'associations',user.id_asociacion));
    const association = await getAssociation.data()


    const folio = file.filename.split('-')[0]

    const register = {
      user,
      association,
      ...data,
      file_name:file.filename,
      folio:folio
    }

    const create = await addDoc(collection(db,'letters'),register)

    if(create.id){

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
        from:'registros@femepashidi.com.mx',
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
        from:'registros@femepashidi.com.mx',
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
      });
      transporter.sendMail(opcionesCorreoPresidente, (error, info) => {
      });



      return {
        message:'Creado',
        data:register,id:create.id
      }
    }else{
      return { message:'No creado'}
    }

  }

  async findOne(id){
    const getLetter = await getDoc(doc(db,'letters',id));
    const letter = getLetter.data();
    return letter
  }

  async verification(id, status){

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
      from:'registros@femepashidi.com.mx',
      to: letter.association.correo,
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
      });
      return {message:mensaje}
  }

  async update(id,data){
    const actualLetter = this.findOne(id);
    const actualizar = await updateDoc(doc(db,'letters',id),{...actualLetter,...data});
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
        from:'registros@femepashidi.com.mx',
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
        return {message:'A crear la carta y enviarla',...letter}

      }
    }
  }





}

module.exports= { Letters }
