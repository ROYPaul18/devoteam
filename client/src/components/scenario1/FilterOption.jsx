import React, { useState, useEffect } from "react";
import DateRangeComp from "./DateRangeComp";
import GenderSelected from "./GenderSelected";
import axios from "axios";
import CountrySelect from "./CountrySelect";
import getCountries from "./utils/getCountries";
import AgeOptions from "./AgeOptions";

const FilterOption = (props) => {
  const [countries, setCountries] = useState([]);
  const [gender, setGender] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    gender: 'Male',
    entry_age: [
      '1-19',  '20-24',
      '25-29', '30-34',
      '35-39', '40-44',
      '45-49', '50-54',
      '55-59', '60+'
    ],
  });
  const [selectedFilters, setSelectedFilters] = useState({
    gender: "Female",
    entry_age: [
      '1-19',  '20-24',
      '25-29', '30-34',
      '35-39', '40-44',
      '45-49', '50-54',
      '55-59', '60+'
    ],
  });

  const fetchCountries = async () => {
    const filteredCountries = await getCountries();
    setCountries(filteredCountries);
  };

  const handleGenderSelect = (gender) => {
    setGender(gender);
    props.onFilterChange('gender', gender);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    handleFilterChange('country', country.name.common);
    props.onCountrySelect(country);
  };

  const handleAgeRangesChange = (checkedAgeRanges) => {
    handleFilterChange('ageRanges', checkedAgeRanges);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    console.log('Filters:', filters);
  }, [filters]);

  const handleFilterChange = (filterName, newValue) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: newValue,
    }));
  };

  const handleFilterSubmit = () => {
    console.log('Données à envoyer dans la requête POST :', filters);
    axios.post('http://localhost:3000/api/filter', filters)
      .then(response => {
        console.log("ya",response.data);
        setFilteredData(response.data);
        setSelectedFilters({
          gender: filters.gender,
          location: filters.location,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <nav className="flex items-center justify-center gap-16 xl:gap-8 mt-4">
      <div className="bg-white text-secondary md:w-full lg:w-3/4 xl:w-80 h-28 rounded-xl p-2 flex items-center justify-center shadow-md flex-col">
        <DateRangeComp onFilterChange={handleFilterChange} />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:w-68 h-28 rounded-xl p-2 shadow-xl">
        <CountrySelect countries={countries} onCountrySelect={handleCountrySelect} />
      
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-28 rounded-xl p-2 flex justify-center items-center shadow-xl">
        <AgeOptions onAgeRangesChange={handleAgeRangesChange} />
      </div>
      <GenderSelected onGenderSelect={handleGenderSelect} onFilterChange={handleFilterChange}/>
      <button onClick={handleFilterSubmit}>Envoyer la requête</button>
    </nav>
  );
};

export default FilterOption;
