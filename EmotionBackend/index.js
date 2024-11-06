import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import { APIrouter } from "./routes/routes.js";
import fs from "fs";
import path from "path";
import { Parser } from "json2csv";
import { EmoReadWrite, EmoSurvey } from "./model/model.js";

///////////////////////////////////////////////// app set-up //////////////////////////////////////////////////
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", APIrouter);

///////////////////////////////////////////////// cors set-up //////////////////////////////////////////////////
var corsOptions = {
  origin: ['http://localhost:80', 'http://localhost:60312'],
  credentials: true,
  optionsSuccessStatus: 200,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:60312", // Allow CORS from any origin
    "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS", // Allow all HTTP methods
    "Access-Control-Allow-Headers": "*", // Allow specified headers
  },
};
console.log(`Backend Start`);
//////////////////////////////////////////////////  mongoDB ///////////////////////////////////////////////////

const mongoURLString = "mongodb+srv://liangluya:liangluya@cluster0.awhbvnl.mongodb.net/Emotion?retryWrites=true&w=majority";
// const mongoURLString = process.env.MONGO_URI;

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

// Route to export data to CSV
app.get('/export/csv', async (req, res) => {
  try {
      const data = await EmoReadWrite.find().lean();
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(data);

      res.header('Content-Type', 'text/csv');
      res.attachment('data.csv');
      res.send(csv);
  } catch (err) {
      res.status(500).send(err.toString());
  }
});

// Route to export EmoSurvey data to CSV
app.get('/export/survey/csv', async (req, res) => {
  try {
    const data = await EmoSurvey.find().lean();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('survey_data.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

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