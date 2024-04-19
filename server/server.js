const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
const filePath = './data/random_data_dashboard_all.json';
const cors = require('cors');
app.use(cors());

function countObjects(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        const count = Array.isArray(data) ? data.length : 0;
        return count;
    } catch (error) {
        console.error("Erreur lors de l'analyse du JSON :", error);
        return -1; 
    }
}

app.get('/api/data', (req, res) => {
    let nombreDeLignes = 0; // Initialisation du compteur de lignes
  
    // Lire le fichier CSV
    fs.createReadStream('./data/scenario1.csv')
      .pipe(csv())
      .on('data', () => {
        // Incrémenter le compteur de lignes pour chaque ligne lue
        nombreDeLignes++;
      })
      .on('end', () => {
        // Envoyer la réponse avec le nombre de lignes dans le fichier CSV
        res.json({ nombreDeLignes }); // Envoyer le nombre de lignes dans la réponse JSON
      });
  });
  

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
