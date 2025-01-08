const { collection } = require('firebase/firestore')
const { db,server } = require('../db/firebase')
const { generateUID } = require('./../functions/generales')

class Exam{
  constructor(){

  }
  async create(data){
   const { curp, fecha_solicitud,fecha_examen } = data
   console.log(data)
   const users = await db.collection('femepashidi').doc('users').get()
   const dataUser = users.data().usersList.filter(item => item.curp === curp)
   if(dataUser.length === 0){
    console.log(
      'Usuario no encontrado'
    )
    return null
   }

   const exam = {...data,
    id:generateUID(20),
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
    const examenes = list.data().examenesList
    const examIndex = examenes.findIndex(item => item.id === id)
    if(examIndex === -1){
      return null
    }

    examenes[examIndex].jueces.push(judges)

    await db.collection('exams').doc(`examenes${year}`).update({
      examenesList:examenes
    })

    return {examen:examenes[examIndex]}

  }
  async addCalJudge(year, id,idJ, cal){
    const list = await db.collection('exams').doc(`examenes${year}`).get()
    if(!list.exists){
      return null
    }
    const examenes = list.data().examenesList
    const examIndex = examenes.findIndex(item => item.id === id)
    if(examIndex === -1){
      return null
    }
    const jueces = examenes[examIndex].jueces
    const indexJuez = jueces.findIndex(item=> item.id === idJ)

    jueces[indexJuez]['calificaciones']=cal.calificaciones

    examenes[examIndex]['jueces'] = jueces

    await  db.collection('exams').doc(`examenes${year}`).update({
      examenesList:examenes
    })
    return { examen:examenes[examIndex] }

  }
  async editOne(year, id, cal){
    const list = await db.collection('exams').doc(`examenes${year}`).get()
    if(!list.exists){
      return null
    }
    const examenes = list.data().examenesList
    if(examenes.length === 0){
      return null
    }
    const examenIndex = examenes.findIndex(item=>item.id === id)
    examenes[examenIndex]={...examenes[examenIndex],...cal}
    await db.collection('exams').doc(`examenes${year}`).update({
      examenesList:examenes
    })
    if(cal.isApproved){
      const usersList = await db.collection('femepashidi').doc(`users`).get()
      if(!usersList.exists){
        return null
      }
      const users = usersList.data().usersList
      const userIndex = users.findIndex(item => item.id === examenes[examenIndex].dataUser.id)
      users[userIndex]['nivel_actual']=  examenes[examenIndex].nuevoNivel
      await db.collection('femepashidi').doc(`users`).update({
        usersList:users
      })
    }
     return { resultado: examenes[examenIndex] }

  }



}

module.exports = Exam
