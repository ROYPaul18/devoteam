const fs = require('fs');

const locationDictPath = './data/map_location.json';
const departmentDictPath = './data/map_departement.json';

const rawLocationDict = fs.readFileSync(locationDictPath);
const locationDict = JSON.parse(rawLocationDict);

const rawDepartmentDict = fs.readFileSync(departmentDictPath);
const departmentDict = JSON.parse(rawDepartmentDict);

function translateData(data) {
  for (const key in data) {
    if (data[key].location !== null) {
      const translatedLocation = Object.entries(locationDict).find(([k, v]) => v === data[key].location);
      data[key].location = translatedLocation ? translatedLocation[0] : data[key].location;
    }

    if (data[key].os_departement !== null) {
      const translatedDepartment = Object.entries(departmentDict).find(([k, v]) => v === data[key].os_departement);
      data[key].os_departement = translatedDepartment ? translatedDepartment[0] : data[key].os_departement;
    }
  }
  return data;
}

module.exports = { translateData, locationDict, departmentDict };
