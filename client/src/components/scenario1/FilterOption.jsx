import React, { useState, useEffect } from "react";
import axios from "axios";
import DateRangeComp from "./DateRangeComp";
import GenderSelected from "./GenderSelected";
import CountrySelect from "./CountrySelect";
import AgeOptions from "./AgeOptions";
import translateCca2ToBaseValue from "./utils/translateCca2ToBaseValue";



const FilterOption = () => {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters ? JSON.parse(savedFilters) : {
      gender: '',
      entry_age: [],
      location: '',
      start_date: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

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
    handleFilterChange('location', translatedCountry || (country ? country.name.common : "")); 
  };

  const handleAgeRangesChange = (checkedAgeRanges) => {
    handleFilterChange('entry_age', checkedAgeRanges);
  };

  const handleDateRangeChange = (range) => {
    handleFilterChange('start_date', range);
  };

  const handleFilterSubmit = () => {
    const modifiedFilters = {
      ...filters,
      entry_age: filters.entry_age.map(age => `Age${age}`)
    };

    axios.post('http://localhost:3001/api/filterValue', modifiedFilters)
      .then(response => {
        setFilteredData(response.data);
        console.log()
        localStorage.setItem('filters', JSON.stringify(modifiedFilters));
        setTimeout(() => {
          window.location.reload();
        }, []);
      })
      .catch(error => {
        console.error('Error during POST request:', error);
      });
  };
  console.log(localStorage);
  return (
    <nav className="flex items-center justify-center gap-16 xl:gap-8 mt-4">
      <div className="bg-white text-secondary md:w-full lg:w-3/4 xl:w-80 h-28 rounded-xl p-2 flex items-center justify-center shadow-md flex-col">
        <DateRangeComp onDateRangeChange={handleDateRangeChange} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:w-68 h-28 rounded-xl p-2 shadow-xl">
        <CountrySelect countries={countries} onCountrySelect={handleCountrySelect} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-28 rounded-xl p-2 flex justify-center items-center shadow-xl">
        <AgeOptions onAgeRangesChange={handleAgeRangesChange} />
      </div>
      <GenderSelected onGenderSelect={handleGenderSelect} onFilterChange={handleFilterChange} />
      <button className="p-5 bg-secondary text-white rounded-full ml-2" onClick={handleFilterSubmit}>Envoyer les filtres</button>
    </nav>
  );
};

export default FilterOption;