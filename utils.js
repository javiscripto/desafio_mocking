import { faker } from "@faker-js/faker";

faker.location = "es";



export const generateProducts = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    code: faker.number.int({ min: 100, max: 999 }),
    price: faker.commerce.price({ min: 1000, max: 200000, dec: 0 }),
    stock: faker.number.int({ min: 1, max: 10 }),
    cat: faker.commerce.department(),
  };
};

///hash bcrypt
import bcrypt from "bcrypt";

export const createHash=(password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
};


///////////////////////////
export const isValidPass=(user, password)=>{
   return bcrypt.compareSync(password,user.password)
}
//middleware que valida una sesion activa
export const activeSession=(req, res, next)=>{
  if(req.session.user){
     return next()
  }else{
    return  res.redirect("/api/sessions/login")
  }
}

///send mail
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service:"gmail",
  secure:true,
  auth:{
    user:"javier.mecker94@gmail.com",
    pass: "shnl hrzi wzeo pypb"
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const mailOptions= {
  from:"javier.mecker94@gmail.com",
  to:"mdn.ftg@gmail.com",
  subject:"esto no es un simulacro",
  text:"hola mi amor"
};
export const sendMail=()=>{

  transporter.sendMail(mailOptions,(error,info)=>{
  if(error){
    console.error(`error al enviar el correo`,error)
  }else{
    console.log(`correo enviado: `,info.response)
  }
})
}


