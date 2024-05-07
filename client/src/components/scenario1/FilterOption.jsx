import React from "react";
import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { Input } from "@mui/material";
import DateRangeComp from "./DateRangeComp";
import GenderSelected from "./GenderSelected";
import axios from "axios";
import CountrySelect from "./CountrySelect";

const FilterOption = () => {
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [stateData, setStateData] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);
  const fetchCountries = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(response.data);
  };
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };
  return (
    <nav className="flex items-center justify-center gap-16 xl:gap-8 mt-4">
      <div className="bg-white text-secondary md:w-full lg:w-3/4 xl:w-80 h-28 rounded-xl p-2 flex items-center justify-center shadow-md flex-col">
        <p className="font-bold">Tranche de date :</p>
        <DateRangeComp />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:w-68 h-28 rounded-xl p-2 shadow-xl flex items-center justify-center flex-col">
        <p className="font-bold">Par pays:</p>
        <CountrySelect countries={countries} onSelect={handleCountrySelect} />
        {selectedCountry && <p>Selected country: {selectedCountry}</p>}
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-28 rounded-xl p-2 flex-cols justify-center shadow-xl">
        <div className="flex-col justify-center w-auto ">
          <p className="font-bold">Tranche d'âge :</p>
          <div className="flex justify-center gap-4">
            <Input
              value={ageRange[0]}
              onChange={(e) =>
                setTemperatureRange([parseInt(e.target.value), ageRange[1]])
              }
              className="appearance-none block w-16 h-10 bg-none text-secondary border border-bg-secondary rounded-lg py-2 px-4 pointer-events-none"
              style={{
                color: "#F6485A",
                fontSize: "18px",
                fontWeight: "bold",
                outline: "none",
                border: "solid 4px #F6485A",
                padding: "2px",
              }}
            />

            <Input
              value={ageRange[1]}
              onChange={(e) =>
                setTemperatureRange([ageRange[0], parseInt(e.target.value)])
              }
              className="appearance-none block w-16 h-10 bg-none text-secondary border border-bg-secondary rounded-lg py-2 px-4 pointer-events-none"
              style={{
                color: "#F6485A",
                fontSize: "18px",
                fontWeight: "bold",
                outline: "none",
                border: "solid 4px #F6485A",
                padding: "2px",
              }}
            />
          </div>
        </div>
        <Slider
          value={ageRange}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
          color="attrition"
          className="custom-slider"
          style={{
            width: "250px",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            height: "8px",
          }}
          min={18}
          max={67}
        />
      </div>
      <GenderSelected />
    </nav>
  );
};

export default FilterOption;
