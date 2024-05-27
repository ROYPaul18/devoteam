const { filterData } = require('../utils/filterData');
const data = require('../data/data_v4.json');

let filters = {};
let filteredData = filterData(filters, data);

const setFilteredData = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    filters = updatedFilters;
    filteredData = filterData(updatedFilters, data);
};

const getFilteredData = () => {
  return filteredData;
};

module.exports = {
  setFilteredData,
  getFilteredData,
};
