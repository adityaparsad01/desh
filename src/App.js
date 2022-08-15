import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(({ name }) => {
        return name.common.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, countries]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className=" container p-2 flex flex-col items-center">
      <h1>Countries Lists</h1>
      <input
        className="search"
        type="text"
        placeholder="Search Countries"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="">
        {filteredCountries.map((country, idx) => (
          <CountryCard key={idx} data={country} />
        ))}
      </div>
    </div>
  );
}

export default App;
