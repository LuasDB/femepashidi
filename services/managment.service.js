const { collection } = require('firebase/firestore')
const { db,server } = require('../db/firebase')
const { generateUID } = require('./../functions/generales')

class Managment{
  constructor(){

  }
  async create(collection, data){
    try {
      data['createdAt']= new Date().toISOString()
      data['id'] = generateUID(20)

      const list = await db.collection('femepashidi').doc(collection).get()
      if(!list.exists){

        await db.collection('femepashidi').doc(collection).set({
          [`${collection}List`]:[data]
        })
      }else{
        const newArray = list.data()[`${collection}List`] || [];
        newArray.push(data);

        await db.collection('femepashidi').doc(collection).update({
            [`${collection}List`]: newArray
        });

      }
      return {
        id:data.id
      }
    } catch (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
  }
  async getAll(collection) {
    console.log(collection)
    try {
      const docs = await db.collection('femepashidi').doc(collection).get();
      if(!docs.exists){
        return null
      }
      const data = docs.data()[`${collection}List`]
      return [...data];
    } catch (error) {
      throw new Error(`Algo salio mal al obtener los registros: ${error.message}`);
    }
  }

  async getOne(collection, id) {
    try {
      const getAll = await this.getAll(collection)
      const doc = getAll.filter(item => item.id === id)
      return { ...doc[0] };
    } catch (error) {
      throw new Error(`Algo salio mal al obtener el registro: ${error.message}`);
    }
  }

  async update(collection, id, updates) {
    try {
      const doc = await db.collection('femepashidi').doc(collection).get();
      if (!doc.exists) {
        throw new Error(`Collection ${collection} does not exist.`);
      }

      const list = doc.data()[`${collection}List`] || [];
      const index = list.findIndex(item => item.id === id);

      if (index === -1) {
        throw new Error(`Document with id ${id} not found in collection ${collection}.`);
      }

      // Update the specific item
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };

      await db.collection('femepashidi').doc(collection).update({
        [`${collection}List`]: list
      });

      return { id, ...list[index] };
    } catch (error) {
      throw new Error(`Failed to update document in ${collection}: ${error.message}`);
    }
  }

  async delete(collection, id) {
    try {
     await this.update(collection,id,{status:'Baja'})
      return true;
    } catch (error) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }


  async import(){
    async function mudar(collection){
      let newArray =  []
      let data = []
      let getAll = []

    getAll = await db.collection(collection).get()
    data = getAll.docs.map(item => ({id:item.id,...item.data()}) )
    data.forEach((item) =>{
      newArray.push(item)
    })

    const lista = await db.collection('femepashidi').doc(`${collection}List`).get()
    if(!lista.exists){
      await db.collection('femepashidi').doc(collection).set({
        [`${collection}List`]:newArray

      })
    }else{
      await db.collection('femepashidi').doc(collection).update({
        [`${collection}List`]:newArray
      })
    }}

    const colecciones = ['communications']

    colecciones.forEach(async (item) => {
      await mudar(item)
    })




  }






}

module.exports = Managment
