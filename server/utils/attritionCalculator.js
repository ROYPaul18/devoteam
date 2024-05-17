const fs = require('fs');
const { translateData } = require('./translateData');

const dataPath = './data/random_data_dashboard_all_v3.json';

const jsonData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(jsonData);

const translatedData = translateData(data);
const {countGenders} = require('./genderCount');

const { maleCount, femaleCount, maleEndDateCount, femaleEndDateCount } = countGenders(translatedData);
console.log(calcAttritionFemale(femaleCount, femaleEndDateCount), calcAttritionMale(maleCount, maleEndDateCount));

function calcAttrition(nombreTotalEmploye, countWithEndDateNotNull) {
    const tauxAttrition = (countWithEndDateNotNull / nombreTotalEmploye).toFixed(2) * 100;
    return tauxAttrition;
  }
  
function calcAttritionMale(maleCount, maleEndDateCount) {
    const tauxAttritionMale = (maleEndDateCount / maleCount).toFixed(2) * 100;
    return tauxAttritionMale;
  }
  
function calcAttritionFemale(femaleCount, femaleEndDateCount) {
    const tauxAttritionFemale = (femaleEndDateCount / femaleCount).toFixed(2) * 100;
    return tauxAttritionFemale;
  }
  
module.exports = { calcAttrition, calcAttritionMale, calcAttritionFemale, translatedData };