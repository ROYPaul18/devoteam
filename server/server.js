const express = require('express');
const app = express();
const endpoint = require('./endPoint/endPoint');
const cors = require('cors'); 

app.use(express.json());
app.use(cors());
app.use('/', endpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
