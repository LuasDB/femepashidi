//Traemos la credencial para la base de datos de firestore
const { db,server }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");


class StreamConf{
  constructor(){

  }
  async get(id){
    const res = await getDoc(doc(db,'stream',id));
    console.log(res.data())
    if(res.data()){
      return {message:'Configuracion',data:res.data()}
    }
    else{
      return { message:'No se encontro'}
    }
  }
  async update(id,data){

    const getData = await getDoc(doc(db,'stream',id))
    const lastData = getData.data()
    console.log('update',data)

    const update = await updateDoc(doc(db,'stream',id),{...lastData,...data});
    console.log(update)
    return {message:'Actualizado', res:update}


  }
}

module.exports = StreamConf
