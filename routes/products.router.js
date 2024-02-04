const express = require('express');
const ProductsService = require('../services/product.service');
const {validatorHandler} = require('../middleware/validator.hanlder');
const { createProductSchema,updateProductSchema,getProductSchema } = require('../schemas/product.schemas');
const router = express.Router();

const service = new ProductsService();

router.get('/',async(req,res,next)=>{
  try {
    const products = await service.find();
  res.json(products);
  } catch (error) {
    next(error);
  }

});

router.get('/:id',
validatorHandler(getProductSchema,'params'),
async(req,res,next)=>{
  try {
    const { id } =req.params;
    const product = await service.findOne(id);
    res.json(product);

  } catch (error) {
    next(error);
  }

});

router.post('/',
validatorHandler(createProductSchema,'body'),
async(req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async(req,res,next)=>{
  try {
    const { id }=req.params;
    const body = req.body;
    const change = await service.update(id,body);
    res.json(change);
  } catch (error) {
    next(error);
  }

});

router.delete('/:id',async(req,res,next)=>{
  try {
    const { id }=req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);

  } catch (error) {
    next(error);
  }

});




module.exports=router;
