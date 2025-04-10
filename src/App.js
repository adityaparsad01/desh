import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css"; // Ensure Tailwind directives are here
import CountryCard from "./components/CountryCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state on new fetch
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setError("Failed to fetch country data. Please try again later.");
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries.filter(({ name }) => {
    return name.common.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">World Countries Data</h1>
          <div className="relative w-full sm:w-auto">
             <input
              className="border rounded-lg py-2 px-4 w-full sm:w-64 lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              type="text"
              placeholder="Search for a country..."
              value={search} // Controlled component
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* Optional: Add a search icon here */}
          </div>
        </nav>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-150px)]"> {/* Adjust height based on header */}
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg font-semibold text-gray-700">Loading Countries...</p>
            </div>
          </div>
        ) : error ? (
           <div className="flex justify-center items-center h-[calc(100vh-150px)]">
            <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        ) : filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCountries.map((country) => (
              <CountryCard key={country.cca3} data={country} /> // Use a unique key like cca3
            ))}
          </div>
        ) : (
           <div className="text-center py-10">
             <p className="text-xl text-gray-600">No countries found matching your search "{search}".</p>
           </div>
        )}
      </main>

       <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
          <p>&copy; {new Date().getFullYear()} World Countries App. Data from REST Countries API.</p>
      </footer>
    </div>
  );
}

export default App;
