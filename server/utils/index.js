const countObjects = require('./countObjects');
const genderCount = require('./genderCount');
const attritionCalculator = require('./attritionCalculator');
const lastEndDates = require('./lastEndDates');
const translateData = require('./translateData');

module.exports = {
  ...countObjects,
  ...genderCount,
  ...attritionCalculator,
  ...lastEndDates,
  ...translateData,
};