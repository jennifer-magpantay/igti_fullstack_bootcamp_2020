//import express
import express from "express";
import { promises as fs } from "fs";

//create an instance of Router
const router = express.Router();

//add here all the routes of your requests
//get() all accounts
//http://localhost:3000/account
router.get("/", async (req, res, next) => {
  try {
    //readh the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //to get rid off of nextId from the results, delete it before send data
    delete data.nextId;
    res.send(data);
  } catch (err) {
    next(err);
  }
});

//get with parameters, by id => req.params.id;
//http://localhost:3000/account/5
router.get("/:id", async (req, res, next) => {
  try {
    //readh the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //find the id in the file
    const idAcc = data.accounts.find(
      (item) => item.id === parseInt(req.params.id)
    );
    //adding validation?
    res.send(idAcc);
  } catch (err) {
    next(err);
  }
});

//.post() new infot into a json file
//http://localhost:3000/account
router.post("/", async (req, res, next) => {
  try {
    //create an variable that will hold the result of our request
    let acc = req.body;
    //adding validation to your method: if name or balance are empty
    if (!acc.name || acc.balance == null) {
      throw new Error("Name and Balance are mandatory inputs");
    }
    //then, read the json and push this variables into the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //defining your new account elements and setting an incremented id
    acc = { id: data.nextId++, name: acc.name, balance: acc.balance };
    //push all new info into json
    data.accounts.push(acc);
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(acc);
  } catch (err) {
    next(err);
  }
});

//.put() updates the whole element
//http://localhost:3000/account/
router.put("/", async (req, res, next) => {
  try {
    //following the same logic of post(), using req.body
    let acc = req.body;
    //read the file
    const data = JSON.parse(await fs.readFile(global.fileName));

    //find the index of the element inside the json file, where the item id is === id of the req.body
    const index = data.accounts.findIndex((item) => item.id === acc.id);

    //add a validation to verify the i, before update the infos
    if (index === -1) {
      throw new Error("Register not found");
    }
    //adding validation to your method: if name or balance are empty
    if (!acc.id || !acc.name || acc.balance == null) {
      throw new Error("ID, Name and Balance are mandatory inputs");
    }
    //onde it is found, set it as the variable
    data.accounts[index].name = acc.name;
    data.accounts[index].balance = acc.balance;
    //now, over write the file
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    next(err);
  }
});

//patch() updates justa piece of information of the element
//you have to define what you want to update (name? balance?)
//http://localhost:3000/account/updateBalance/
router.patch("/updateBalance", async (req, res, next) => {
  try {
    //following the same logic of post(), using req.body
    let acc = req.body;
    //read the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //find the index of the element inside the json file, where the item id is === id of the req.body
    const index = data.accounts.findIndex((item) => item.id === acc.id);
    //add a validation to verify id and balance, before update the infos
    if (index === -1) {
      throw new Error("Register not found");
    }
    //adding validation to your method: if name or balance are empty
    if (!acc.id || acc.balance == null) {
      throw new Error("ID and Balance are mandatory inputs");
    }
    //onde it is found, set it as the variable
    data.accounts[index].balance = acc.balance;
    //now, over write the file
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    next(err);
  }
});
//.delete() based an id
//http://localhost:3000/account/5
router.delete("/:id", async (req, res, next) => {
  try {
    //read the file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //filter id we want to remove
    data.accounts = data.accounts.filter(
      (item) => item.id !== parseInt(req.params.id)
    );
    //and over write the file, without the chosen id
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    //finishing the request
    res.end();
  } catch (err) {
    next(err);
  }
});

//adding an error treatment for all endpoints
//once you have decided to use an error treatment, you have to add next to all your endpoints after req,res
//also, use next(err); insted res.status
router.use((err, _req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
