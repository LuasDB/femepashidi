//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");

//Creamos una clase para la gestión de usuarios
class Communication {
  constructor(){

  }
  async create(data,files){
    data['img']=files['file_input'][0].filename;
    data['doc']=files['documento'][0].filename;

   const res = await addDoc(collection(db,'communications'),data);
  const docRef= doc(collection(db,'communications'),res.id);
    await setDoc(docRef,data);
    return {message:'Creado',id:res.id, data:data}

  }
  async findAll(){
    const resfirebase = await getDocs(collection(db,'communications'));
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
    const q = doc(db,'communications',id);
    const document = await getDoc(q);

    if(document.exists()){
    return { message:'UNO', data:document.data()}

    }else{
      throw boom.notFound('Usuario no encontrado');
    }
  }
  async update(id,data){
    const q = doc(db,'communications',id);
    const document = await getDoc(q);
    if(document.exists()){
      let obj ={}
      obj['data']=document.data();
      let copy = obj['data'];
      obj['data']={
        ...copy,
        ...data
      }
      const actualizar = await updateDoc(doc(db,'communications',id),obj.data);
      return {message:'Actualizado'}

    }else{
      throw boom.notFound('No se encontro la asociacion');
    }



  }
  async delete(id){
    const q = doc(db,'communications',id);
    const eleiminar=await deleteDoc(q);
    return {message:'Eliminado',id,eleiminar}
  }
}

module.exports = { Communication }
