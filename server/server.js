const express = require('express');
const app = express();
const endpoint = require('./endPoint/endPoint');

app.use(express.json());

app.use('/', endpoint);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
