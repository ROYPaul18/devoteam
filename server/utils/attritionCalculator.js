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

function calcAttritionLocation(count, endDateCount) {
  const tauxAttritionLocation = (endDateCount / count).toFixed(2);
  console.log(tauxAttritionLocation);
  return tauxAttritionLocation;
}

function calcAttritionByOsDepartement(data) {
  const osDepartementAttrition = {};
  const osDepartementCount = countPeopleByOsDepartementAndEndDate(data);

  for (const osDepartement in osDepartementCount) {
    const count = osDepartementCount[osDepartement].count;
    const endDateCount = osDepartementCount[osDepartement].endDateCount;

    if (count === 0) {
      osDepartementAttrition[osDepartement] = 0;
    } else {
      const attritionRate = calcAttrition(count, endDateCount);
      osDepartementAttrition[osDepartement] = attritionRate;
    }
  }
  return osDepartementAttrition;
}

function calcAttritionByAgeGroup(filteredData, entryAges) {
  const attritionRates = {};
  for (const ageGroup of entryAges) {
    const ageGroupCounts = filteredData[ageGroup] || {
      non_null_end_date: 0,
      null_end_date: 0,
    };
    const nonNullEndDates = Object.values(filteredData).filter(
      (data) => data.entry_age === ageGroup && data.end_date !== null
    );
    const nullEndDates = Object.values(filteredData).filter(
      (data) => data.entry_age === ageGroup && data.end_date === null
    );
    const totalCount = nonNullEndDates.length + nullEndDates.length;
    const attritionRate =
      totalCount > 0
        ? parseFloat(((nonNullEndDates.length / totalCount)).toFixed(2))
        : 0;
    attritionRates[ageGroup] = attritionRate;
  }
  return attritionRates;
}

module.exports = {
  calcAttrition,
  calcAttritionMale,
  calcAttritionFemale,
  calcAttritionLocation,
  calcAttrition,
  calcAttritionByAgeGroup,
};
