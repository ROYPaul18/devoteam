const express = require('express');
const router = express.Router();
const { countObjectsWithEndDate, translatedData: countObjectsTranslatedData } = require('../utils/countObjects.js');
const { filterData,setFilteredData, getFilteredData } = require('../utils/filterData');
const genderCounts = require('../utils/genderCount.js');
const { calcAttrition, calcAttritionMale, calcAttritionFemale, translatedData: attritionCalculatorTranslatedData, calcAttritionLocation, countPeopleByOsDepartementAndEndDate, nombreTotalEmploye, countWithEndDateNotNull, calcAttritionByAgeGroup, calcAttritionByPartner, calcAttritionByOsDepartement, calcAttritionByLocation } = require('../utils/attritionCalculator');
const { getUniqueEntryAges } = require('../utils/getUniqueEntryAges.js');
const filterService = require('../service/filterService.js');
const { getLastFiveEndDates } = require('../utils/lastEndDates.js');
const {translateData} = require("../utils/translateData.js");
const axios = require("axios");

router.post('/api/filterValue', (req, res) => {
  const filters = req.body;
  console.log("Received filters: ", filters);  
  filterService.setFilteredData(filters);
  const filteredData = filterService.getFilteredData();
  res.json(filteredData);
});

router.get('/api/getFilteredData', (req, res) => {
  const filteredData = filterService.getFilteredData();
  res.json(filteredData);
});

router.get('/api/last_five_end_dates', (req, res) => {
  axios.get('http://localhost:3001/api/getFilteredData')
    .then(response => {
      const filteredData = response.data;
      
      const lastFiveEndDates = getLastFiveEndDates(filteredData);
      res.json(lastFiveEndDates);
    })
    .catch(error => {
      console.error("Error fetching filtered data:", error);
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});

router.get('/api/count_objects', (req, res) => {
  axios.get('http://localhost:3001/api/getFilteredData')
    .then(response => {
      const filteredData = response.data;
      const result = countObjectsWithEndDate(filteredData);
      const attritionRate = calcAttrition(result.totalObjects, result.objectsWithEndDateNotNull);
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

router.get('/api/count_people_by_location', (req, res) => {
  axios
    .get('http://localhost:3001/api/getFilteredData')
    .then((response) => {
      const filteredData = response.data;
      const LocAttritionRates = calcAttritionByLocation(filteredData);
    
      res.json(LocAttritionRates);
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
        dataToSend[osDepartement] = osDepartementAttrition[osDepartement];
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
        const filteredAgeGroups = entryAges.filter(ageGroup => {
          return true; 
        });
        const attritionRates = calcAttritionByAgeGroup(filteredData, filteredAgeGroups);
        res.json(attritionRates);
      })
    )
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});
router.get('/api/attrition_rates_by_partner', (req, res) => {
  axios
    .get('http://localhost:3001/api/getFilteredData')
    .then(response => {
      const filteredData = response.data;
      // console.log("Filtered Data:", filteredData);
      const attritionRatesByOsPartner = calcAttritionByPartner(filteredData);
      // console.log("Attrition Rates by Partner:", attritionRates);
      res.json(attritionRatesByOsPartner);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ message: 'Une erreur s\'est produite' });
    });
});




module.exports = router;
