//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");

//Creamos una clase para la gestión de usuarios
class User {
  constructor(){

  }
  async create(data){
    const res = await addDoc(collection(db,'users'),data);
    return {message:'Creado',id:res.id}
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
    return { message:'UNO', documents}
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
}

module.exports = { User }
