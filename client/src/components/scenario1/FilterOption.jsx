import React, { useState, useEffect } from "react";
import DateRangeComp from "./DateRangeComp";
import GenderSelected from "./GenderSelected";
import axios from "axios";
import CountrySelect from "./CountrySelect";
import getCountries from "./utils/getCountries";
import AgeOptions from "./AgeOptions";
import translateCca2ToBaseValue from "./utils/translateCca2ToBaseValue";

const FilterOption = (props) => {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    gender: '',
    entry_age: [],
    country: '',
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const filteredCountries = await getCountries();
      setCountries(filteredCountries);
    };

    fetchCountries();
  }, []);

  // Mettre à jour les filtres dans le state
  const handleFilterChange = (filterName, newValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: newValue,
    }));
  };

  // Gestion de la sélection du genre
  const handleGenderSelect = (gender) => {
    handleFilterChange('gender', gender);
  };

  // Gestion de la sélection du pays
  const handleCountrySelect = (country) => {
    handleFilterChange('country', country.cca2);
  };

  // Gestion des plages d'âge
  const handleAgeRangesChange = (checkedAgeRanges) => {
    handleFilterChange('entry_age', checkedAgeRanges);
  };

  // Gestion de la soumission des filtres
  const handleFilterSubmit = () => {
    const translatedCountry = translateCca2ToBaseValue(filters.country);
    const translatedFilters = {
      ...filters,
      country: translatedCountry || filters.country,
      entry_age: filters.entry_age.map(age => 'Age' + age)
    };

    axios.post('http://localhost:3001/api/filterValue', translatedFilters)
      .then(response => {
        console.log('Réponse de l\'API :', response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST :', error);
      });
  };

  // Mettre à jour le composant avec les nouvelles données
  useEffect(() => {
    console.log('Données filtrées mises à jour :', filteredData);
  }, [filteredData]);

  return (
    <nav className="flex items-center justify-center gap-16 xl:gap-8 mt-4">
      <div className="bg-white text-secondary md:w-full lg:w-3/4 xl:w-80 h-28 rounded-xl p-2 flex items-center justify-center shadow-md flex-col">
        <DateRangeComp onFilterChange={handleFilterChange} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:w-68 h-28 rounded-xl p-2 shadow-xl">
        <CountrySelect countries={countries} onCountrySelect={handleCountrySelect} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-28 rounded-xl p-2 flex justify-center items-center shadow-xl">
        <AgeOptions  onAgeRangesChange={handleAgeRangesChange} />
      </div>
      <GenderSelected onGenderSelect={handleGenderSelect} onFilterChange={handleFilterChange}/>
      <button onClick={handleFilterSubmit}>Envoyer la requête</button>
    </nav>
  );
};

export default FilterOption;
