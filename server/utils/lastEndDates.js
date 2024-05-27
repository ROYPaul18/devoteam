function getLastFiveEndDates(data) {
  const endDatesWithId = Object.entries(data).filter(([, item]) => item.end_date !== null);
  endDatesWithId.sort((a, b) => new Date(b[1].end_date) - new Date(a[1].end_date));
  const lastFiveEndDatesWithId = endDatesWithId.slice(0, 5);
  const lastFiveEndDates = lastFiveEndDatesWithId.map(([id, item]) => ({ id, ...item }));
  return lastFiveEndDates;
}

module.exports = {
  getLastFiveEndDates
};