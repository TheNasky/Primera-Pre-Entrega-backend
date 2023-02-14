import fs from "fs";

class ProductManager{
  constructor(path){
    this.products = [];
    this.path = path;
  }
  async loadDB(){
    if(fs.existsSync(this.path)){
      this.products = JSON.parse(await fs.promises.readFile(this.path))
    }
  }
  async updateDB(){
    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
  }

  async addProduct(title, description, price, thumbnail, code, stock){
    await this.loadDB()
    const repeatedProduct = this.products.some(product => product.code === code)
    if(repeatedProduct === false && title && description && price && thumbnail && stock){
      this.products.push({
        id: Date.now(),
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      });
      this.updateDB
      return "Product Added"
    }else{
      return "Duplicated product or wrong arguments"
    }
  }
  async getProducts(){
    await this.loadDB()
    return this.products
  }
  async getProductById(id){
    await this.loadDB()
    const productExists = this.products.find(product => product.id === id)
    if (productExists){
      return productExists
    }else{
      return `Failed to get Product, Product ${id} was not found`
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock){
    await this.loadDB()
    const productIndex = this.products.findIndex(product => product.id === id)
    if(productIndex !== -1){
      this.products[productIndex] = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock
      }
      await this.updateDB()
      return `Product ${id} was updated`
    }else{
      return `Failed to Update Product, Product ${id} was not found`
    }
  }
  async deleteProduct(id){
    await this.loadDB()
    const productIndex = this.products.findIndex(product => product.id === id)
    if(productIndex !== -1){
      this.products.splice(productIndex,productIndex+1)
      await this.updateDB()
      return `Product ${id} DELETED`
    }else{
      return `Failed to Delete Product, Product ${id} was not found`
    }
  }
}

export default ProductManager

