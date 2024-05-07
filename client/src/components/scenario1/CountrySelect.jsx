import React from "react";
const CountrySelect = ({ countries }) => (
  <select className="w-52">
    {countries.map((country) => (
      <option key={country.cca3} value={country.name.common}>
        <img src={country.flags.svg} alt={country.name.common} width="30" height="30"/>
        {country.name.common}
      </option>
    ))}
  </select>
);

export default CountrySelect;