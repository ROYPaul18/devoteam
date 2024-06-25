const filterData = (filters = { gender: null, entry_age: null, location: null, start_date: null, end_date: null }, data) => {
  const { gender, entry_age, location, start_date, end_date } = filters;

  // Convertir start_date et end_date en objets Date si elles sont définies
  const parsedStartDate = start_date ? new Date(start_date) : null;
  const parsedEndDate = end_date ? new Date(end_date) : null;

  return Object.entries(data).filter(([id, item]) => {
    const matchesGender = !gender || item.gender === gender;
    const matchesEntryAge = !entry_age || entry_age.some(age => item.entry_age === age);
    const matchesLocation = !location || item.location === location;
    const itemStartDate = new Date(item.start_date);
    const itemEndDate = item.end_date ? new Date(item.end_date) : null;
    const matchesStartDate = !parsedStartDate || (itemStartDate.getFullYear() >= parsedStartDate.getFullYear() && itemStartDate.getMonth() >= parsedStartDate.getMonth() && itemStartDate.getDate() >= parsedStartDate.getDate());
    const matchesEndDate = !parsedEndDate || (itemEndDate && (itemEndDate.getFullYear() <= parsedEndDate.getFullYear() && itemEndDate.getMonth() <= parsedEndDate.getMonth() && itemEndDate.getDate() <= parsedEndDate.getDate()) || itemEndDate === null);

    return matchesGender && matchesEntryAge && matchesLocation && matchesStartDate && matchesEndDate;
  }).map(([id, item]) => ({ id, ...item }));
};

module.exports = { filterData };
