import { Router } from "express";
import { activeSession } from "../../utils.js";
import multer from "multer";
import { getUserInfo , getForm, uploadDocuments } from "../server_controlers/usersControler.js";


//configuracion de multer
const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
      cb(null, `files/documents/`)//en esta carpeta se almacenaran los archivos
    },
    filename:(req, file, cb)=>{
      cb(null, file.fieldname+`-`+file.originalname);
    }
  });
  
  const upload= multer({storage:storage})
/////////////////////////////


const router= Router();
//update role
router.get("/:uid", activeSession, getUserInfo)



router.get("/premium/:uid", activeSession)// entrega el fo
router.put("/premium/:uid",activeSession );

//upload documents
router.get("/:uid/documents", activeSession, getForm)//
router.post("/:uid/documents",activeSession , upload.fields([{name:"identificacion"},{name:"domicilio"},{name:"estado-cuenta"}]), uploadDocuments);





export default router;
