import { Router } from "express";
import { activeSession } from "../../utils.js";

const router= Router();

router.get("premium/:uid",activeSession)

router.post("/:uid/documents", activeSession)//permitirá subir archivos con multer





export default router;
