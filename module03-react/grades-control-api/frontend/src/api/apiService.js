import axios from "axios";

// this file will hold all functions that will deal with all requests from the API
// this will also support the frontend components

// declare the url as variable - we will use if quite often during the requests
const URL = "http://localhost:3001/grade";

//add a validation document to be used mainly when a user has to edit or add a new grade
//this holds the basic values and anything different of that wont be accept by the app
const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: "Exercícios",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: "Trabalho Prático",
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: "Desafio",
    minValue: 0,
    maxValue: 50,
  },
];

// here we are about to add our HTTP requests (GET, POST, PUT, DELETE)

// 1) add a function to get all grades - lets use axios in this app
async function getAllGrades() {
  const result = await axios.get(URL);
  // maping data/result
  const grades = result.data.grades.map((item) => {
    // get item we will need and add student,subject and type as lowercase objects to help us to better perform during the requests in ur application
    const { id, student, subject, type, value} = item;
    return {
      id,
      student,
      subject,
      type,
      studentLowerCase: item.student.toLowerCase(),
      subjectLowerCase: item.subject.toLowerCase(),
      typeLowerCase: item.type.toLowerCase(),
      value,
         };
    // ps: {...item} will return the whole document, without mapping the data
  });

  // 2) after have our map done, lets add a method to check is there is any missing information - why ???
  // but firstly, lets add a new Set() for each key element (student, subject, type)
  // students
  let students = new Set();
  grades.forEach((item) => students.add(item.student));
  // tranform the result into array
  students = Array.from(students);

  // subjects
  let subjects = new Set();
  grades.forEach((item) => subjects.add(item.subject));
  subjects = Array.from(subjects);

  // types
  let types = new Set();
  grades.forEach((item) => types.add(item.type));
  types = Array.from(types);

  // lets aslso add a method to generate our id
  // ps: do not use grades.length + 1 - this could gives to you duplicate ids after you delete some and try to add again some of them
  // simly because it will be based on the length of the array and not on the last or max ID number!
  // use instead:
  let maxID = -1;
  grades.forEach(({ id }) => {
    if (id > maxID) {
      maxID = id;
    }
  });

  // 3) now that the key elements are set, lets create a variable to hold all combinations mixed/set automatically their values into each new set
  // use nested forEach for that and push at the end to add the combinations into the grades
  const combinations = [];
  students.forEach((student) => {
    subjects.forEach((subject) => {
      types.forEach((type) => {
        combinations.push({ student, subject, type });
      });
    });
  });

  /*
  // 4) once the combination is done, lets keep tracking on the missing data
  // now, for each combination lets get student, subject abd type & check if all them has data registered
  // first, add find() method to check if student AND subject AND type are correct
  // combinations.forEach(({ student, subject, type }) => {
  //   const hasItem = grades.find((item) => {
  //     return (
  //       item.student === student &&
  //       item.subject === subject &&
  //       item.type === type
  //     );
  //   });
    // if all items match, them hasItem is true and move forward
    // 5) otherwise, this means that the combination is not in the API. In this case, we have to push it into the grades, generating a new element for out frontend
    // WHYYYY ??????
  //   if (!hasItem) {
  //     grades.push({
  //       id: maxID ++,
  //       student,
  //       studentLowerCase: student.toLowerCase(),
  //       subject,
  //       subjectLowerCase: subject.toLowerCase(),
  //       type,
  //       typeLowerCase: type.toLowerCase(),
  //       value: 0,
  //       isDeleted: true,
  //     });
  //   }
  // });
*/
  // 6) now, lets order the grades by type, subjec and student
  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase));
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase));
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase));

  // finally, return the results
  return grades;
  //return subjects //types //students //combinations
}

// add a new grade (POST)
async function insertGrade(grade) {
  const response = await axios.post(URL, grade);
  return response.data.id;
}

// update/edit grade (PUT)
async function updateGrade(grade) {
  const response = await axios.put(URL, grade);
  return response.data;
}

// delete grade (DELETE)
async function deleteGrade(grade) {
  const response = await axios.delete(`${URL}/${grade.id}`);
  return response.data;
}

// add a validation for types, to avoid the user add any input that does not match the GRADE_VALIDATION
async function validationTypes(gradeType) {
  const validation = GRADE_VALIDATION.find(
    (item) => item.gradeType === gradeType
  );
  return {
    minValue: validation.minValue,
    maxValue: validation.maxValue,
  };
}

export { getAllGrades, insertGrade, updateGrade, deleteGrade, validationTypes };
