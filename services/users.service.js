//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");
//Traemos nodemailer para los correos automaticos
const nodemailer = require('nodemailer');
const { string } = require('joi');

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
const verifyCategory=(fecha_nacimiento)=>{
  const fecha = new Date(fecha_nacimiento);
  const hoy = new Date();
  const diferenciaMilisegundos = hoy - fecha;
  let edadExacta = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));
  console.log('Edad:',edadExacta);
  let verificacion = edadExacta;
    if(edadExacta >= 29){
      verificacion=29;
    }else if (edadExacta >= 19){
      verificacion=19;
    }

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
    const res = await addDoc(collection(db,'users'),data);
    if(res.id){
      console.log('Enviar correo a:',data.correo);
      const destinatario=data.correo;
      // Configuración del transporte de correo
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'luasjcr.3543@gmail.com',
            pass:'fyzb llwd vqrv epaa'
        }
      });
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
          color:#268dee;">HOLA ${data.nombre}</h2>

        <p style="
        color:#333;">Recibimos tu solicitud de registro en nuestra plataforma</p>
        <p style="
        color:#333;">Haz click en el siguiente boton para verificar tu cuenta</p>

          <a href="http://localhost:3000/api/v1/users/verification/${data.curp}/true" target="_self"
          style="
          width: 50%;
          padding: 10px;
          background-color:#268dee;
          border-radius: 1rem;
          color: #f0f0f0;
          text-decoration: none;
          text-align: center;">
            VERIFICAR REGISTRO
          </a>
        </div>
        <h3>Agradecemos tu confianza</h3>
      </body>
      </html>


      `;
      // Opciones del correo
      const opcionesCorreo = {
      from:'luasjcr.3543@gmail.com',
      to: destinatario,
      subject: 'Registro PASHIDI A.C.',
      html: contenidoHtml
      };
      // Enviar el correo
      transporter.sendMail(opcionesCorreo, (error, info) => {


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
    const imagen = `http://localhost:3000/images/users/${nombre_imagen}`;

    return { message:'UNO', documents,img:imagen}
  }
  async verification(curp,status){
    let boolValue = (status === 'true');
    const data = { verificacion:boolValue}
    await this.update(curp,data);
    return { message:'verificado'}
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
    const q = query(collection(db,'users'),where('curp','==',id));
    const res = await getDocs(q);
    let obj ={}
    res.forEach(item=>{
      obj['id']=item.id;
      obj['data']=item.data();
    });
    const eleiminar=await deleteDoc(doc(db,'users',obj.id));


    return {message:'Eliminado',id:obj.id,eleiminar}
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
