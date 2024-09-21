const express = require('express');
const { configureStream } = require('./../middleware/configureUpload')
const Boom = require('@hapi/boom')

const StreamConf = require('../services/stream.service')
const router = express.Router()

const stream = new StreamConf()


router.get('/:id',async(req,res)=>{
  const {id} = req.params
  try {
    const getData = await stream.get(id)
    res.status(200).json({
      success:true,
      data:getData
    })

  } catch (error) {
    res.status(500).json({
      success:false,
      message:'No se pudo obtener datos'
    })
  }

});

router.patch('/:id',configureStream,async(req,res,next)=>{
  const uploadMiddleware = req.upload.any()

  uploadMiddleware(req,res,async(err)=>{
    if(err){ return next(Boom.badRequest(err.message))}
    const {id} = req.params
    const {body,files}=req

    let data= {
    }
    if(files){
      files.forEach(item=>{
        data[item.fieldname] = item.filename
      })
    }
    data= {...body,...data}
    console.log('[UPDATE]',data)
    try {
      const update = await stream.update(id,data);
      res.status(200).json({
        success:true,
        update
      })
    } catch (error) {
      res.status(500).json({
        success:false,
        message:'No actualizado' + error
      })
    }




  })




})

module.exports = router
