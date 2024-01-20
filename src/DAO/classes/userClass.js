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

  updateRole = async (role, email, data) => {
    try {
      console.log(email)
      const user = await userModel.findOne({ email: email });
      if (!user) {
        logger.warn(`usuario no encontrado`);
        return null;
      }
      user.role = role;
      // iterar sobre el objeto data
      const nameFields = ["identificacion", "domicilio", "estado-cuenta"];

      for (let i = 0; i < nameFields.length; i++) {
        const path= data[nameFields[i]][0].path
        const document={name:nameFields[i],reference:path}
        user.documents.push(document)
       
      }

      await user.save();
      logger.debug(`rol actualizado`);
      return user;
    } catch (error) {
      logger.error("error en la base de datos", error);
    }
  };

  validateDocuments = async (userId) => {
    try {
      const user = await userModel.findById(userId);

      if (!user || user.documents.length !== 3) return false;

      return true;
    } catch (error) {
      logger.error("ha ocurrido un error en la db al realizar la consulta");
      throw error;
    }
  };
}
