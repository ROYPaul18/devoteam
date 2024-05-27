const filterData = (filters = { gender: null, entry_age: null, location: null }, data) => {
  const { gender, entry_age, location } = filters;

  return Object.values(data).filter(item => {
    const matchesGender = !gender || item.gender === gender;
    const matchesEntryAge = !entry_age || (item.entry_age && entry_age.includes(String(item.entry_age)));
    const matchesLocation = !location || item.location === location;

    return matchesGender && matchesEntryAge && matchesLocation;
  }).map(item => ({ ...item, originalId: item.id }));
};

module.exports = { filterData };