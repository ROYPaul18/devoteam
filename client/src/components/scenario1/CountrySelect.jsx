import React, { useState } from "react";

const CountrySelect = ({ countries, className, onCountrySelect }) => {
  const allCountriesOption = {
    name: { common: "Monde" },
    flags: { svg: "/World.svg" },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(allCountriesOption);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    onCountrySelect(country);
  };

  const filteredCountries = selectedCountry === allCountriesOption ? countries : [selectedCountry];

  return (
    <div className="h-full">
      <div
        className="flex items-center px-2 py-1 cursor-pointer w-full h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            src={selectedCountry.flags.svg}
            alt={selectedCountry.name.common}
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="ml-1 text-3xl min-w-[100px]">{selectedCountry.name.common}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={5}
          stroke="currentColor"
          className="w-6 h-6 ml-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <li
            key="all"
            className="flex items-center px-2 py-1 cursor-pointer hover w-full"
            onClick={() => handleCountrySelect(allCountriesOption)}
          >
            <img
              src={allCountriesOption.flags.svg}
              alt={allCountriesOption.name.common}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="ml-1 text-2xl">{allCountriesOption.name.common}</span>
          </li>
          {countries.map((country) => (
            <li
              key={country.cca3}
              className="flex items-center px-2 py-2 cursor-pointer hover w-full"
              onClick={() => handleCountrySelect(country)}
            >
              <img
                src={country.flags.svg}
              
                className="w-12 h-12 object-cover rounded-full"
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
