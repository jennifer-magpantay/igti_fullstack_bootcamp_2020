import React, { useState, useEffect } from "react";
import Candidates from "./components/Candidates";
import Header from "./components/Header";
import Loader from "./components/Loader";

function App() {
  const [candidates, setCadindates] = useState([]);

  // set interval using usEffect
  useEffect(() => {
    // setInterval(() => { //do something }, 1000);
    const interval = setInterval(() => {
      fetch("http://localhost:8080/votes")
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          //   console.log(json);
          setCadindates(json.candidates);
        });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [candidates]);

  if (candidates.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <Header>Following Up Galaxy Election</Header>
      <Candidates candidates={candidates} />
    </div>
  );
}

export default App;
