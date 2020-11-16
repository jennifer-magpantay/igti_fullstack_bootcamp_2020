import express from 'express';
import { Grade } from '../models/gradeModel.js';

const app = express();

// getAll()
app.get("/grades/getAll", async (req, res) => {
  try {
    const student = await Grade.find(
      {},
      { _id: 0, lastModified: 0 }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// getbyId() 
app.get("/grades/getById/", async (req, res) => {
  const input = req.body;
  try {
    const student = await Grade.findOne(
      { _id: input },
      {}
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(`Error to finf id ${input}`, error);
  }
});

// create 
app.post("/grades", async (req, res) => {
  const input = req.body;
  try {
    const student = new Grade(input);
    await student.save();
    console.log(student);
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update by id (and data?) : /grade/${id}
// findOneAndUpdate(filter, update, options) - ERROR
app.put("grades/updateById/", async (req, res) => {
  // get the params values from body
  const input = req.body;
  try {

    const student = await Grade.update(
      { _id: input._id },
      {
        $set:
        {
          name: input.name,
          subject: input.subject,
          type: input.type,
          value: parseInt(input.value)
        }
      }
    )
    res.send(student);
  } catch (error) {
    res.status(500).send(`Error to find id ${input}`, error);
  }
});

// rmobe by id 
app.delete("/grades/removeById", async (req, res) => {
  const input = req.body;
  try {
    const student = await Grade.findOneAndDelete(
      { _id: input },
      { _id: 0, name: 1, subject: 1, type: 1, value: 1, lastModifiec: 0 });
    res.send(student);
  } catch (error) {
    res.status(500).send(`Error to find id ${input}`, error);
  }
});

// remove all 
app.delete("/grades", async (req, res) => {
  try {
    const student = await Grade.deleteMany({});
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// find by name :get(`/grade?name=${name}`); - by req.params not working
app.get("/grades/getByName", async (req, res) => {
  const input = req.body.name;
  try {
    const student = await Grade.find(
      { name: input },
      {}
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(`Error to find the student ${input}`, error);
  }
});

export { app as gradeRouter }