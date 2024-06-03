import React, { useState, useEffect } from "react";
import axios from "axios";
import translateCca2ToBaseValue from './utils/translateCca2ToBaseValue';

const CountrySelect = ({ className, onCountrySelect }) => {
  const allCountriesOption = {
    cca3: 'WLD', // Code fictif pour "Monde"
    cca2: 'WLD', // Ajout du code CCA2 pour "Monde"
    name: { common: "Monde" },
    flags: { svg: "../../../public/World.svg" } // Chemin correct vers l'image du drapeau "Monde"
  };

  const [countries, setCountries] = useState([allCountriesOption]);
  const [selectedOption, setSelectedOption] = useState(allCountriesOption);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const filteredCountries = response.data.filter(country => 
          translateCca2ToBaseValue(country.cca2) // Filtrer pour garder seulement les pays dans jsonCountriesInverse
        ).map(country => ({
          cca3: country.cca3,
          cca2: country.cca2, // S'assurer que cca2 est inclus
          name: { common: country.name.common },
          flags: { svg: country.flags.svg }
        }));
        setCountries([allCountriesOption, ...filteredCountries]);
        setSelectedOption(allCountriesOption); // Définir "Monde" comme pays par défaut
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    loadCountries();
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedOption(country);
    setIsOpen(false);
    onCountrySelect(country); // Passer l'objet complet du pays
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      <div
        className={`flex justify-between items-center px-2 py-1 cursor-pointer w-full ${className}`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <img
            src={selectedOption?.flags.svg}
            alt={selectedOption?.name.common}
            className="w-16 h-16 rounded-full object-cover"
          />
          <span className="ml-1 text-3xl">
            {selectedOption?.name.common}
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
      {isOpen && (
        <ul className="absolute z-100 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto w-full left-0 right-0 top-full">
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
              <span className="ml-1 text-2xl">{country.name.common}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountrySelect;