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

const countryNames = {
    "AE": "United Arab Emirates",
    "SA": "Saudi Arabia",
    "DE": "Germany",
    "JO": "Jordan",
    "FR": "France",
    "BE": "Belgium",
    "MA": "Morocco",
    "ES": "Spain",
    "LU": "Luxembourg",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "AT": "Austria",
    "NO": "Norway",
    "GB": "United Kingdom",
    "TR": "Turkey",
    "IT": "Italy",
    "TN": "Tunisia",
    "MX": "Mexico",
    "RU": "Russia",
    "SE": "Sweden",
    "PT": "Portugal",
    "SK": "Slovakia",
    "RS": "Serbia",
    "SG": "Singapore",
    "PL": "Poland",
    "ID": "Indonesia",
    "NL": "Netherlands",
    "LT": "Lithuania"
};

const locationInverse = (locationCode) => {
    const countryCode = jsonCountriesInverse[locationCode];
    return countryNames[countryCode] || "Unknown";
};

export default locationInverse;