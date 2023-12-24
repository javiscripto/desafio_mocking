import userModel from "../models/users.model.js";
import { logger } from "../../../utils/logger.js";

export default class UserMongo {
  updatePassword = async (hashedPassword, email) => {
    try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        logger.info("usuario no encontrado");
        return null;
      }
      user.password = hashedPassword;
      await user.save();
      logger.debug("contraseña actualizada");
      return user;
    } catch (error) {
      logger.error("error en la base de datos", error);
      throw error;
    }
  };

  updateRole= async(role,email)=>{
    try {
      const user = await userModel.findOne({email: email});
      if(!user){
        logger.warn(`usuario no encontrado`);
        return null;
      }
      user.role=role;
      await user.save();
      logger.debug(`rol actualizado`);return user;

    } catch (error) {
      logger.error("error en la base de datos", error);
    }
  }




}
