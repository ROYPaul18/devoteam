const fs = require('fs');
const { translateData } = require('./translateData');

const dataPath = './data/random_data_dashboard_all_v3.json';

const jsonData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(jsonData);

const translatedData = translateData(data);

function countObjectsWithEndDate() {
  let nombreTotalEmploye = 0;
  let nullEndDateCount = 0;

  for (const key in translatedData) {
    nombreTotalEmploye++;
    if (translatedData[key].end_date === null) {
      nullEndDateCount++;
    }
  }
  const countWithEndDateNotNull = nombreTotalEmploye - nullEndDateCount;
  return {
    totalObjects: nombreTotalEmploye,
    objectsWithEndDateNotNull: countWithEndDateNotNull,
    objectsWithEndDateNull: nullEndDateCount
  };
}

module.exports = { countObjectsWithEndDate, translatedData };
