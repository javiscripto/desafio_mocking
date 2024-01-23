import { Router } from "express";
import { activeSession } from "../../utils.js";
import { createMulterMiddleware } from "../middlewares/multerMiddleware.js";
import { getUserInfo , getForm, uploadDocuments, uploadPhoto } from "../server_controlers/usersControler.js";




//middleware multer
const documentsUpload= createMulterMiddleware("documents");
const profileUpload= createMulterMiddleware("profiles");



const router= Router();
//obtener informacion del usuario
router.get("/:uid", activeSession, getUserInfo)



//actualizar role de usuario en DB
router.put("/premium/:uid",activeSession );

//upload documents
router.get("/:uid/documents", activeSession, getForm)//
router.post("/:uid/documents",activeSession , documentsUpload.fields([{name:"identificacion"},{name:"domicilio"},{name:"estado-cuenta"}]), uploadDocuments);

//upload profile photo
router.post("/:uid/profile", activeSession, profileUpload.single("profilePhoto"), uploadPhoto )



export default router;
