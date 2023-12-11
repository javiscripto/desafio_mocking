import express from "express";
import errorHandler from "./middlewares/index.js"

const app = express();

const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json())


import mockRouter from "../src/routes/mocking.js";
import productsRouter from "./routes/products.js"

app.use("/api/mockingProducts",mockRouter)
app.use("/api/products", productsRouter)
app.use(errorHandler)



app.listen(port, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
})