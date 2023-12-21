import jwt from "jsonwebtoken";

export const generateResetToken = (email )=> {
  const token = jwt.sign({ email }, "secret_key", { expiresIn: "1h" }); 
  console.log("el token es:",token)
  return token;
};
