import express from "express";
import cors from "cors";
import route from "./routes/grades.js";
import { promises as fs } from "fs";

//global varianles
global.fileName = "grades.json";

//creating a variable app and setting it to use a json file and cors
const app = express();
app.use(express.json());
app.use(cors());

//seting static files to set an index.html
// app.use(express.static("public"));

//redirecting the requests to another routes file
//app.use("/endpointName", routes); - name your endpoints as nouns and in plural
app.use("/grades", route);

//listening port
app.listen(3000, () => {
  console.log("API running sucessfully");
});
