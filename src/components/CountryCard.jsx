import React from "react";

const CountryCard = ({data}) => {
  let cName = data.name.common;
  let cFlag = data.flags.svg;
  let cPopulation = data.population;
  return (
    <div className=" border-blue-400 border-4 m-2">
      <img src={cFlag} alt={cName} style={{ width: "100%", height: "" }} />
      <div className="container">
        <h4>
          <b>{cName}</b>
        </h4>
        <p>
          <b>Total Population:</b> {cPopulation}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
