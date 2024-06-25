const fs = require('fs');
const path = require('path');
const { filterData } = require('../utils/filterData');

let filteredData = [];

const dataPath = path.join(__dirname, '../data/data_v4.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

function setFilteredData(filters) {
  filteredData = filterData(filters, data);
}

function getFilteredData() {
  return filteredData;
}

module.exports = {
  setFilteredData,
  getFilteredData
};