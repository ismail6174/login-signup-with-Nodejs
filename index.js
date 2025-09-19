import chalk from "chalk";
import express from "express";                        
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userModel } from "./model/userSchema.js";
import cors from "cors";




const app = express();

app.use(express.json());
app.use(cors())

// mongoose connection:

const MONGODB_URI = `mongodb+srv://ismailshah:61746174@cluster0.wgdrzzf.mongodb.net/`;

mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

//   signup coding
app.post("/api/signup", async (req, res) => {
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
});


//   login coding

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const getData = await userModel.findOne({ email });

    console.log(getData);

    if (!getData) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, getData.password);

    console.log(comparePassword);

    if (!comparePassword) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    res.json({
      message: "login successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "server start",
  });
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(
    chalk.bgCyanBright.bold.italic(`server is running on http://localhost:${PORT}`)
  );
});