import UserMongo from "../DAO/classes/userClass.js";
const userService= new UserMongo()



//get user info
export const getUserInfo = (req, res) => {
    const user = req.session.user;
    let userRole;
    user.role==="premium"?userRole=false:userRole=true;
    res.render("userinfo", { user, userRole });
  };













export const PUTuserRole = async(req, res)=>{
    try {
        const uid= req.params.uid;

        const result= await userService.validateDocuments(uid)

        if(result){
           return res.status(200).send("el rol del usuario ha sido actualizado");
        };
        res.send("faltan documentos para actualizar el rol")

    } catch (error) {
        res.status(500).send({message:"error interno del servidor"})
    }
};



export const getForm=async(req, res)=>{
    try {
        const uid= req.params.uid;

        res.render("uploadDocuments",{uid})

    } catch (error) {
        res.status(500).send({message:"error interno del servidor"})
    }
}

export const uploadDocuments = async (req, res) => {
    try {
        const uid = req.params.uid;
        const data = req.files

        const result= await userService.uploadDocuments(uid,data)
        res.send("Archivos cargados");
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor" });
        console.error("error en la solicitud: ", error)
    }
};
