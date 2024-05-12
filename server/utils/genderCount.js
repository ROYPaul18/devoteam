const fs = require('fs');
const { translateData } = require('./translateData');

const dataPath = './data/random_data_dashboard_all_v3.json';

const jsonData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(jsonData);

const translatedData = translateData(data);

function countGenders() {
  let maleCount = 0;
  let femaleCount = 0;
  let maleEndDateCount = 0;
  let femaleEndDateCount = 0;

  for (const key in translatedData) {
    if (translatedData[key].gender === 'Male') {
      maleCount++;
      if (translatedData[key].end_date !== null) {
        maleEndDateCount++;
      }
    } else if (translatedData[key].gender === 'Female') {
      femaleCount++;
      if (translatedData[key].end_date !== null) {
        femaleEndDateCount++;
      }
    }
  }
  return {
    maleCount,
    femaleCount,
    maleEndDateCount,
    femaleEndDateCount,
  };
}
module.exports = { countGenders, translatedData };
