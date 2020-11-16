import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
import GradesControl from "./components/grades/GradesControl";
import ModalForm from "./components/modal/ModalForm";
import { without } from "lodash";

// import api services
import * as api from "./api/apiService";

export default function App() {
  // set states
  const [grades, setGrades] = useState([]); //empty array
  const [selectedGrade, setSelectedGrade] = useState({}); //empty object
  const [isModalOpen, setIsModalOpen] = useState(false); //boolead false

  // setting the states by useEffect
  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      // pass a setTimeout() function to hold the display for 2 secs
      setTimeout(() => {
        // then, set the grades state
        setGrades(grades);
      }, 2000);
    };
    getGrades();
  }, []);

  // testing: once we are trying to get the data by the spi services, we have to implement this function to avoid promises <pending> as error message
  /*
    const getApi = async () => {
    const result = await api.getAllGrades();
    console.log(result);
  };
  getApi();
  */
  //  adding handle events
  const handleDelete = async (gradeID) => {
    // call the method from API to delete the grade according to its ID
    const gradeDeleted = await api.deleteGrade(gradeID);
    // console.log(gradeDeleted); //return "true"
    // console.log("Deleting ID: ", gradeID);
    // once the delete is done, create a temporary list to save a copy of the grades without the deleted element
    if (gradeDeleted) {
      // set the temorary list with the same content/values of grades
      let tempList = grades;
      // install loadash and import {without}
      // without will filter the ID from the temporary List and set it as grades to over write
      tempList = without(tempList, gradeID);
      setGrades(tempList);
    }
  };

  // this will open the modal loading the information related to the ID clicked
  const handlePersist = (gradeID) => {
    setSelectedGrade(gradeID);
    setIsModalOpen(true);
  };
  // both handle close and persistData will close the modal in different situations
  // close: when a button 'close' is pressed
  const handleClose = () => {
    setIsModalOpen(false);
  };
  // persistData: when enter or button save are pressed
  const handlePersistData = async (formData) => {
    // getting formData infos from Modal
    const { id, newGradeValue } = formData;
    // then, to start the update process: pass a copy of grades into a temporary list
    let tempList = grades;
    // find the item we have clicked by id match
    const updateGrade = tempList.find((item) => item.id === id);
    // saving the new grade value typed into a variable
    updateGrade.value = newGradeValue;
    // passing this variable as param to the updateGrade method - from aour api services
    await api.updateGrade(updateGrade);
    // then, close the modal
    setIsModalOpen(false);
  };

  // adding data?
  /* 
  await api.insertGrade(gradeToPersist);
*/
  return (
    <>
      <Header>
        <h1>IGTI GRADES CONTROL</h1>
        <hr />
      </Header>
      {/* displaying the grades results : if the grades lenght if greater than 0, then displauy. ottherwise, display a loading message */}
      {grades.length === 0 && <Loader />}
      {grades.length > 0 && (
        <GradesControl
          grades={grades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModalOpen && (
        <ModalForm
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </>
  );
}
