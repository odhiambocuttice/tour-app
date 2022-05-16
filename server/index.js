import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import UserRouter from "./routes/user.js";

dotenv.config();

const app = express();
const port = 5000;

const mongoUrl =
  process.env.MONGODB_URL ||
  "mongodb+srv://cuttice:3taNrWUbAFTxytky@cluster0.kb4co.mongodb.net/?retryWrites=true&w=majority";

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", UserRouter); // http://localhost:5000/users/signup

mongoose
  .connect(mongoUrl)
  .then(() =>
    app.listen(port, () => console.log(`Server started on port ${port}`))
  )
  .catch((err) => console.log(err));
