import React, { useState, useEffect } from "react";
import axios from "axios";
import translateCca2ToBaseValue from './utils/translateCca2ToBaseValue';

const CountrySelect = ({ className, onCountrySelect }) => {
  const allCountriesOption = {
    cca3: '',
    cca2: '',
    name: { common: "Monde" },
    flags: { svg: "/World.svg" } 
  };

  const [countries, setCountries] = useState([allCountriesOption]);
  const [selectedOption, setSelectedOption] = useState(allCountriesOption);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const filteredCountries = response.data.filter(country => {
          const baseValue = translateCca2ToBaseValue(country.cca2);
          return baseValue;
        }).map(country => ({
          cca3: country.cca3,
          cca2: country.cca2, 
          name: { common: country.name.common },
          flags: { svg: country.flags.svg }
        }));
        setCountries([allCountriesOption, ...filteredCountries]);
        const savedCountry = JSON.parse(localStorage.getItem('selectedCountry'));
        if (savedCountry) {
          setSelectedOption(savedCountry);
          onCountrySelect(savedCountry);
        } else {
          setSelectedOption(allCountriesOption);
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
  
    loadCountries();
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedOption(country);
    setIsOpen(false);

    if (country.name.common === "Monde") {
      onCountrySelect({
        ...country,
        cca2: '' 
      });
    } else {
      onCountrySelect(country);
    }
    localStorage.setItem('selectedCountry', JSON.stringify(country));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full flex justify-center items-center">
  <div
    className={`flex justify-between center items-center my-auto px-4 py-2 cursor-pointer w-full ${className}`}
    onClick={toggleDropdown}
  >
    <div className="flex items-center">
      <img
        src={selectedOption?.flags.svg}
        alt={selectedOption?.name.common}
        className="w-12 h-12 rounded-full object-cover"
      />
      <span className="ml-2 text-3xl md:text-2xl text-secondary"> 
        {selectedOption?.name.common}
      </span>
    </div>
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
      className="w-6 h-6 text-secondary"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </svg>
  </div>
  {isOpen && (
    <ul className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-y-auto w-full left-0 right-0 top-full">
      {countries.map((country, index) => (
        <li
          key={country.cca3 || index}
          className="flex items-center px-2 py-2 cursor-pointer hover:bg-gray-100 w-full"
          onClick={() => handleCountrySelect(country)}
        >
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-12 h-12 object-cover rounded-full"
          />
          <span className="ml-2 text-xl md:text-2xl">{country.name.common}</span> {/* Réduction de la taille de police pour md */}
        </li>
      ))}
    </ul>
  )}
</div>
  );
};

export default CountrySelect;