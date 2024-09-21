//Traemos la credencial para la base de datos de firestore
const { db,server }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");


class StreamConf{
  constructor(){

  }
  async get(id){
    try {
      const data = await db.collection('stream').doc(id).get()

      return { ...data.data() }

    } catch (error) {
      return { message:'Error al obtener datos'}
    }
  }

  async update(id,data){
    try {
      await db.collection('stream').doc(id).update(data)
      return { message:'Actualizado' }
    } catch (error) {
      return { message:'Error al actualizar'}
    }
  }
}

module.exports = StreamConf
