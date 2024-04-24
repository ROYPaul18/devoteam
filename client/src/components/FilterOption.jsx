import React from "react";
import { useState,useEffect } from "react";
import { Slider } from "@mui/material";
import { Input } from "@mui/material";
import DateRangeComp from "./scenario1/DateRangeComp";
import GenderSelected from "./scenario1/GenderSelected";
import Selector from "./scenario1/Selector";
import {Country, State } from "country-state-city";
const FilterOption = () => {
 
  let countryData = Country.getAllCountries();
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [stateData, setStateData] = useState();
  const [country, setCountry] = useState(countryData[0]);
 
  const handleAgeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  return (
    <nav className="flex items-center justify-center gap-16 xl:gap-8">
      <div className="bg-white text-secondary md:w-full lg:w-3/4 xl:w-80 h-28 rounded-xl p-2 flex items-center justify-center shadow-md flex-col">
      <p className="font-bold">
        Tranche de date : 
        </p>
        <DateRangeComp />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:w-68 h-28 rounded-xl p-2 shadow-xl flex items-center justify-center flex-col">
      <p className="font-bold">
        Par pays:
      </p>
      <Selector
              data={countryData}
              selected={country}
              setSelected={setCountry}

       />
      </div>
      <div className="bg-white text-secondary w-80 xl:w-68 lg:68 h-28 rounded-xl p-2 flex-cols justify-center shadow-xl" >
        <div className="flex-col justify-center w-auto ">
        <p className="font-bold">
        Tranche d'âge : 
        </p>
        <div className="flex justify-center gap-4">
          <Input
            value={ageRange[0]}
            onChange={(e) =>
              setTemperatureRange([parseInt(e.target.value), ageRange[1]])
            }
            className="appearance-none block w-16 h-10 bg-none text-secondary border border-bg-secondary rounded-lg py-2 px-4 pointer-events-none"
            style={{ color: '#F6485A', fontSize: "18px",fontWeight:'bold', outline: 'none', border: 'solid 4px #F6485A', padding:"2px", }}
         />

          <Input
            value={ageRange[1]}
            onChange={(e) =>
              setTemperatureRange([ageRange[0], parseInt(e.target.value)])
            }
            className="appearance-none block w-16 h-10 bg-none text-secondary border border-bg-secondary rounded-lg py-2 px-4 pointer-events-none"
            style={{ color: '#F6485A', fontSize: "18px",fontWeight:'bold', outline: 'none', border: 'solid 4px #F6485A', padding:"2px", }}
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
            height: '8px'
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
