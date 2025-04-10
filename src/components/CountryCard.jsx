import React from 'react';

const CountryCard = ({ data }) => {
  const { name, flags, population, region, capital } = data;

  // Handle cases where capital might be an array or missing
  const displayCapital = Array.isArray(capital) ? capital.join(', ') : capital || 'N/A';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 cursor-pointer">
      <img
        src={flags.svg}
        alt={`Flag of ${name.common}`}
        className="w-full h-40 object-cover border-b border-gray-200"
        loading="lazy" // Add lazy loading for images
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-xl mb-2 text-gray-800 truncate" title={name.common}>
          {name.common}
        </h3>
        <div className="text-sm text-gray-600 space-y-1 flex-grow">
          <p>
            <span className="font-semibold">Population:</span>{' '}
            {population.toLocaleString() || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Region:</span> {region || 'N/A'}
          </p>
          <p>
            <span className="font-semibold">Capital:</span> {displayCapital}
          </p>
        </div>
        {/* You could add a button or link here if needed */}
      </div>
    </div>
  );
};

export default CountryCard;
