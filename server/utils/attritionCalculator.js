function calcAttrition(nombreTotalEmploye, countWithEndDateNotNull) {
  const tauxAttrition = (countWithEndDateNotNull / nombreTotalEmploye).toFixed(2) * 100;
  return tauxAttrition;
}

function calcAttritionMale(maleCount, maleEndDateCount) {
  const tauxAttritionMale = (maleEndDateCount / maleCount).toFixed(4) * 100;
  return tauxAttritionMale;
}

function calcAttritionFemale(femaleCount, femaleEndDateCount) {
  const tauxAttritionFemale = (femaleEndDateCount / femaleCount).toFixed(4) * 100;
  return tauxAttritionFemale;
}

function countEndDatesByLocation(filteredData) {
  const locationCounts = {};

  for (const empId in filteredData) {
    const empData = filteredData[empId];
    const location = empData.location || 'Unknown';
    if (!locationCounts[location]) {
      locationCounts[location] = { totalCount: 0, endDateCount: 0 };
    }
    locationCounts[location].totalCount += 1;
    if (empData.end_date !== null) {
      locationCounts[location].endDateCount += 1;
    }
  }

  return locationCounts;
}

function calcAttritionByLocation(filteredData) {
  const locationCounts = countEndDatesByLocation(filteredData);
  const attritionRates = {};

  for (const location in locationCounts) {
    const { totalCount, endDateCount } = locationCounts[location];
    const attritionRate = totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    attritionRates[location] = attritionRate;
  }
  return attritionRates;
}

function countEndDatesByOsDepartement(filteredData) {
  const departementCounts = {};

  for (const empId in filteredData) {
    const empData = filteredData[empId];
    const departement = empData.os_departement || 'Unknown';
    if (!departementCounts[departement]) {
      departementCounts[departement] = { totalCount: 0, endDateCount: 0 };
    }
    departementCounts[departement].totalCount += 1;
    if (empData.end_date !== null) {
      departementCounts[departement].endDateCount += 1;
    }
  }

  return departementCounts;
}

function calcAttritionByOsDepartement(filteredData) {
  const departementCounts = countEndDatesByOsDepartement(filteredData);
  const attritionRates = {};

  for (const departement in departementCounts) {
    const { totalCount, endDateCount } = departementCounts[departement];
    const attritionRate = totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    attritionRates[departement] = attritionRate;
  }
  return attritionRates;
}

function countEndDatesByAgeGroup(filteredData, ageGroups) {
  const ageGroupCounts = {};

  for (const ageGroup of ageGroups) {
    const prefixedAgeGroup = `Age${ageGroup}`;
    const ageGroupData = [];
    for (const empId in filteredData) {
      const empData = filteredData[empId];
      if (empData.entry_age === prefixedAgeGroup) {
        ageGroupData.push(empData);
      }
    }
    const totalCount = ageGroupData.length;
    const endDateCount = ageGroupData.filter(data => data.end_date !== null).length;

    ageGroupCounts[prefixedAgeGroup] = {
      totalCount: totalCount,
      endDateCount: endDateCount
    };
  }

  return ageGroupCounts;
}

function calcAttritionByAgeGroup(filteredData, ageGroups) {
  const ageGroupCounts = countEndDatesByAgeGroup(filteredData, ageGroups);
  const attritionRates = {};

  for (const ageGroup in ageGroupCounts) {
    const { totalCount, endDateCount } = ageGroupCounts[ageGroup];
    const attritionRate = totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    attritionRates[ageGroup] = attritionRate;
  }

  return attritionRates;
}

function countEndDatesByPartner(filteredData) {
  const partnerCounts = {};

  for (const empId in filteredData) {
    const empData = filteredData[empId];
    const partner = empData.os_partner || 'Unknown';
    if (!partnerCounts[partner]) {
      partnerCounts[partner] = { totalCount: 0, endDateCount: 0 };
    }
    partnerCounts[partner].totalCount += 1;
    if (empData.end_date !== null) {
      partnerCounts[partner].endDateCount += 1;
    }
  }

  return partnerCounts;
}

function calcAttritionByPartner(filteredData) {

  const partnerCounts = countEndDatesByPartner(filteredData);
  const attritionRates = {};

  for (const partner in partnerCounts) {
    const { totalCount, endDateCount } = partnerCounts[partner];
    const attritionRate = totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    attritionRates[partner] = attritionRate;
  }
  return attritionRates;
}

module.exports = {
  calcAttrition,
  calcAttritionMale,
  calcAttritionFemale,
  calcAttritionByLocation,
  calcAttrition,
  calcAttritionByAgeGroup,
  calcAttritionByPartner,
  calcAttritionByOsDepartement,
};
