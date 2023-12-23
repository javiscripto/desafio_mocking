import nodemailer from "nodemailer";
import { logger } from "../../utils/logger.js";
import { generateResetToken } from "../config/resetToken.js";
import { createHash } from "../../utils.js";
import jwt from "jsonwebtoken";
import UserMongo from "../DAO/classes/userClass.js";

const userService= new UserMongo()

const transporter = nodemailer.createTransport({
  service: "Gmail",

  auth: {
    user: "javiermanque.fotos@gmail.com",
    pass: "eyef veis hqww lfrp",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

// register
export const getRegister = (req, res) => {
  res.render("register");
};

export const postRegister = (req, res) => {
  res.send({ status: "success", message: "usuario registrado" });
};

export const failRegister = (req, res) => {
  console.log(`falla en el registro`);
  res.send({ error: "fallo el registro" });
};

//login
export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = (req, res) => {
  if (!req.user)
    return res
      .status(400)
      .send({ status: "error", error: "credencial invalida" });

  //const user= req.user;
  req.session.user = req.user;

  res.redirect("/api/products");
};

export const failLogin = (req, res) => {
  res.send("credenciales incorrectas");
};

//login with github
export const githubLogin = (req, res) => {};

export const gitHubCallback = (req, res) => {
  req.session.user = req.user;
  res.redirect("/api/products");
};

export const getUserInfo=(req, res)=>{
  const user = req.session.user
  res.render("userinfo",{user})
}


export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.redirect("/api/sessions/login");
    else res.send({ status: `logout error`, body: err });
  });
};
////////////////////////////////////////////////////////restablecer la contraseña
export const forgotPassword = (req, res) => {
  res.render("forgotPasword");
};
//-----------------------
export const postForgotPassword = (req, res) => {
  const { email } = req.body;

  //aqui genero el token para restablecer la contraseña
  const resetToken = generateResetToken(email);

  const mailOPtion = {
    from: "javiermanque.fotos@gmail.com",
    to: email,
    subject: "reestablecer la contraseña",
    text: `pincha el siguiente enlace para reestablecer la contraseña : \n http://localhost:8080/api/sessions/reset-password?token=${resetToken}`,
  };

  transporter.sendMail(mailOPtion, (error, info) => {
    if (error) {
      logger.error(" ha ocurrido un error : ", error);
    } else {
      logger.info("mensaje enviado correctamente: ", info);
    }
  });

  res.send(`hemos enviado un correo a ${email} para restablecer la contraseña`);
};



export const resetPassword = (req, res) => {
  const { token } = req.query;

  // Verifico el token
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      logger.debug("token expirado o inválido")
      return res.redirect("/api/sessions/ForgotPassword");
    }

    logger.debug("token validado")
    // redirijo
    res.redirect(`/api/sessions/reset-password-form?email=${decoded.email}`);
  });
};

export const resetPasswordForm=(req, res)=>{
    const {email}=req.query;
    res.render("resetPassword",{email})
};

export const updatePassword=async(req, res)=>{
  try {
     const {email, password}=req.body
  const result= await userService.updatePassword(createHash(password),email);

  res.status(200).send("ok")
  } catch (error) {
    res.status(500).send("ha ocurrido un error interno en el servidor")
  }
 
}