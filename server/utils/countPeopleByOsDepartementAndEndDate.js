const { calcAttrition } = require('./attrition');

function countPeopleByOsDepartementAndEndDate(data) {
  const osDepartementCount = {};

  for (const key in data) {
    const person = data[key];

    if (person.os_departement) {
      if (!osDepartementCount[person.os_departement]) {
        osDepartementCount[person.os_departement] = {
          count: 0,
          endDateCount: 0,
        };
      }

      osDepartementCount[person.os_departement].count++;

      if (person.end_date !== null) {
        osDepartementCount[person.os_departement].endDateCount++;
      }
    }
  }

  return osDepartementCount;
}
module.exports = countPeopleByOsDepartementAndEndDate;
