import React from "react";

// popularity will return the rates of each element/candidate fom the list
// to output the stars according to the rating values, lets create:
// a const to hold the 'alt code' for both states of the stars: full and empty (elements found on: https://www.alt-codes.net/star_alt_code.php)
const STARS = {
  empty: "☆",
  full: "★",
};

// specificy the max range value of the rates
const MAX_VALUE = 10;

export default function Popularity({ value }) {
  // now, inside the function, use repeat() to print out the stars according to its rating value
  const fullStars = STARS.full.repeat(value);
  const emptyStars = STARS.empty.repeat(MAX_VALUE - value);
  return (
    <div>
      {fullStars} {emptyStars}
    </div>
  );
}
