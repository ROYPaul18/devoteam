function calcAttrition(startDate, endDate, data) {
  // Initialise le compteur pour le nombre total d'employés présents durant la période.
  let totalHeadcount = 0;
  // Initialise le compteur pour le nombre d'employés ayant une date de fin non nulle durant la période.
  let countWithEndDateNotNull = 0;
  // Convertit les chaînes de date en objets Date pour faciliter les comparaisons.
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  // Parcourt chaque employé dans les données fournies.
  for (const empId in data) {
    const empData = data[empId];
    // Convertit les dates de début et de fin de l'employé en objets Date.
    const empStartDate = new Date(empData.start_date);
    const empEndDate = empData.end_date ? new Date(empData.end_date) : null;
    // Vérifie si l'employé était actif à n'importe quel moment durant la période spécifiée.
    if (empStartDate <= endDateObj && (!empEndDate || empEndDate >= startDateObj)) {
      totalHeadcount++; // Incrémente le compteur total d'employés.
      // Vérifie si l'employé a quitté l'entreprise durant la période spécifiée.
      if (empEndDate && empEndDate <= endDateObj && empEndDate >= startDateObj) {
        countWithEndDateNotNull++; // Incrémente le compteur d'employés ayant quitté.
      }
    }
  }
  // Calcule le taux d'attrition en pourcentage.
  const attritionRate = (countWithEndDateNotNull / totalHeadcount) * 100;
  // Retourne le taux d'attrition arrondi à trois décimales.
  return attritionRate.toFixed(3);
}

// function calcAttrition(nombreTotalEmploye, countWithEndDateNotNull) {
//   const tauxAttrition = (countWithEndDateNotNull / nombreTotalEmploye).toFixed(3) * 100;
//   return tauxAttrition;
// }

function calcAttritionMale(maleCount, maleEndDateCount) {
  // Calcule le taux d'attrition pour les hommes de la même manière, mais arrondit à quatre décimales.
  const tauxAttritionMale = (maleEndDateCount / maleCount).toFixed(4) * 100;
  return tauxAttritionMale; // Retourne le taux d'attrition des hommes.
}

function calcAttritionFemale(femaleCount, femaleEndDateCount) {
  // Calcule le taux d'attrition pour les femmes, arrondit également à quatre décimales.
  const tauxAttritionFemale = (femaleEndDateCount / femaleCount).toFixed(4) * 100;
  return tauxAttritionFemale; // Retourne le taux d'attrition des femmes.
}
function countEndDatesByLocation(filteredData) {
  const locationCounts = {}; // Initialise un objet pour stocker les comptages par localisation.

  for (const empId in filteredData) {
    const empData = filteredData[empId];
    const location = empData.location || "Unknown"; // Utilise "Unknown" si la localisation est non définie.
    if (!locationCounts[location]) {
      locationCounts[location] = { totalCount: 0, endDateCount: 0 }; // Initialise le comptage pour cette localisation.
    }
    locationCounts[location].totalCount += 1; // Incrémente le nombre total d'employés pour cette localisation.
    if (empData.end_date !== null) {
      locationCounts[location].endDateCount += 1; // Incrémente le nombre d'employés ayant une date de fin non nulle.
    }
  }

  return locationCounts; // Retourne l'objet avec les comptages par localisation.
}

function calcAttritionByLocation(filteredData) {
  const locationCounts = countEndDatesByLocation(filteredData); // Obtient les comptages par localisation.
  const attritionRates = {}; // Initialise un objet pour stocker les taux d'attrition par localisation.

  for (const location in locationCounts) {
    const { totalCount, endDateCount } = locationCounts[location];
    const attritionRate = totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    attritionRates[location] = attritionRate; // Calcule et stocke le taux d'attrition pour chaque localisation.
  }
  return attritionRates; // Retourne les taux d'attrition par localisation.
}

function countEndDatesByOsDepartement(filteredData) {
  const departementCounts = {};
  
  for (const empId in filteredData) {
  const empData = filteredData[empId];
  const departement = empData.os_departement || "Unknown";
  if (!departementCounts[departement]) {
  departementCounts[departement] = { totalCount: 0, endDateCount: 0 };
  }
  departementCounts[departement].totalCount += 1;
  if (empData.end_date !== null) {
  departementCounts[departement].endDateCount += 1;
  }
}

  return departementCounts;
  }
  
// Fonction qui compte le nombre total d'employés et le nombre d'employés ayant une date de fin
// pour chaque département dans l'ensemble de données filtré.
function countEndDatesByOsDepartement(filteredData) {
  const departementCounts = {};
  // Parcours chaque employé dans l'ensemble de données filtré.
  for (const empId in filteredData) {
    const empData = filteredData[empId];
    const departement = empData.os_departement || "Unknown";
    // Si le département n'a pas encore été compté, initialise les compteurs à 0.
    if (!departementCounts[departement]) {
      departementCounts[departement] = { totalCount: 0, endDateCount: 0 };
    }
    // Incrémente le compteur total pour le département.
    departementCounts[departement].totalCount += 1;
    // Si l'employé a une date de fin, incrémente le compteur de date de fin pour le département.
    if (empData.end_date !== null) {
      departementCounts[departement].endDateCount += 1;
    }
  }
  // Renvoie les résultats du comptage pour chaque département.
  return departementCounts;
}

// Fonction qui calcule le taux d'attrition pour chaque département à partir des données de comptage.
function calcAttritionByOsDepartement(filteredData) {
  const departementCounts = countEndDatesByOsDepartement(filteredData);
  const attritionRates = {};
  // Parcours chaque département dans les données de comptage.
  for (const departement in departementCounts) {
    const { totalCount, endDateCount } = departementCounts[departement];
    // Calcule le taux d'attrition pour le département en divisant le nombre d'employés ayant une date de fin
    // par le nombre total d'employés, puis multiplie le résultat par 100 pour obtenir un pourcentage.
    // Arrondit le résultat à 3 décimales.
    const attritionRate =
      totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    // Stocke le taux d'attrition pour le département dans l'objet de résultats.
    attritionRates[departement] = attritionRate;
  }
  // Renvoie les résultats du calcul du taux d'attrition pour chaque département.
  return attritionRates;
}

// Fonction qui compte le nombre total d'employés et le nombre d'employés ayant une date de fin
// pour chaque groupe d'âge dans l'ensemble de données filtré.
function countEndDatesByAgeGroup(filteredData, ageGroups) {
  const ageGroupCounts = {}; // Initialise un objet pour stocker les comptages par groupe d'âge.
  // Parcours chaque groupe d'âge dans la liste des groupes d'âge.
  for (const ageGroup of ageGroups) {
    const prefixedAgeGroup = `Age${ageGroup}`;
    const ageGroupData = [];
    // Parcours chaque employé dans l'ensemble de données filtré.
    for (const empId in filteredData) {
      const empData = filteredData[empId];
      // Si l'âge de l'employé correspond au groupe d'âge actuel, ajoute les données de l'employé à l'ensemble de données du groupe d'âge.
      if (empData.entry_age === prefixedAgeGroup) {
        ageGroupData.push(empData);
      }
    }
    // Calcule le nombre total d'employés et le nombre d'employés ayant une date de fin pour le groupe d'âge actuel.
    const totalCount = ageGroupData.length;
    const endDateCount = ageGroupData.filter((data) => data.end_date !== null).length;
    // Stocke les comptages pour le groupe d'âge dans l'objet de résultats.
    ageGroupCounts[prefixedAgeGroup] = {
      totalCount: totalCount,
      endDateCount: endDateCount,
    };
  }
  // Renvoie l'objet avec les comptages par groupe d'âge.
  return ageGroupCounts;
}

// Fonction qui calcule le taux d'attrition pour chaque groupe d'âge à partir des données de comptage.
function calcAttritionByAgeGroup(filteredData, ageGroups) {
  const ageGroupCounts = countEndDatesByAgeGroup(filteredData, ageGroups);
  const attritionRates = {};
  // Parcours chaque groupe d'âge dans les données de comptage.
  for (const ageGroup in ageGroupCounts) {
    const { totalCount, endDateCount } = ageGroupCounts[ageGroup];
    // Calcule le taux d'attrition pour le groupe d'âge en divisant le nombre d'employés ayant une date de fin
    // par le nombre total d'employés, puis multiplie le résultat par 100 pour obtenir un pourcentage.
    // Arrondit le résultat à 3 décimales.
    const attritionRate =
      totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    // Stocke le taux d'attrition pour le groupe d'âge dans l'objet de résultats.
    attritionRates[ageGroup] = attritionRate;
  }
  // Renvoie les résultats du calcul du taux d'attrition pour chaque groupe d'âge.
  return attritionRates;
}

// Fonction qui compte le nombre total d'employés et le nombre d'employés ayant une date de fin
// pour chaque partenaire dans l'ensemble de données filtré.
function countEndDatesByPartner(filteredData) {
  const partnerCounts = {};
  // Parcours chaque employé dans l'ensemble de données filtré.
  for (const empId in filteredData) {
    const empData = filteredData[empId];
    const partner = empData.os_partner || "Unknown";
    // Si le partenaire n'a pas encore été compté, initialise les compteurs à 0.
    if (!partnerCounts[partner]) {
      partnerCounts[partner] = { totalCount: 0, endDateCount: 0 };
    }
    // Incrémente le compteur total pour le partenaire.
    partnerCounts[partner].totalCount += 1;
    // Si l'employé a une date de fin, incrémente le compteur de date de fin pour le partenaire.
    if (empData.end_date !== null) {
      partnerCounts[partner].endDateCount += 1;
    }
  }
  // Renvoie les résultats du comptage pour chaque partenaire.
  return partnerCounts;
}

// Fonction qui calcule le taux d'attrition pour chaque partenaire à partir des données de comptage.
function calcAttritionByPartner(filteredData) {
  const partnerCounts = countEndDatesByPartner(filteredData);
  const attritionRates = {};
  // Parcours chaque partenaire dans les données de comptage.
  for (const partner in partnerCounts) {
    const { totalCount, endDateCount } = partnerCounts[partner];
    // Calcule le taux d'attrition pour le partenaire en divisant le nombre d'employés ayant une date de fin
    // par le nombre total d'employés, puis multiplie le résultat par 100 pour obtenir un pourcentage.
    // Arrondit le résultat à 3 décimales.
    const attritionRate =
      totalCount > 0 ? ((endDateCount / totalCount) * 100).toFixed(3) : 0;
    // Stocke le taux d'attrition pour le partenaire dans l'objet de résultats.
    attritionRates[partner] = attritionRate;
  }
  // Renvoie les résultats du calcul du taux d'attrition pour chaque partenaire.
  return attritionRates;
}


module.exports = {
  calcAttrition,
  calcAttritionMale,
  calcAttritionFemale,
  calcAttritionByLocation,
  calcAttrition,
  calcAttritionByAgeGroup,
  calcAttritionByPartner,
  calcAttritionByOsDepartement,
  // calcAttritionn
};
