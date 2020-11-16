import React from "react";
import Picture from "./Picture";
import Ranking from "./Ranking";
import Info from "./Info";
import style from "./candidates.module.css";
import Popularity from "./Popularity";
import { formatNumber, formatPercentage } from "../helpers/format";

//this component will hold all information from our list, set inside a card
// information to be displayed: ranking position, picture and info (name, votes, % , rating)
// each component has its own props and styles
export default function Candidate({ candidate, position }) {
  const { id, name, votes, percentage, popularity } = candidate;
  // pictires are saved into the root/public folder
  // use ID to identify the correct pictures for the cards
  const imgID = `${id}.png`;
  //   const imgID = `../assets/${id}.png`; //does not work!!
  return (
    <div className={style.card__container}>
      <div className={style.aside__container}>
        <Ranking>{position}</Ranking>
        <Picture imgSource={imgID} description={name} />
      </div>

      <div className={style.aside__container}>
        <Info>
          <h4>{name}</h4>
          {/* implement format numbers methods */}
          <p>Votes: {formatNumber(votes)}</p>
          <p>Percent: {formatPercentage(percentage)}</p>
          <Popularity value={popularity} />
        </Info>
      </div>
    </div>
  );
}
