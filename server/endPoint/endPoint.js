const app = require('../config/config');
const { countObjectsWithEndDate, translatedData: countObjectsTranslatedData } = require('../utils/countObjects');
const {filterData}  = require('../utils/filterData');
const { countGenders, translatedData: countGendersTranslatedData } = require('../utils/genderCount');
const { calcAttrition, calcAttritionMale, calcAttritionFemale, translatedData: attritionCalculatorTranslatedData } = require('../utils/attritionCalculator');
const { getLastFiveEndDates, translatedData: lastEndDatesTranslatedData } = require('../utils/lastEndDates');
const { getUniqueEntryAges } = require('../utils/getUniqueEntryAges');

app.get('/api/count_objects', (req, res) => {
  const result = countObjectsWithEndDate(countObjectsTranslatedData);
  console.log(result);
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

app.get('/api/entry-ages', (req, res) => {
  const uniqueEntryAges = getUniqueEntryAges();
  res.json(uniqueEntryAges);
});

app.post('/api/filter', (req, res) => {
  const filters = req.body;
  const gender = req.body.gender;
  const entry_age = req.body.entry_age;
  const filteredData = filterData(filters, gender, entry_age);
  res.json(filteredData);
});

app.get('/api/filter_data', (req, res) => {

});


module.exports = app;
