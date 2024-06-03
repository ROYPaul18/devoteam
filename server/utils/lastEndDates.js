function getLastFiveEndDates(data) {
  // Filtrer pour ne garder que les objets avec une date de fin
  const endDatesWithId = data.filter(item => item.end_date !== null);

  // Trier par date de fin décroissante
  endDatesWithId.sort((a, b) => new Date(b.end_date) - new Date(a.end_date));

  // Prendre les cinq derniers éléments
  const lastFiveEndDates = endDatesWithId.slice(0, 5);

  return lastFiveEndDates;
}

module.exports = {
  getLastFiveEndDates
};