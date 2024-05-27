const express = require('express');
const app = express();
const endpoint = require('./endPoint/endPoint');
const cors = require('cors'); // Ajoutez cette ligne pour importer le middleware CORS

app.use(express.json());
app.use(cors()); // Déplacez cette ligne ici
app.use('/', endpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
