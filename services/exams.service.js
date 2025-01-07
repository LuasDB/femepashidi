const { collection } = require('firebase/firestore')
const { db,server } = require('../db/firebase')
const { generateUID } = require('./../functions/generales')

class Exam{
  constructor(){

  }
  async create(data){
   const { idUser, fecha_solicitud,fecha_examen } = data
   const users = await db.collection('femepashidi').doc('users').get()
   const dataUser = users.data().usersList.filter(item => item.id === idUser)
   if(dataUser.length === 0){
    console.log(
      'Usuario no encontrado'
    )
    return null
   }

   const exam = {
    id:generateUID(20),
    idUser,fecha_solicitud,fecha_examen,
    jueces:[],
    calificaciones:[],
    dataUser:dataUser[0]
   }
   const year = fecha_examen.split('-')[0]
   const list = await db.collection('exams').doc(`examenes${year}`).get()

   if(!list.exists){
    await db.collection('exams').doc(`examenes${year}`).set({
      examenesList:[exam]
    })
   }else{
    const newArray = list.data().examenesList || [];
    newArray.push(exam)
    await db.collection('exams').doc(`examenes${year}`).update({
      examenesList:newArray
    })
   }
   return exam




  }

  async getAll(year){

    const list = await db.collection('exams').doc(`examenes${year}`).get()
    if(!list.exists){
      return null
    }
    return list.data().examenesList
  }
  async getOne(year,id){
    const list = await db.collection('exams').doc(`examenes${year}`).get()
    if(!list.exists){
      return null
    }
    const exam = list.data().examenesList.filter(item => item.id === id)
    if(exam.length === 0){
      return null
    }
    return exam[0]
  }
  async addJudges(year,id,judges){
    const list = await db.collection('exams').doc(`examenes${year}`).get()
    if(!list.exists){
      return null
    }
    const exam = list.data().examenesList.filter(item => item.id === id)
    if(exam.length === 0){
      return null
    }
    const newArray = list.data().examenesList.map(item => {
      if(item.id === id){
        item.jueces = judges
      }
      return item
    })
    await db.collection('exams').doc(`examenes${year}`).update({
      examenesList:newArray
    })
    return true
  }






}

module.exports = Exam
