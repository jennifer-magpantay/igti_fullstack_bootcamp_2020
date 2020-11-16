import express from "express";
import route from "./routes/account.js";
import { promises as fs } from "fs";

//adding global variables
global.fileName = "accounts.json";
//create the variable app
const app = express();
//setting the app to use a json file
app.use(express.json());
app.use(cors());
//redirecting the request to the routes file
//seting static files/html index
app.use(express.static("public"));
app.use("/accounts", route);
//listening port
app.listen(3000, async () => {
  //once the api is running, create a json file to hold the information we want to manipulate
  //first, read the file to double check if already exists
  try {
    //reading file
    await fs.readFile(global.fileName);
  } catch (err) {
    console.log("Creating file");
    const initJson = {
      nextId: 1,
      accounts: [],
    };
    await fs.writeFile(global.fileName, JSON.stringify(initJson));
    console.log("API started and file created!");
  }
  console.log("API running sucessfully");
});
