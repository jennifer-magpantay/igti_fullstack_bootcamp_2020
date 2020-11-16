import React from "react";
import Card from "./Card";
import Candidate from "./Candidate";
import style from "./candidates.module.css";

 // passing the props candidates, this function will return a new component Candidate for each element from the list/state candidates
  // to read and create these components, lets map the state candidates
  // all those new components are set inside a main container
export default function Candidates({ candidates }) {
 
  return (
    <div className={style.container}>
      {candidates.map((item, i) => {
        return (
          <Card key={i}>
            <Candidate candidate={item} position={i + 1} />
          </Card>
        );
      })}
    </div>
  );
}
