function countObjectsWithEndDate(filteredData) {
  let nombreTotalEmploye = 0;
  let nullEndDateCount = 0;

  for (const key in filteredData) {
    const item = filteredData[key];
    nombreTotalEmploye++;
    if (item.end_date === null) {
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
module.exports = {
  countObjectsWithEndDate: countObjectsWithEndDate
};