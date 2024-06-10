import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangeComp from "./DateRangeComp";
import GenderSelected from "./GenderSelected";
import CountrySelect from "./CountrySelect";
import AgeOptions from "./AgeOptions";
import translateCca2ToBaseValue from "./utils/translateCca2ToBaseValue";

const FilterOption = () => {
  const defaultFilters = {
    gender: '',
    entry_age: [
      null, 'Age1-19', 'Age20-24', 'Age25-29', 'Age30-34', 'Age35-39',
      'Age40-44', 'Age45-49', 'Age50-54', 'Age55-59', 'Age60+'
    ],
    location: '',
    start_date: [],
  };

  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters ? JSON.parse(savedFilters) : defaultFilters;
  });

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const fetchFilteredData = async (filters) => {
    try {
      const modifiedFilters = {
        ...filters,
        entry_age: filters.entry_age.map(age => age !== null && age.startsWith('Age') ? age : age !== null ? `Age${age}` : age)
      };
      const response = await axios.post('http://localhost:3001/api/filterValue', modifiedFilters);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  useEffect(() => {
    fetchFilteredData(filters);
  }, []); // Only run once on mount

  const handleFilterChange = (filterName, newValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: newValue,
    }));
  };

  const handleGenderSelect = (gender) => {
    handleFilterChange('gender', gender);
  };

  const handleCountrySelect = (country) => {
    const translatedCountry = country ? translateCca2ToBaseValue(country.cca2) : "";
    handleFilterChange('location', translatedCountry || ""); 
  };

  const handleAgeRangesChange = (checkedAgeRanges) => {
    handleFilterChange('entry_age', checkedAgeRanges);
  };

  const handleDateRangeChange = (range) => {
    handleFilterChange('start_date', range);
  };

  const handleFilterSubmit = (filtersToSubmit = filters) => {
    const modifiedFilters = {
      ...filtersToSubmit,
      entry_age: filtersToSubmit.entry_age.map(age => age !== null && age.startsWith('Age') ? age : age !== null ? `Age${age}` : age)
    };

    axios.post('http://localhost:3001/api/filterValue', modifiedFilters)
      .then(response => {
        setFilteredData(response.data);
        localStorage.setItem('filters', JSON.stringify(modifiedFilters));
        setTimeout(() => {
          window.location.reload();
        }, 0);
      })
      .catch(error => {
        console.error('Error during POST request:', error);
      });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    localStorage.setItem('filters', JSON.stringify(defaultFilters));
    handleFilterSubmit(defaultFilters);
  };

  const clearCache = () => {
    localStorage.clear();
  };

  const handleResetAndSubmit = () => {
    setFilters(defaultFilters);
    localStorage.setItem('filters', JSON.stringify(defaultFilters));
    clearCache();
    handleFilterSubmit(defaultFilters); 
  };

  return (
    <nav className="flex items-center justify-center gap-16 xl:gap-8 mt-4">
      <div className="bg-white text-secondary md:w-full lg:w-3/4 xl:w-80 h-28 rounded-xl p-2 flex items-center justify-center shadow-md flex-col">
        <DateRangeComp onDateRangeChange={handleDateRangeChange} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:w-68 h-28 rounded-xl p-2 shadow-xl flex items-center justify-center">
        <CountrySelect countries={countries} onCountrySelect={handleCountrySelect} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-28 rounded-xl p-2 flex justify-center items-center shadow-xl">
        <AgeOptions onAgeRangesChange={handleAgeRangesChange} />
      </div>
      <GenderSelected onGenderSelect={handleGenderSelect} onFilterChange={handleFilterChange} />
      <div className="flex flex-col items-center">
        <button className="bg-white text-secondary border border-secondary rounded-full mb-2 w-48 h-12 text-md font-bold" onClick={handleResetAndSubmit}>Réinitialiser les filtres</button>
        <button className=" bg-secondary text-white rounded-full  w-48 h-12 text-md font-bold" onClick={() => handleFilterSubmit(filters)}>Envoyer les filtres</button>
      </div>  
    </nav>
  );
};

export default FilterOption;