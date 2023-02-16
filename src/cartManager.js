import fs from "fs";
import ProductManager from "./productManager.js";

class CartManager{
    constructor(path){
      this.path = path;
      this.carts = [];
    }
  async loadDB(){
    this.carts = JSON.parse(await fs.promises.readFile(this.path))
  }
  async updateDB(){
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
  }

  async addCart(products){
    await this.loadDB()
    let productsDB 
    return new Promise((res,rej)=>{
      productManager.getProducts().then(
        data => {productsDB= data
          const productsArray = JSON.parse(products.products).map(product => {
            return {id:product.id, quantity:product.quantity}
          })
          productsArray.forEach(product=>{
            const index=productsDB.findIndex(item => item.id === product.id) 
            if(index===-1){
              rej("One or more items from the cart are not in stock")  
            }else(
              this.carts.push({
                cartId: Date.now()-1675133000000,
                products: productsArray
              })
            ) 
          })
          this.updateDB().then(
            res("Cart added")
          )
        }
      )
    })
  }

  async getCartById(cartId){
    await this.loadDB()
    const cart = this.carts.find(cart => cart.cartId === cartId)
    return new Promise((res,rej)=>{
      if(cart){
        res(cart.products)
      }else{
        rej(`Cart with id ${id} was not found`)
      }
    })
  }

  async addProduct(cartId, productId){
    await this.loadDB()
    const cartIndex = this.carts.findIndex(cart => cart.cartId === cartId)
    const productIfExists = await productManager.getProductById(productId)
    return new Promise((res,rej)=>{
      if(cartIndex!==-1){
        const productIndex = this.carts[cartIndex].products.findIndex(product => product.id === productId)
        if(productIndex!==-1){
          this.carts[cartIndex].products[productIndex].quantity+=1
        }else{
          this.carts[cartIndex].products.push({id:productId, quantity: 1})
        }
        this.updateDB().then(res(`Product successfuly added to Cart with ID: ${cartId} `))
      }else{
        rej("Cart not found")
      }
    })
  }
}



export default CartManager