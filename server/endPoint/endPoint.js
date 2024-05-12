const app = require('../config/config');
const { countObjectsWithEndDate, translatedData: countObjectsTranslatedData } = require('../utils/countObjects');
const { countGenders, translatedData: countGendersTranslatedData } = require('../utils/genderCount');
const { calcAttrition, calcAttritionMale, calcAttritionFemale, translatedData: attritionCalculatorTranslatedData } = require('../utils/attritionCalculator');
const { getLastFiveEndDates, translatedData: lastEndDatesTranslatedData } = require('../utils/lastEndDates');

app.get('/api/count_objects', (req, res) => {
  const result = countObjectsWithEndDate(countObjectsTranslatedData);
  res.json(result);
});

app.get('/api/gender_count', (req, res) => {
  const result = countGenders(countGendersTranslatedData);
  res.json(result);
});

app.get('/api/attrition_rate', (req, res) => {
  const countResult = countObjectsWithEndDate(attritionCalculatorTranslatedData);
  const attrResult = calcAttrition(countResult.totalObjects, countResult.objectsWithEndDateNotNull);
  res.json({ tauxAttrition: attrResult });
});

app.get('/api/attrition_rate_male_female', (req, res) => {
  const genderCountResult = countGenders(attritionCalculatorTranslatedData);
  const attrResultMale = calcAttritionMale(genderCountResult.maleCount, genderCountResult.maleEndDateCount);
  const attrResultFemale = calcAttritionFemale(genderCountResult.femaleCount, genderCountResult.femaleEndDateCount);

  res.json({ tauxAttritionMale: attrResultMale, tauxAttritionFemale: attrResultFemale });
});

app.get('/api/last_five_end_dates', (req, res) => {
  const lastFiveEndDates = getLastFiveEndDates(lastEndDatesTranslatedData);
  res.json({ lastFiveEndDates });
});

module.exports = app;
