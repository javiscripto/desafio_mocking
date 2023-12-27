import { logger } from "../../utils/logger.js";
import ProductsMOngo from "../DAO/classes/productsClass.js";
import productModel from "../DAO/models/product.model.js";

const productService=new ProductsMOngo();

export const getAll=async(req, res)=>{
    
    const page= parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit) || 10;


    try {
        const options={page,limit};

        const result=await productModel.paginate({},options);


        const hasPreviousPage = page > 1;
        const hasNextPage = page < result.totalPages;
        const previousPage = hasPreviousPage ? page - 1 : page;
        const nextPage = hasNextPage ? page + 1 : page;
    
        const dbProducts = result.docs.map((product) => product.toObject()); // Convertir a objetos JSON
    
        const user= req.session.user;
        
        let adminRole;
        user.role=="admin"||"premium"?adminRole=true:adminRole=false
       
        res.status(200).render('products', {
          dbProducts,
          hasPreviousPage,
          hasNextPage,
          previousPage,
          nextPage,
          currentPage: page,
          limit,
          user,
          adminRole
        })
    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
};






export const getById= async(req, res)=>{
    try {
        const cart= req.session.user.cart
        const pid= req.params.pid;
        const product= await productService.getById(pid);
        res.render("detail",{product, pid, cart})
    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}



export const createProduct= async( req, res)=>{
    try {
        const product= req.body;
        if(!product.title||!product.description||!product.code||!product.price||!product.status||!product.stock||!product.cat){
            res.send("faltan datos")
        };
        
        const newProduct= {...product, owner:req.session.user._id}
        const createdProduct= await productService.createProduct(newProduct)
        res.status(201).json(createdProduct)

    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}




export const updateProduct= async(req, res)=>{
    try {
        
        const pid= req.params.pid;
        const data= req.body;

        const updatedProduct= await productService.updateProduct(pid,data);
        res.json(updatedProduct)



    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}




export const deleteProduct= async(req, res)=>{
    try {
        const pid= req.params.pid;
        const owner=req.session.user
        
        const result= await productService.deleteProduct(pid,owner);
        if(!result){
            return res.status(401).json({ message: "Unauthorized" });
        }
        
    } catch (error) {
        res.status(500).json({ result: "error", message: error.message });
    }
}

