import { logger } from "../../utils/logger.js";
import { Router } from "express";

const router= Router();


//realizar pruebas de los logs 
router.get("/", (req, res)=>{
    logger.info(`${req.method} en ${req.url}`)
    res.send("test http logger")
})






export default router;
