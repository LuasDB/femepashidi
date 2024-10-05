const { db,server } = require('../db/firebase')

class Gallery{
  constructor(){

  }
  async create(collection, data){

    try {
      data['createdAt']= new Date().toISOString()

      const newDoc = await db.collection(collection).add(data)
      return {
        id:newDoc.id
      }
    } catch (error) {
      throw new Error(`Failed to create document: ${error.message}`);
    }
  }
  async getAll(collection) {
    try {
      const docs = await db.collection(collection).get();
      if(docs.empty){
        return null
      }
      const data = docs.docs.map(item=>({id:item.id,...item.data()}))
      return [...data];
    } catch (error) {
      throw new Error(`Algo salio mal al obtener los registros: ${error.message}`);
    }
  }

  async getOne(collection, id) {
    try {
      const doc = await db.collection(collection).doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Algo salio mal al obtener el registro: ${error.message}`);
    }
  }

  async update(collection, id, updates) {
    try {
      const docRef = db.collection(collection).doc(id);
      await docRef.set(updates);
      const updatedDoc = await docRef.get();
      if (!updatedDoc.exists) {
        return null;
      }
      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (error) {
      throw new Error(`Failed to update document: ${error.message}`);
    }
  }

  async delete(collection, id) {
    try {
      const docRef = db.collection(collection).doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return null;
      }
      await this.update(collection,id,{status:'Baja'});
      return true;
    } catch (error) {
      throw new Error(`Failed to delete document: ${error.message}`);
    }
  }

  async getAllCollections(){


    let users = await this.getAll('users')
    if(users === null){
      users=[]
    }

    let vehicles = await this.getAll('vehicles')
    if(vehicles === null){
      vehicles=[]
    }

    let drivers = await this.getAll('drivers')
    if(drivers === null){
      drivers=[]
    }

    return {
      users,vehicles,drivers
    }
  }


}

module.exports = Gallery
