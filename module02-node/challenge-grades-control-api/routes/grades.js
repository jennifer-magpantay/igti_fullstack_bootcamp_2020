import express from "express";
import { promises as fs } from "fs";

//create the instance of Router
const router = express.Router();

//adding route requests
//1) create an endpoint to create a new grade: post(): add to the end a new element
router.post("/", async (req, res, next) => {
  try {
    //create an variable that will hold the result of our request
    let grade = req.body;
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //defining your new account elements and setting an incremented id
    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };
    //timestamp: new Date() will add the current day/time to your json file
    //push at the end all new info into json and write it again
    data.grades.push(grade);
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    console.log(grade);
    res.send(grade);
  } catch (err) {
    next(err);
  }
});

//2) create an endpoint to update a grade, using as params: id, student, subject, type and value
// put(): updates the whole element
router.put("/", async (req, res, next) => {
  try {
    //create an variable that will hold the result of our request
    let grade = req.body;
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //find the index of the element inside the json file, where the item id is === id of the req.body
    const index = data.grades.findIndex((item) => item.id === grade.id);
    // console.log(index); //-1
    //validation: when the ID it is not found, it will return a -1 index. so...
    if (index === -1) {
      throw new Error("ID  not found. Try it again");
    }
    //once it is found, set it the props you want to update
    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    //now, over write the file
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    //return the element
    res.send(data.grades[index]);
  } catch (err) {
    next(err);
  }
});

//3) create an endpoint to delete a grade
// delete(): delets an element based on its id
router.delete("/:id", async (req, res, next) => {
  try {
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //save the deleted id into an temp variable and return to the user
    let index = data.grades.filter(
      (item) => item.id === parseInt(req.params.id)
    );
    //(missind validation here)
    //now, filter id we want to remove from the original json file
    data.grades = data.grades.filter(
      (item) => item.id !== parseInt(req.params.id)
    );
    //and over write it, without the chosen id
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    //return the data deleted
    res.send(index);
  } catch (err) {
    next(err);
  }
});

//4) create an endpoint to get an grade by its id
// get(): return elements based on its id
router.get("/:id", async (req, res, next) => {
  try {
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //find the id/index in the file
    const index = data.grades.find(
      (item) => item.id === parseInt(req.params.id)
    );
    //(missind validation here)
    //return element
    res.send(index);
  } catch (err) {
    next(err);
  }
});

//5) create and endpoint to check the total grade of a student in one subject, using as params: student and subject
//ps: sum the notes of that subject for that student
//get() - lets try by query
//http://localhost:3000/grades?student=value&subject=value
router.get("/", async (req, res, next) => {
  try {
    let query = req.query;
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //filter the information we want using a variable to hold results
    const grade = data.grades.filter(
      (item) => item.student === query.student && item.subject === query.subject
    );
    //adding validation: if the request length does not matcth, then throw an error message
    if (!grade.length) {
      throw new Error("Register not found according to the params");
    }
    //then, apply reduce to the result and pass it into another variable
    const total = grade.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    // finally, return result
    res.send({ total });
    //ps: is doing the sum but is printing a error message togeteher
  } catch (err) {
    next(err);
  }
});

//6) create an endpoint to find the average of and subject and type, using them as params
//get() - lets get it by params
//http://localhost:3000/grades/avg/subjectValue/typeValue
router.get("/avg/:subject/:type", async (req, res, next) => {
  try {
    let query = req.params;
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //filter the information
    const grade = data.grades.filter(
      (item) => item.subject === query.subject && item.type === query.type
    );
    //adding validation
    if (!grade.length) {
      throw new Error("Register not found according to the params");
    }
    //apply reduce to the results
    const total = grade.reduce(
      (previousValue, currentValue) => previousValue + currentValue.value,
      0
    );
    //to find the average value, get the total value and / by the  results lenght
    //return the results
    res.send({ average: total / grade.length });
    //ps: is doing the sum but is printing a error message togeteher
  } catch (err) {
    next(err);
  }
});

//7) create an endpoint to return the greater grades according to an subject and type
// get() by using params
//http://localhost:3000/grades/greater/subjectValue/typeValue
router.get("/greater/:subject/:type", async (req, res, next) => {
  try {
    let query = req.params;
    //read file
    const data = JSON.parse(await fs.readFile(global.fileName));
    //filter the information we want using a variable to hold results
    const grade = data.grades.filter(
      (item) => item.subject === query.subject && item.type === query.type
    );
    //adding validation
    if (!grade.length) {
      throw new Error("Register not found according to the params");
    }
    //maping the results
    const results = grade
      .map((item) => {
        return {
          id: item.id,
          student: item.student,
          subject: item.subject,
          type: item.type,
          value: item.value,
        };
      })
      //then sorting to get the rank
      .sort((a, b) => b.value - a.value);
    //returning a specific amount of grades
    // res.send(results.slice(0, 3));
    res.send(results);
  } catch (err) {
    next(err);
  }
});

//adding error treatment
router.use((err, _req, res, next) => {
  res.status(400).send({ error: err.message });
});

export default router;
