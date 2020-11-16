import React from "react";
import style from "./gradesControl.module.css";
import formater from "../../helper/formater";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";
// import ButtonAdd from "../buttons/ButtonAdd";

// this function should display one table for each student (0r by student X subject), separetedly - not one table holding all grades at once
export default function GradesControl({ grades, onDelete, onPersist }) {

  // to add the ordered table
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade);
  });

  // Após o loop, devemos inserir
  // o último elemento
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });

  // handle events to edit or delete data
  const handleButtonClick = (id, type) => {
    const gradeID = grades.find((item) => item.id === id);
    // if button type is === to delete, the call onDelete, otherwise, call onPersist
    type === "delete" ? onDelete(gradeID) : onPersist(gradeID);
    // (type === "delete") { onDelete(gradeID); }
    // (type === "edit") { onPersist(gradeID); }
    // (type === "add") { onAdd() }
  };

  return (
    <div className={style.table__container}>
      {/* // add reduce() to calcuate the total grade and set into footer/tfoot */}
      {tableGrades.map(({ id, grades }) => {
        const totalGrades = grades.reduce((acc, curr) => acc + curr.value, 0);
        const feedbackGrades = totalGrades >= 70 ? "Pass" : "Repeat Module";
        return (
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Module</th>
                <th>Assignment</th>
                <th>Grades</th>
                <th>&nbsp;</th>
                {/* <ButtonAdd onAdd={handleButtonClick} type="add" /> */}
              </tr>
            </thead>
            <tbody>
              {/* adding map to read the grades */}
              {grades.map(
                ({ id, student, subject, type, value, isDeleted }, i) => {
                  // using i as key for the table rows. without it will return error about the id of the rows and id of the grade element!!
                  return (
                    <tr key={i}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{formater(value)}</td>
                      {/* <td>{isDeleted ? "--" : formater(value)}</td> */}
                      {/* <td>{isDeleted}</td> */}
                      <td>
                        {/* padd the button to add or delete - each button has to pass a id as props, to identify the id we want to work on */}
                        <ButtonEdit
                          id={id}
                          onEdit={handleButtonClick}
                          type="edit"
                        />
                        <ButtonDelete
                          id={id}
                          onDelete={handleButtonClick}
                          type="delete"
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot>
              {/* add a Total Grades as footer */}
              <tr className={style.grade__footer}>
                <td>TOTAL GRADES</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>{totalGrades}</td>
                <td>{feedbackGrades}</td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
}
