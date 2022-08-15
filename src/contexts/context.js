import React,{ createContext, useEffect, useState } from "react";
import axios from "axios";


axios
  .get("https://restcountries.com/v3.1/all")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

const CountryContext = createContext();

const UserProvider = ({ children }) => {
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
    }), [search, countries];
    useEffect(() => {
        setFilteredCountries(
        countries.filter(({ name }) => {
            return name.common.toLowerCase().includes(search.toLowerCase());
        })
        );
    }), [search, countries];
    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen w-screen">
            <h1>Loading...</h1>
        </div>
        );
    }
    return (
        <CountryContext.Provider value={{ countries, filteredCountries }}>
        {children}
        </CountryContext.Provider>
    );
    }
export default UserProvider;