//Boom nos ayuda a manejar los status code de una mejor manera y mas controlada
const boom = require('@hapi/boom');
//Traemos la credencial para la base de datos de firestore
const { db }= require('../db/firebase');
//agregamos las funciones para el manejo en la base de datos de Firestore
const {  doc,addDoc, getDocs,getDoc,setDoc,deleteDoc,updateDoc, arrayUnion,query, where, collection} = require("firebase/firestore");
//Importar funciones especiales
const { generateUID } = require('./../functions/generales')
//Creamos una clase para la gestión de usuarios
class Association {
  constructor(){

  }
  async create(data){
    console.log('Datos de asociacion:',data)
    // const res = await addDoc(collection(db,'associations'),data);
    // return {message:'Creado',id:res.id}
    try {
    data['id'] = generateUID(20);
    const asociaciones = await db.collection('femepashidi').doc('associations').get()

    if(!asociaciones.exists){
      await db.collection('femepashidi').doc('associations').set({
        associationsList:[data]
      })
    }else{
      const newArray = asociaciones.data().associationsList || []
      newArray.push(data)
      await db.collection('femepashidi').doc('associations').update({
        associationsList:newArray
      })
    }
    return { success:true, message: ' Creado', id:data.id}


    } catch (error) {
      return { success:false, message:'Error al crear asociuacion'}
    }








  }
  async findAll(){
    try{
      const associations = await db.collection('femepashidi').doc('associations').get()
      if(!associations.exists){
      throw boom.notFound('No se encontraron asociaciones');
      }
      const documents = associations.data().associationsList.filter(item => item.status === "Activo")

      return {
        message:'TODOS',documents
      }
    }catch(error){
      throw boom.notFound('No se encontraron usuarios',error);
    }
    if(!resfirebase){
      throw boom.notFound('No se encontraron usuarios');
    }


  }
  async findOne(id){
    // const q = doc(db,'associations',id);
    // const document = await getDoc(q);

    // if(document.exists()){
    // return { message:'UNO', data:document.data()}

    // }else{
    //   throw boom.notFound('Usuario no encontrado');
    // }
    try {
      const associations = await this.findAll()
      const data = associations.documents.filter(item => item.id === id)
      return {message:'UNO', data}
    } catch (error) {
      throw boom.notFound('Usuario no encontrado');
    }
  }
  async update(id,data){

    // const q = doc(db,'associations',id);
    // const document = await getDoc(q);
    // if(document.exists()){
    //   let obj ={}
    //   obj['data']=document.data();
    //   let copy = obj['data'];
    //   obj['data']={
    //     ...copy,
    //     ...data
    //   }
    //   const actualizarUsuario = await updateDoc(doc(db,'associations',id),obj.data);

    try {
      const associations = await this.findAll()
      const indexAssociation = associations.documents.findIndex(item => item.id === id)

      if(indexAssociation === -1){
        console.log('No se encontro registro para actualizar')
        return
      }
      associations.documents[indexAssociation] = {...associations.documents[indexAssociation],...data}

      await db.collection('femepashidi').doc('associations').update({
        associationsList:associations.documents
      })

      return { message:'Actualizado',associations}


    } catch (error) {
      throw boom.notFound('No se encontro la asociacion');
    }

  }
  async delete(id){
    // const q = doc(db,'associations',id);
    // const eleiminar=await deleteDoc(q);
    // return {message:'Eliminado',id,eleiminar}

    try {
      await this.update(id,{status:'Baja'})
      return { message: 'REGISTRO ELIMINADO', id}
    } catch (error) {
      throw boom.conflict('No se pudo eliminar este registro debido a un conflicto');
    }
  }

  async import(){
    try {
      const getAll = await db.collection('associations').get()
      const data = getAll.docs.map(item => ({id:item.id,...item.data()}) )
      const newArray =  []

      data.forEach((item) =>{
        newArray.push(item)
      })

      const asociaciones = await db.collection('femepashidi').doc('associations').get()

    if(!asociaciones.exists){
      await db.collection('femepashidi').doc('associations').set({
        associationsList:newArray
      })
    }else{

      await db.collection('femepashidi').doc('associations').update({
        associationsList:newArray
      })
    }


      return { data }


    } catch (error) {
      throw boom.badRequest('Algo salio mal con la importación')
    }
  }
}

module.exports = { Association }
