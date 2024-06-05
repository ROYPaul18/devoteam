const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getAnnualAttritionRates, getQuarterlyAttritionRates, getMonthlyAttritionRates } = require('../utils/attritionRate');

async function fetchFilteredData() {
  try {
    const response = await axios.get('http://localhost:3001/api/getFilteredData'); 

    return response.data;
  } catch (error) {

    return {};
  }
}

// Route pour obtenir les taux d'attrition annuels
router.get('/annual', async (req, res) => {
  try {
    const data = await fetchFilteredData();
    const annualRates = getAnnualAttritionRates(data);
    res.json(annualRates);
  } catch (error) {
    console.error("Error in /annual route:", error);
    res.status(500).json({ message: 'Une erreur s\'est produite' });
  }
});

// Route pour obtenir les taux d'attrition trimestriels
router.get('/quarterly', async (req, res) => {
  try {
    const { year } = req.query;
    const data = await fetchFilteredData();
    const quarterlyRates = getQuarterlyAttritionRates(data).filter(rate => rate.year == year);
    res.json(quarterlyRates);
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite' });
  }
});

// Route pour obtenir les taux d'attrition mensuels
router.get('/monthly', async (req, res) => {
  try {
    const { year } = req.query;
    const data = await fetchFilteredData();
    const monthlyRates = getMonthlyAttritionRates(data).filter(rate => rate.year == year);
    res.json(monthlyRates);
  } catch (error) {
    console.error("Error in /monthly route:", error);
    res.status(500).json({ message: 'Une erreur s\'est produite' });
  }
});

module.exports = router;