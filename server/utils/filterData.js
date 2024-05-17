const data = require("../data/random_data_dashboard_all_v3.json");

const filterData = (filters = { gender: null, entry_age: null, location: null }, data) => {
  const { gender, entry_age, location } = filters;

  console.log("Filters:", filters);

  return Object.values(data).filter(item => {
    const matchesGender = !gender || item.gender === gender;
    const matchesEntryAge = !entry_age || (item.entry_age && entry_age.includes(String(item.entry_age)));
    const matchesLocation = !location || item.location === location;
    return matchesGender && matchesEntryAge && matchesLocation;
  });
};

const selectedFilters = {
  gender: 'Male',
  entry_age: ['1-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60+'],
  location: 'USA'
};

const filteredData = filterData(selectedFilters, data);
console.log("Filtered Data:", filteredData);

module.exports = { filterData, filteredData };
