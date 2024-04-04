import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { APIrouter } from "./routes/routes.js";

///////////////////////////////////////////////// app set-up //////////////////////////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", APIrouter);

///////////////////////////////////////////////// cors set-up //////////////////////////////////////////////////
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:5173", // Allow CORS from any origin
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS", // Allow all HTTP methods
    "Access-Control-Allow-Headers": "*", // Allow specified headers
  },
};
console.log(`Backend Start`);
//////////////////////////////////////////////////  mongoDB ///////////////////////////////////////////////////
// const mongoURLString = process.env.DATABASE_URL;
// const mongoURLString = "mongodb://liangluya:liangluya@localhost:27017/Emotion";
// "mongodb+srv://liangluya:liangluya@cluster0.awhbvnl.mongodb.net/Emotion?retryWrites=true&w=majority"
const mongoURLString = "mongodb+srv://liangluya:liangluya@cluster0.awhbvnl.mongodb.net/Emotion?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURLString);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

let port = process.env.PORT || 3000 ;
// if (port == null || port == "") {
//   port = 3000;
// }

//Connect to the database before listening
connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
    console.log(port);
  });
});

const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

///////////////////////////////////////////////  port /////////////////////////////////////////////////////////
// app.listen(port, function () {
//   console.log(`Server is running on ${port}`);
// });

export default app; 