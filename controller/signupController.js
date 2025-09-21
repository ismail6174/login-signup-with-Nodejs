import { userModel } from "../model/userSchema.js";
import bcrypt from "bcryptjs";


export const signupController = async(req,res)=>{
  try {
    const { username, email, password } = req.body;

    if (!username ||  !email || !password) {
      res.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const userObj = {
      username,
      email,
      password: encryptPassword,
    };



    const saveData = await userModel.create(userObj);

    res.status(200).json({
      message: "create user ",
      saveData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
}


