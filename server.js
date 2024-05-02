import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenvConfig();
const port = 5000;

//! env variables
const envUserName = process.env.MONGODB_USERNAME;
const envPassWord = process.env.MONGODB_PASSWORD;

//! connecting to Atlas Cluster MongoDb
mongoose
  .connect(
    `mongodb+srv://${envUserName}:${envPassWord}@mainnikedb.jx4pwkk.mongodb.net/banaoNode`
  )
  .then(() => console.log("mongodb connected"))
  .catch((error) => {
    console.log("mongodb error: ", error);
  });

//! Registration Schema
const registerSchema = new mongoose.Schema({
  registerEmail: {
    type: String,
    unique: true,
  },
  registerPassword: {
    type: String,
  },
});

//! Registration Model
const registerModel = mongoose.model("register", registerSchema);

app.get("/", (req, res) => {
  res.send("<h1>This Shit Is working</h1>");
});

//! Register Endpoint
app.post("/register", async (req, res) => {
  const { bodyRegisterEmail, bodyRegisterPassword } = req.body;
  try {
    const checkUserExist = await registerModel.findOne({
      registerEmail: bodyRegisterEmail,
    });
    if (checkUserExist) {
      return res.status(400).json({ userExist: "User already exists" });
    } else {
      const addRegister = await registerModel.create({
        registerEmail: bodyRegisterEmail,
        registerPassword: bodyRegisterPassword,
      });
      res.status(200).json({
        registerStatus: "user Register SuccessFully",
        registerInfo: addRegister,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error Found on register " });
  }
});

//! Login Endpoint
app.post("/login", async (req, res) => {
  const { bodyLoginEmail, bodyLoginPassword } = req.body;
  try {
    const userExist = await registerModel.findOne({
      registerEmail: bodyLoginEmail,
    });
    if(userExist && userExist.registerPassword === bodyLoginPassword) {
        res.status(200).json({loginStatus: "success", loginInfo: userExist})
    } else{
        res.status(400).json({loginStatus: "wrong email or password"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error Found on Login " });
  }
});



app.listen(port, () => {
  console.log(`server is live on port ${port}`);
});
