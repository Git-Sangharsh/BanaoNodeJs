import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config as dotenvConfig } from "dotenv";
import mongoose from "mongoose";

const app = express();
const port = 5000;
dotenvConfig();

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

app.post("/register", async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error Found on register " });
  }
});

app.listen(port, () => {
  console.log(`server is live on port ${port}`);
});
