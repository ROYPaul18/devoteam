const express = require('express');
const fs = require('fs');

const app = express();
const dataPath = './data/random_data_dashboard_all_v3.json';
const cors = require('cors');
app.use(cors());



function countObjectsWithEndDate() {
  // Lire le contenu du fichier data.json
  const jsonData = fs.readFileSync(dataPath, 'utf8');

  // Convertir la chaîne JSON en objet JavaScript
  const data = JSON.parse(jsonData);
  
  // Initialiser les compteurs
  let totalCount = 0;
  let nullEndDateCount = 0;

  // Parcourir chaque clé dans l'objet JSON
  for (const key in data) {
    // Incrémenter le compteur total
    totalCount++;

    // Vérifier si l'objet a "end_date" nulle
    if (data[key].end_date === null) {
      // Incrémenter le compteur des objets avec "end_date" nulle
      nullEndDateCount++;
    }
  }

  const countWithEndDateNotNull = totalCount - nullEndDateCount;

  // Retourner le résultat
  return {
    totalObjects: totalCount,
    objectsWithEndDateNotNull: countWithEndDateNotNull,
    objectsWithEndDateNull: nullEndDateCount
  };
}

app.get('/api/nombre_personnes', (req, res) => {
  
  const result = countObjectsWithEndDate();
  console.log("Résultat du comptage des objets : ", result);
  res.json(result);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});