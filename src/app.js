const express = require ( "express");

const app = express();

const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json())


const mockRouter= require("./routes/mocking")
app.use("/",mockRouter)


app.listen(port, ()=>{
    console.log(`servidor corriendo en el puerto ${port}`)
})