const fs = require('fs');
const { translateData } = require('./translateData');

const dataPath = './data/random_data_dashboard_all_v3.json';

const jsonData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(jsonData);

const translatedData = translateData(data);

function getLastFiveEndDates() {
  const endDates = Object.values(translatedData).filter(item => item.end_date !== null);
  endDates.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
  return endDates.slice(0, 5);
}

module.exports = { getLastFiveEndDates, translatedData };
