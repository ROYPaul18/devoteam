function countPeopleByLocationAndEndDate(data) {
    const locationCount = {};
  
    // Parcourir les données
    for (const key in data) {
      const person = data[key];
  
      // Vérifier si la personne a une location
      if (person.location) {
        // Vérifier si la location est déjà dans le compteur, sinon l'ajouter
        if (locationCount[person.location]) {
          locationCount[person.location]++;
        } else {
          locationCount[person.location] = {
            count: 1,
            endDateCount: 0
          };
        }
  
        // Vérifier si la personne a une date de fin
        if (person.end_date !== null) {
          locationCount[person.location].endDateCount++;
        }
      }
    }
  
    // Retourner le résultat
    return locationCount;
  }