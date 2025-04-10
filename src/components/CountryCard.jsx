import React, { useState, useEffect, useRef } from 'react';

const CountryCard = ({ data }) => {
  const { name, flags, population, region, capital } = data;

  // Handle cases where capital might be an array or missing
  const displayCapital = Array.isArray(capital) ? capital.join(', ') : capital || 'N/A';

  const [animatedPopulation, setAnimatedPopulation] = useState(0);
  const targetPopulation = population || 0;
  const animationRef = useRef(); // To store requestAnimationFrame ID

  useEffect(() => {
    const start = 0;
    const duration = 1000; // Animation duration in milliseconds
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (targetPopulation - start) + start);

      setAnimatedPopulation(currentCount);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(step);

    // Cleanup function to cancel animation if component unmounts or population changes
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPopulation]); // Rerun effect if targetPopulation changes

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
            {/* Use animatedPopulation and format it */}
            {animatedPopulation.toLocaleString() || 'N/A'}
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
