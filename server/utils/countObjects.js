function countObjectsWithEndDate(filteredData, startDate, endDate) {
  let nombreTotalEmploye = 0;
  let nullEndDateCount = 0;
  let departCount = 0;

  for (const key in filteredData) {
    const item = filteredData[key];
    nombreTotalEmploye++;
    if (item.end_date === null) {
      nullEndDateCount++;
    } else if (item.end_date >= startDate && item.end_date <= endDate) {
      departCount++;
    }
  }

  const countWithEndDateNotNull = nombreTotalEmploye - nullEndDateCount;

  return {
    totalObjects: nombreTotalEmploye,
    objectsWithEndDateNotNull: countWithEndDateNotNull,
    objectsWithEndDateNull: nullEndDateCount,
    departs: departCount
  };
}

module.exports = {
  countObjectsWithEndDate: countObjectsWithEndDate
};