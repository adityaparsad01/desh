import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

function Test() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      //.get("https://waitominuteapi.tk/tnc")
      .then(res => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  return (
    <div className="App">
      <h1>Countries Lists</h1>
      <input
        className="search"
        type="text"
        placeholder="Search Countries"
        onChange={e => setSearch(e.target.value)}
      />
      {filteredCountries.map((country, idx) => (
        <CountryDetail key={idx} {...country} />
      ))}
    </div>
  );
}

const CountryDetail = props => {
  const { name, flag, population,} = props;
  return (
    <>
<div className="country">
      <img src={flag} alt={name} style={{ width: "100%", height: "" }} />
      
<div class="container">
    <h4><b>{name}</b></h4> 
    <p><b>Total Population:</b> {population}</p> 
  </div>
</div>
    </>
  );
};


export default Test;
