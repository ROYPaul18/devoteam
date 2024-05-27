function countGenders(data) {
  let maleCount = 0;
  let femaleCount = 0;
  let maleEndDateCount = 0;
  let femaleEndDateCount = 0;

  for (const key in data) {
    if (data[key].gender === 'Male') {
      maleCount++;
      if (data[key].end_date !== null) {
        maleEndDateCount++;
      }
    } else if (data[key].gender === 'Female') {
      femaleCount++;
       if (data[key].end_date !== null) {
        femaleEndDateCount++;
      }
    }
  }
  return {
    maleCount,
    femaleCount,
    maleEndDateCount,
    femaleEndDateCount,
  };
}
module.exports = countGenders;