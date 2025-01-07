const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom')
const {configureUpload} = require('./../middleware/configureUpload.js')
const { server, db } = require('../db/firebase')

const base = require('./../nueva.json')

const Exam = require("../services/exams.service.js");
const exam = new Exam()

router.post('/',async(req,res)=>{
  try {
    const newExam = await exam.create(req.body)
    if(!newExam){
      return res.status(400).json({ success:false, message:'Usuario no encontrado'})
    }
    res.status(201).json({
      success:true,
      message:'Nuevo registro creado!',
      data:newExam
    })
  } catch (error) {
    res.status(500).json({ success:false, message:'Ocurrio un error',error:error.message})
  }
})

router.get('/get-all/:year',async(req,res)=>{
  try {

    const { year } = req.params
    const exams = await exam.getAll(year)
    if(!exams){
      return res.status(400).json({ success:false, message:'No hay examenes para este año'})
    }
    res.status(200).json({
      success:true,
      message:'Lista de examenes',
      data:exams
    })
  } catch (error) {
    res.status(500).json({ success:false, message:'Ocurrio un error',error:error.message})
  }
})

router.get('/get-one/:year/:id',async(req,res)=>{
  try {
    const { year, id } = req.params
    const examen = await exam.getOne(year,id)
    if(!examen){
      return res.status(400).json({ success:false, message:'Examen no encontrado'})
    }
    res.status(200).json({
      success:true,
      message:'Examen encontrado',
      data:examen
    })
  } catch (error) {
    res.status(500).json({ success:false, message:'Ocurrio un error',error:error.message})
  }
})

router.post('/exam/:year/:id/judges',async(req,res)=>{
  try {
    const { year, id } = req.params
    const { judges } = req.body
    const examen = await exam.addJudges(year,id,judges)
    if(!examen){
      return res.status(400).json({ success:false, message:'Examen no encontrado'})
    }
    res.status(200).json({
      success:true,
      message:'Jueces agregados',
      data:examen
    })
  } catch (error) {
    res.status(500).json({ success:false, message:'Ocurrio un error',error:error.message})
  }
})



module.exports = router
