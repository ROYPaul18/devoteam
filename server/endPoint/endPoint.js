const express = require('express');
const router = express.Router();
const { countObjectsWithEndDate, translatedData: countObjectsTranslatedData } = require('../utils/countObjects.js');
const { filterData } = require('../utils/filterData');
const genderCounts = require('../utils/genderCount.js');
const { calcAttrition, calcAttritionMale, calcAttritionFemale, translatedData: attritionCalculatorTranslatedData, calcAttritionLocation, countPeopleByOsDepartementAndEndDate, nombreTotalEmploye, countWithEndDateNotNull, calcAttritionByAgeGroup } = require('../utils/attritionCalculator');
const { getUniqueEntryAges } = require('../utils/getUniqueEntryAges.js');
const filterService = require('../service/filterService.js');
const { getLastFiveEndDates } = require('../utils/lastEndDates.js');
const {translateData} = require("../utils/translateData.js");
const axios = require("axios");

router.post('/api/filterValue', (req, res) => {
  const filters = req.body;
  filterService.setFilteredData(filters);
  const filteredData = filterService.getFilteredData();
  res.json(filteredData);
});

router.get('/api/getFilteredData', (req, res) => {
  const filteredData = filterService.getFilteredData();
  res.json(filteredData);
});

router.get('/api/count_objects', (req, res) => {
  axios.get('http://localhost:3001/api/getFilteredData')
    .then(response => {
      const filteredData = response.data;
      const result = countObjectsWithEndDate(filteredData);
      const attritionRate = calcAttrition(result.totalObjects, result.objectsWithEndDateNotNull);
      console.log({...result, attritionRate})
      res.json({...result, attritionRate});
    })
    .catch(error => {
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

router.get('/api/attrition_rate', (req, res) => {
  const countResult = countObjectsWithEndDate(attritionCalculatorTranslatedData);
  const attrResult = calcAttrition(countResult.totalObjects, countResult.objectsWithEndDateNotNull);
  res.json({ tauxAttrition: attrResult });
});

router.get('/api/attrition_rate_male_female', (req, res) => {
  axios
    .get('http://localhost:3001/api/getFilteredData')
    .then((response) => {
      const filteredData = response.data;
      const { maleCount, femaleCount, maleEndDateCount, femaleEndDateCount, } = genderCounts(filteredData);
      const attritionMale = calcAttritionMale(maleCount, maleEndDateCount);
      const attritionFemale = calcAttritionFemale(femaleCount, femaleEndDateCount);
      const attrition = calcAttrition(nombreTotalEmploye, countWithEndDateNotNull);
      res.json({ tauxAttritionMale: attritionMale, tauxAttritionFemale: attritionFemale, tauxAttrition: attrition });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

router.get('/api/last_five_end_dates', (req, res) => {
  axios.get('http://localhost:3001/api/getFilteredData')
    .then(response => {
      const filteredData = response.data;
      const translatedData = translateData(filteredData);
      const lastFiveEndDates = getLastFiveEndDates(translatedData);
      res.json(lastFiveEndDates);
    })
    .catch(error => {
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

router.get('/api/count_people_by_location', (req, res) => {
  axios
    .get('http://localhost:3001/api/getFilteredData')
    .then((response) => {
      const filteredData = response.data;
      const locationCount = countPeopleByLocationAndEndDate(filteredData);
      const dataToSend = {};
      for (const location in locationCount) {
        dataToSend[location] = {
          count: locationCount[location].count,
          endDateCount: locationCount[location].endDateCount,
        };
      }
      res.json(dataToSend);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

router.get('/api/calc_attrition_by_os_departement', (req, res) => {
  axios
    .get('http://localhost:3001/api/getFilteredData')
    .then((response) => {
      const filteredData = response.data;
      const osDepartementAttrition = calcAttritionByOsDepartement(filteredData);
      const dataToSend = {};
      for (const osDepartement in osDepartementAttrition) {
        dataToSend[osDepartement] = {
          attritionRate: osDepartementAttrition[osDepartement],
        };
      }
      res.json(dataToSend);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

router.get('/api/entry-ages', (req, res) => {
  const uniqueEntryAges = getUniqueEntryAges();
  res.json(uniqueEntryAges);
});

router.get('/api/attrition_rates_by_age_group', (req, res) => {
  axios
    .all([
      axios.get('http://localhost:3001/api/getFilteredData'),
      axios.get('http://localhost:3001/api/entry-ages'),
    ])
    .then(
      axios.spread((filteredDataResponse, entryAgesResponse) => {
        const filteredData = filteredDataResponse.data;
        const entryAges = entryAgesResponse.data;
        const attritionRates = calcAttritionByAgeGroup(filteredData, entryAges);
        res.json(attritionRates);
      })
    )
    .catch((error) => {
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

module.exports = router;
