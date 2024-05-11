const express = require('express');
const StreamConf = require('../services/stream.service')
const router = express.Router()

const stream = new StreamConf()


router.get('/:id',async(req,res)=>{
  const {id} = req.params

  const streamConf = await stream.get(id);


    res.status(200).json(streamConf)

});

router.patch('/:id',async(req,res)=>{
  const {id} = req.params
  const {body}=req
  console.log('Body')

  const update = await stream.update(id,body);
  if(update.message === 'Actualizado'){
    res.status(201).json(update)
  }else{
    res.status(501).json(update)
  }
})


module.exports = router
