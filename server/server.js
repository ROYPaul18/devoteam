const express = require('express');
const fs = require('fs'); // Module permetant de manipuler des fichiers
const app = express();
const dataPath = './data/random_data_dashboard_all_v3.json';
const cors = require('cors');
app.use(cors());

function countObjectsWithEndDate() {
  // contenu du fichier data.json
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  // convertir la chaîne JSON en objet JavaScript
  const data = JSON.parse(jsonData);

  let nombreTotalEmploye = 0; // Déclaration de la variable qui contient la liste de tous les employés partis et encore présents
  let nullEndDateCount = 0; // Déclaration de la variable qui contient la liste de tous les employés avec une end_date
  // Parcourir chaque clé dans l'objet JSON
  for (const key in data) {
    // Incrémenter le compteur total
    nombreTotalEmploye++;
    // Vérifier si l'objet a "end_date" nulle
    if (data[key].end_date === null) {
      // Incrémenter le compteur des objets avec "end_date" nulle
      nullEndDateCount++;
      console.log(nullEndDateCount);
    }
  }
  const countWithEndDateNotNull = nombreTotalEmploye - nullEndDateCount;
  // Retourner le résultat
  return {
    totalObjects: nombreTotalEmploye,
    objectsWithEndDateNotNull: countWithEndDateNotNull,
    objectsWithEndDateNull: nullEndDateCount
  };
}

function calcAttrition() {
  let nombreTotalEmploye;
  let countWithEndDateNotNull;
  let tauxAttrition =  nombreTotalEmploye / countWithEndDateNotNull * 100;

  
  return tauxAttrition;  

}

app.get('/api/nombre_personnes', (req, res) => { 
  const result = countObjectsWithEndDate();
  console.log("Résultat du comptage des objets : ", result);
  res.json(result);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});