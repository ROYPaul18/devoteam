function countPeopleByAgeAndEndDate(jsonData) {
    const result = {};
  
    for (const id in jsonData) {
      const person = jsonData[id];
      const entryAge = person.entry_age;
  
      // Vérifier si l'entry_age n'est pas null avant de continuer
      if (entryAge === null) {
        continue;
      }
  
      if (!result[entryAge]) {
        result[entryAge] = { null_end_date: 0, non_null_end_date: 0 };
      }
  
      if (person.end_date === null) {
        result[entryAge].null_end_date += 1;
      } else {
        result[entryAge].non_null_end_date += 1;
      }
    }
  
    return result;
  }
module.exports = countPeopleByAgeAndEndDate;  