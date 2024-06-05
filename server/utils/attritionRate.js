// Fonction pour calculer le nombre de jours dans une année
function daysInYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
  }
  
  // Fonction pour calculer le nombre de jours entre deux dates
  function daysBetween(startDate, endDate) {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay));
  }
  
  // Fonction pour calculer le taux d'attrition pour une période donnée
  function attritionRate(startDate, endDate, data) {
    let totalHeadcount = 0;
    let totalDepartures = 0;
    for (const empId in data) {
      const empData = data[empId];
      const empStartDate = new Date(empData.start_date);
      const empEndDate = empData.end_date ? new Date(empData.end_date) : new Date();
      if (empStartDate <= endDate && empEndDate >= startDate) {
        totalHeadcount++;
        if (empEndDate <= endDate && empEndDate >= startDate) {
          totalDepartures++;
        }
      }
    }
    const rate = (totalDepartures / totalHeadcount) * 100;
    return rate;
  }
  
  
  function getAnnualAttritionRates(data) {
    const annualRates = [];
    for (let year = 2006; year <= 2025; year++) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      const yearData = {};
      for (const empId in data) {
        const empData = data[empId];
        const empStartDate = new Date(empData.start_date);
        const empEndDate = empData.end_date ? new Date(empData.end_date) : new Date();
        if (empStartDate <= endDate && empEndDate >= startDate) {
          yearData[empId] = empData;
        }
      }
      const rate = attritionRate(startDate, endDate, yearData).toFixed(2);
      annualRates.push({ year, rate });
    }
    return annualRates;
  }
  
  // Fonction pour calculer le taux d'attrition trimestriel
  function getQuarterlyAttritionRates(data) {
    const quarterlyRates = [];
    for (let year = 2006; year <= 2025; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        const startMonth = (quarter - 1) * 3;
        const endMonth = startMonth + 2;
        const startDate = new Date(year, startMonth, 1);
        const endDate = new Date(year, endMonth, 31);
        const quarterData = {};
        for (const empId in data) {
          const empData = data[empId];
          const empStartDate = new Date(empData.start_date);
          const empEndDate = empData.end_date ? new Date(empData.end_date) : new Date();
          if (empStartDate <= endDate && empEndDate >= startDate) {
            quarterData[empId] = empData;
          }
        }
        const rate = attritionRate(startDate, endDate, quarterData).toFixed(2);
        quarterlyRates.push({ year, quarter, rate });
       
      }
    }
    return quarterlyRates;
  }
  
  // Fonction pour calculer le taux d'attrition mensuel
  function getMonthlyAttritionRates(data) {
    const monthlyRates = [];
    for (let year = 2006; year <= 2025; year++) {
      for (let month = 1; month <= 12; month++) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 31);
        const monthData = {};
        for (const empId in data) {
          const empData = data[empId];
          const empStartDate = new Date(empData.start_date);
          const empEndDate = empData.end_date ? new Date(empData.end_date) : new Date();
          if (empStartDate <= endDate && empEndDate >= startDate) {
            monthData[empId] = empData;
          }
        }
        const rate = attritionRate(startDate, endDate, monthData).toFixed(2);
        monthlyRates.push({ year, month, rate });
        rate
      }
    }
    return monthlyRates;
  }
  
  module.exports = {
    getAnnualAttritionRates,
    getQuarterlyAttritionRates,
    getMonthlyAttritionRates
  };