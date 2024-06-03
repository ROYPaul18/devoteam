const filterData = (filters = { gender: null, entry_age: null, location: null, start_date: null }, data) => {
  const { gender, entry_age, location } = filters;

  return Object.entries(data).filter(([id, item]) => {
    const matchesGender = !gender || item.gender === gender;
    const matchesEntryAge = !entry_age || entry_age.some(age => item.entry_age === age);
    const matchesLocation = !location || item.location === location;

    return matchesGender && matchesEntryAge && matchesLocation;
  }).map(([id, item]) => ({ id, ...item }));
};

module.exports = { filterData };