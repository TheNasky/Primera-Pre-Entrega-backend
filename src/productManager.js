import fs from "fs";

class ProductManager{
  constructor(path){
    this.products = [];
    this.path = path;
  }
  async loadDB(){
    this.products = JSON.parse(await fs.promises.readFile(this.path))
  }
  async updateDB(){
    await fs.promises.writeFile(this.path, JSON.stringify(this.products)) 
  }


  async addProduct({title, description, code, price, status=true, stock, category, thumbnails=[]}){
    await this.loadDB()
    const repeatedProduct = this.products.some(product => product.code === code)
    return new Promise((res,rej)=>{
      if(repeatedProduct === false && title && description && code && price && status && stock && category){
        this.products.push({
          id: Date.now(),
          title: title,
          description: description,
          code: code,
          price: price,
          status: status,
          stock: stock,
          category: category,
          thumbnails: thumbnails    
        });
        this.updateDB().then(
          res("Product added")
        )
      }else{
        rej("Duplicated product or wrong arguments")
      }
    })
  
  }

async getProducts(){
  await this.loadDB()
  return new Promise((res,rej)=>{
    if(this.products){
      res(this.products)
    }else{
      rej("Product list is empty")
    }
  })
}
async getProductById(id){
  await this.loadDB()
  const productIfExists = this.products.find(product => product.id === id)
  return new Promise((res,rej)=>{
    if(productIfExists){
      res(productIfExists)
    }else{
      rej(`Failed to get Product, Product ${id} was not found`)
    }
  })
}
  async updateProduct({id, title, description, code, price, status, stock, category, thumbnails}){
    await this.loadDB()
    const index = this.products.findIndex(product => product.id === id)
    return new Promise((res,rej)=>{
      if(index !== -1){
        this.products[index] = {
          id: id,
          title: title,
          description: description,
          code: code,
          price: price,
          status: status,
          stock: stock,
          category: category,
          thumbnails: thumbnails 
        }
        this.updateDB().then(
          res("Product Updated")  
        )
      }else{
        rej(`Product ${id} was not found`) 
      }
    })
  }
  async deleteProduct(id){
    await this.loadDB()
    const index = this.products.findIndex(product => product.id === id)
    return new Promise((res,rej)=>{
      if(index !== -1){
        this.products.splice(index,index+1)
        this.updateDB().then(
          res(`Product ${id} DELETED`) 
        )
      }else{
        rej(`Failed to Delete Product, Product ${id} was not found`)
      }
    })
  }
}

export default ProductManager

