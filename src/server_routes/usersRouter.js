import { Router } from "express";
import { activeSession } from "../../utils.js";
import multer from "multer";
import { getUserInfo , getForm, uploadDocuments, uploadPhoto } from "../server_controlers/usersControler.js";
import { create } from "express-handlebars";


//set multer
const getDestination = (routePart) => (req, file, cb) => {
  const destination = `files/${routePart}/`;
  cb(null, destination);
};


const createMulterMiddleware = (routePart) => {
  const storage = multer.diskStorage({
      destination: getDestination(routePart),
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '-' + file.originalname);
      }
  });

  return multer({ storage: storage });
};


//middleware multer
const documentsUpload= createMulterMiddleware("documents");
const profileUpload= createMulterMiddleware("profiles");



const router= Router();
//update role
router.get("/:uid", activeSession, getUserInfo)



router.get("/premium/:uid", activeSession)// entrega el fo
router.put("/premium/:uid",activeSession );

//upload documents
router.get("/:uid/documents", activeSession, getForm)//
router.post("/:uid/documents",activeSession , documentsUpload.fields([{name:"identificacion"},{name:"domicilio"},{name:"estado-cuenta"}]), uploadDocuments);

//upload profile photo
router.post("/:uid/profile", activeSession, profileUpload.single("profilePhoto"), uploadPhoto )



export default router;
