import React, { useState } from "react";

const CountrySelect = ({ countries, defaultValue, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(defaultValue);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="h-full">
      <div
        className="flex items-center px-2 py-1 cursor-pointer w-full h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={selectedCountry.flags.svg}
                alt={selectedCountry.name.common}
                className="w-16 h-16 rounded-full bg-cover"
              />
              <span className="ml-1 text-3xl">
                {selectedCountry.name.common}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        ) : (
          <span>Select a country</span>
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <li
              key={country.cca3}
              className="flex items-center px-2 py-1 cursor-pointer hover w-full"
              onClick={() => handleCountrySelect(country)}
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
                className="w-16 h-16 rounded-full"
              />
              <span className="ml-1 text-2xl">{country.name.common}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelect;
