// src/utils/translateCca2ToBaseValue.js

const jsonCountriesInverse = {
    "L1": "AE",
    "L2": "SA",
    "L3": "DE",
    "L4": "JO",
    "L5": "FR",
    "L6": "BE",
    "L7": "MA",
    "L8": "ES",
    "L9": "LU",
    "L10": "CZ",
    "L11": "DK",
    "L12": "AT",
    "L13": "NO",
    "L14": "GB",
    "L15": "TR",
    "L16": "IT",
    "L17": "TN",
    "L18": "MX",
    "L19": "RU",
    "L20": "SE",
    "L21": "PT",
    "L22": "SK",
    "L23": "RS",
    "L24": "SG",
    "L25": "PL",
    "L26": "ID",
    "L27": "NL",
    "L28": "LT"
  };
  
  const translateCca2ToBaseValue = (cca2) => {
    return Object.keys(jsonCountriesInverse).find(key => jsonCountriesInverse[key] === cca2);
  };
  
  export default translateCca2ToBaseValue;
  