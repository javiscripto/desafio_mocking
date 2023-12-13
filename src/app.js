import express from "express";
import errorHandler from "./middlewares/index.js"
import { addLoggerMiddleware , logger} from "../utils/logger.js";

const app = express();

const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(addLoggerMiddleware);



import mockRouter from "../src/routes/mocking.js";
import productsRouter from "./routes/products.js"


app.use("/api/mockingProducts",mockRouter)
app.use("/api/products", productsRouter)
app.use(errorHandler)



app.listen(port, ()=>{

    logger.info(`servidor corriendo en el puerto ${port}`)
})