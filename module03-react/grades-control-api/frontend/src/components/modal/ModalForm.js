import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import style from "./modal.module.css";
import * as api from "../../api/apiService";

Modal.setAppElement("#root");

export default function ModalForm({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type, value } = selectedGrade;
  // adding states for grades, validation and eror message
  const [gradeValue, setGradeValue] = useState(value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // first things first: open/closing the modal
  useEffect(() => {
    // passing js to add av evet listener
    // keydown will activate the function when the key ESC/Escape is pressed
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // to cleanup, just remove the event
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  // handle the event listenter
  const handleKeyDown = (event) => {
    //passing the key value we want in our event - ESCP/Escape
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  // once you can control the modal, define what to display inside
  // setting validation for user inputs
  useEffect(() => {
    const activeValidation = async () => {
      const validation = await api.validationTypes(type);
      setGradeValidation(validation);
    };
    activeValidation();
  }, [type]);

  // set the error message state when the user types any value different from the validation
  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `Information typed is not valid. Range grades allowed between ${minValue} and ${maxValue} only`
      );
      return;
    }
    setErrorMessage("");
  }, [gradeValue, gradeValidation]);

  // activated when the input changes
  const handleInputChange = (event) => {
    setGradeValue(+event.target.value);
  };
  // setting the modal closing button
  const handleButtonClose = () => {
    onClose(null);
    console.log("closing modal");
  };

  // dealing with form submit
  const handleFormSubmit = (event) => {
    // add prevent default
    event.preventDefault();
    const formData = {
      id,
      newGradeValue: gradeValue,
    };
    onSave(formData);
  };
 
  return (
    <>
      <Modal isOpen={true}>
        <div className={style.modal__header}>
          <h2>UPDATING STUDENT GRADES</h2>
          {/* button className={[style.A, style.B, style.C]}> */}
          <button
            className={`${style.btn} ${style["btn--close"]}`}
            onClick={handleButtonClose}
          >
            X
          </button>
          {/* using a created button component does not work <ButtonClose /> */}
        </div>
        <form onSubmit={handleFormSubmit} className={style.modal__form}>
          <label htmlFor="inputname">Student Name</label>
          <input type="text" id="inputName" value={student} readOnly />
          <label htmlFor="inputSubject">Module</label>
          <input type="text" id="inputSubject" value={subject} readOnly />
          <label htmlFor="Assingment">Assingment</label>
          <input type="text" id="inputAssingment" value={type} readOnly />
          <label htmlFor="inputGradeValue">Grade</label>
          <input
            type="number"
            min={gradeValidation.minValue}
            max={gradeValidation.maxValue}
            step="1"
            id="inputGradeValue"
            value={gradeValue}
            autoFocus
            onChange={handleInputChange}
          />
          {/* disabled prop set on css and using errorMessage as param to be activated */}
          <button className={style.btn} disabled={errorMessage}>
            SAVE
          </button>
          <span>{errorMessage}</span>
        </form>
      </Modal>
    </>
  );
}
