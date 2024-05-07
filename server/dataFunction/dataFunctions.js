const fs = require('fs');
const dataPath = './data/random_data_dashboard_all_v3.json';
const locationPath ='../data/map_location.json';
const departementPath = '../data/map_departement.json'


const jsonData = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(jsonData);

function countObjectsWithEndDate() {
  let nombreTotalEmploye = 0;
  let nullEndDateCount = 0;

  for (const key in data) {
    nombreTotalEmploye++;
    if (data[key].end_date === null) {
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
function countGenders() {
  fs.readFile(dataPath, 'utf8', (err, jsonString) => {
    if (err) {
      console.log('Erreur lors de la lecture du fichier :', err);
      return;
    }
    try {
      const data = JSON.parse(jsonString);

      let maleCount = 0;
      let femaleCount = 0;
      let maleEndDateCount = 0;
      let femaleEndDateCount = 0;

      for (const key in data) {
        if (data[key].gender === 'Male') {
          maleCount++;
          if (data[key].end_date !== null) {
            maleEndDateCount++;
          }
        } else if (data[key].gender === 'Female') {
          femaleCount++;
          if (data[key].end_date !== null) {
            femaleEndDateCount++;
          }
        }
      }
      console.log(`Nombre de personnes de genre Male : ${maleCount}`);
      console.log(`Nombre de personnes de genre Male ayant une end_date non null : ${maleEndDateCount}`);
      console.log(`Nombre de personnes de genre Female : ${femaleCount}`);
      console.log(`Nombre de personnes de genre Female ayant une end_date non null : ${femaleEndDateCount}`);
    } catch (err) {
      console.log('Erreur lors du parsing du JSON :', err);
    }
  });
}

function calcAttrition(nombreTotalEmploye, countWithEndDateNotNull) {
  const tauxAttrition = (countWithEndDateNotNull / nombreTotalEmploye).toFixed(2);
  return tauxAttrition;
}

function calcAttritionMale(maleCount, maleEndDateCount) {
  const tauxAttritionMale = (maleEndDateCount / maleCount).toFixed(2);
  return tauxAttritionMale;
}

function calcAttritionFemale(femaleCount, femaleEndDateCount) {
  const tauxAttritionFemale = (femaleEndDateCount / femaleCount).toFixed(2);
  return tauxAttritionFemale;
}

function getLastFiveEndDates() {
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData);
  const endDates = Object.values(data).filter(item => item.end_date !== null);
  endDates.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));
  return endDates.slice(0, 5);
}


function translateLocation(data, locationDict) {
  for (const id in data) {
    const info = data[id];

    if (info.location !== null && locationDict[info.location]) {
      info.location = locationDict[info.location];
    }
  }

  return data;
}

function translateOsDepartment(data, osDepartmentDict) {
  for (const id in data) {
    const info = data[id];

    if (info.os_departement !== null && osDepartmentDict[info.os_departement]) {
      info.os_departement = osDepartmentDict[info.os_departement];
    }
  }

  return data;
}


module.exports = { countObjectsWithEndDate, calcAttrition, countGenders, calcAttritionMale, calcAttritionFemale, getLastFiveEndDates,  };
