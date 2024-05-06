const app = require('../config/config');
const fs = require('fs');
const { countObjectsWithEndDate, calcAttrition, countGenders, calcAttritionFemale, calcAttritionMale, getLastFiveEndDates } = require('../dataFunction/dataFunctions')

app.get('/api/nombre_personnes', (req, res) => {
  const result = countObjectsWithEndDate();
  const attrResult = calcAttrition(result.totalObjects, result.objectsWithEndDateNotNull);
  const NbGenre = countGenders(result.objectsWithEndDateNotNull);
  const lastFiveEndDates = getLastFiveEndDates();

  let attritionMale, attritionFemale;
  if (NbGenre) {
    attritionMale = calcAttritionMale(NbGenre.maleCount, NbGenre.maleEndDateCount);
    attritionFemale = calcAttritionFemale(NbGenre.femaleCount, NbGenre.femaleEndDateCount);
  }
  
  console.log("Résultat du comptage des objets : ", result);
  console.log("Résultat du comptage des genres : ", NbGenre);
  console.log(lastFiveEndDates);
  res.json({ ...result, tauxAttrition: attrResult, ...NbGenre, tauxAttritionMale: attritionMale, tauxAttritionFemale: attritionFemale, lastFiveEndDates });
});

module.exports = app;