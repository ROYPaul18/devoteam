const fs = require('fs');
const path = require('path');
const { filterData } = require('../utils/filterData');

let filteredData = [];

const dataPath = path.join(__dirname, '../data/data_v4.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function setFilteredData(filters) {
  // Appliquer les filtres aux données
  filteredData = filterData(filters, data);
  console.log("Filtered data after applying filters:", filteredData);
}

function getFilteredData() {
  return filteredData;
}

module.exports = {
  setFilteredData,
  getFilteredData
};