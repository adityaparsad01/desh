import React from 'react'

const CountryCard = (props) => {
    let cName = props.name.common;
    let cFlag = props.flags.svg;
    let cPopulation = props.population;
    return (
      <>
  <div className="country">
        <img src={cFlag} alt={cName} style={{ width: "100%", height: "" }} />
        
  <div className="container">
      <h4><b>{cName}</b></h4> 
      <p><b>Total Population:</b> {cPopulation}</p> 
    </div>
  </div>
      </>
    );
}

export default CountryCard