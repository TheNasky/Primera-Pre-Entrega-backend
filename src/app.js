import express from "express";
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
// import ProductManager from "./productManager.js";

// const productManager = new ProductManager('products.json')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)


const PORT = 8080

const server = app.listen(PORT, () => {

console.log(`Servidor en puerto ${PORT}`)

})

server.on("error", (err) => {

console.error(`Error: ${err}`)

})
