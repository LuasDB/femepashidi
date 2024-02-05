//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");

//Creamos una clase para la gestión de usuarios
class Register {
  constructor(){

  }
  async create(data){
    const { id_user, id_association,id_events,fecha_solicitud,status} = data;
    const user = await getDoc(doc(db,'users',id_user));
    const association = await getDoc(doc(db,'associations',id_association));
    const event =await getDoc(doc(db,'events',id_events));
    const res = await addDoc(collection(db,'register'),{
      user:user.data(),
      association:association.data(),
      event:event.data(),
      fecha_solicitud,
      status
    });
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
}

module.exports = { Register }
