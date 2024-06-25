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
    start_date: "2006-01-01", 
    end_date: "", 
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
  }, [filters]); // Re-run when filters change

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
    console.log('handleDateRangeChange:', range);
    if (range.start) {
      handleFilterChange('start_date', range.start);
    }
    if (range.end) {
      handleFilterChange('end_date', range.end);
    }
  };

  const handleFilterSubmit = (filtersToSubmit = filters) => {
    console.log('handleFilterSubmit:', filters); 
  
    const modifiedFilters = {
      ...filtersToSubmit,
      entry_age: filtersToSubmit.entry_age.map(age => age !== null && age.startsWith('Age') ? age : age !== null ? `Age${age}` : age),
      start_date: filtersToSubmit.start_date,
      end_date: filtersToSubmit.end_date
    };
  
    console.log('modifiedFilters:', modifiedFilters); 
    
    axios.post('http://localhost:3001/api/filterValue', modifiedFilters)
      .then(response => {
        setFilteredData(response.data);
        localStorage.setItem('filters', JSON.stringify(modifiedFilters));
        setTimeout(() => {
          window.location.reload();
        }, 0);
        console.log("post");
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
    console.log("reset");
  };

  return (
  <nav className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full mt-4">
    <div className="bg-white text-secondary w-full md:w-1/2 lg:w-1/4 h-20 md:h-24 rounded-xl p-2 flex items-center justify-center shadow-md">
      <DateRangeComp onDateRangeChange={handleDateRangeChange} />
    </div>
    <div className="bg-white text-secondary w-full md:w-1/2 lg:w-1/4 h-20 md:h-24 rounded-xl p-2 shadow-xl flex items-center justify-center">
      <CountrySelect countries={countries} onCountrySelect={handleCountrySelect} />
    </div>
    <div className="bg-white text-secondary w-full md:w-1/2 lg:w-1/4 h-20 md:h-24 rounded-xl p-2 flex justify-center items-center shadow-xl">
      <AgeOptions onAgeRangesChange={handleAgeRangesChange} />
    </div>
    <div className="bg-white text-secondary w-full md:w-1/2 lg:w-1/4 h-20 md:h-24 rounded-xl p-2 flex justify-center items-center shadow-xl">
      <GenderSelected onGenderSelect={handleGenderSelect} onFilterChange={handleFilterChange} />
    </div>
    <div className="flex flex-col items-center w-full md:w-auto mt-4 md:mt-0">
      <button className="bg-white text-secondary border border-secondary rounded-full mb-2 w-full md:w-48 h-10 text-sm md:text-md font-bold" onClick={handleResetAndSubmit}>Réinitialiser les filtres</button>
      <button className="bg-secondary text-white rounded-full w-full md:w-48 h-10 text-sm md:text-md font-bold" onClick={() => handleFilterSubmit(filters)}>Envoyer les filtres</button>
    </div>  
  </nav>
);
};

export default FilterOption;
