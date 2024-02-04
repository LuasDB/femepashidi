//Paquete que nos ayuda a crear valores aletorios para simular una base de datos
const { faker } = require('@faker-js/faker');
//Boom nos ayuda a manejar los status Code de una mejor manera y mas controlada
const boom = require('@hapi/boom');

class ProductsService{

  constructor(){
    this.products=[];
    this.generate();
  }

  generate(){
    const limit =100;
    for(let i =0; i < limit ; i++){
      this.products.push(
         {
          id:faker.database.mongodbObjectId(),
          name:faker.commerce.productName(),
          price:parseInt(faker.commerce.price(),10),
          image:faker.image.url(),
          isBlock: faker.datatype.boolean()
         }
        );
    }
  }

  create(data){
    const newProduct ={
      id:faker.database.mongodbObjectId(),
      ...data
    }
    this.products.push(newProduct);
    return {
      message:'Nuevo producto creado',
      newProduct};

  }

  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    })


  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Producto no encontrado');
    }
    if(product.isBlock){
      throw boom.conflict('Este producto esta bloqueado');
    }

    return product;

  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {...product,...changes};
    return this.products[index];

  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    console.log('Index:',index);
    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }
    this.products.splice(index,1);
    return {
      mesage:'Producto eliminado',
      id }

  }
}

module.exports = ProductsService;
