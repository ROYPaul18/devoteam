import React, { useState } from "react";

const CountrySelect = ({ countries, className, onCountrySelect, selectedCountry }) => {
  const allCountriesOption = {
    name: { common: "Monde" },
    flags: { svg: "/World.svg" },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedCountry || allCountriesOption);

  const handleCountrySelect = (country) => {
    setSelectedOption(country);
    setIsOpen(false);
    onCountrySelect(country);
  };

  const filteredCountries =
    selectedOption === allCountriesOption ? countries : [selectedOption];

  return (
    <div className="h-full">
      <div
        className="flex items-center px-2 py-1 cursor-pointer w-full h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            src={selectedOption.flags.svg}
            alt={selectedOption.name.common}
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="ml-1 text-3xl min-w-[100px]">
            {selectedOption.name.common}
          </span>
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
            key="all-countries-option"
            className="flex items-center px-2 py-1 cursor-pointer hover w-full"
            onClick={() => handleCountrySelect(allCountriesOption)}
          >
            <img
              src={allCountriesOption.flags.svg}
              alt={allCountriesOption.name.common}
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="ml-1 text-2xl">
              {allCountriesOption.name.common}
            </span>
          </li>
          {countries.map((country, index) => (
            <li
              key={country.cca3 || index} // Utilisation de l'index comme clé de secours
              className="flex items-center px-2 py-2 cursor-pointer hover w-full"
              onClick={() => handleCountrySelect(country)}
            >
              <img
                src={country.flags.svg}
                alt={country.name.common}
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
