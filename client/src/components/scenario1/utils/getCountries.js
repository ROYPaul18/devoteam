import axios from "axios";

const getCountries = async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  const jsonCountries = {
    "AE": "L1",
    "SA": "L2",
    "DE": "L3",
    "JO": "L4",
    "FR": "L5",
    "BE": "L6",
    "MA": "L7",
    "ES": "L8",
    "LU": "L9",
    "CZ": "L10",
    "DK": "L11",
    "AT": "L12",
    "NO": "L13",
    "GB": "L14",
    "TR": "L15",
    "IT": "L16",
    "TN": "L17",
    "MX": "L18",
    "RU": "L19",
    "SE": "L20",
    "PT": "L21",
    "SK": "L22",
    "RS": "L23",
    "SG": "L24",
    "PL": "L25",
    "ID": "L26",
    "NL": "L27",
    "LT": "L28"
  };

  const countries = response.data.map((country) => ({
    cca2: country.cca2, 
    name: {
      common: country.name.common,
    },
    capital: country.capital ? country.capital[0] : "",
    flags: {
      svg: country.flags.svg,
    },
  }));
  
  const filteredCountries = countries.filter(country => jsonCountries.hasOwnProperty(country.cca2));
  console.log(filteredCountries)
  return filteredCountries;
  
};

export default getCountries;