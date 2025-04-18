import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medecine'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connecté à MySQL');
});

// Créer la table si elle n'existe pas
const createTable = `
CREATE TABLE IF NOT EXISTS medecin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  nb_jours INT,
  taux_journalier FLOAT
)`;
db.query(createTable, err => {
  if (err) throw err;
  console.log('Table vérifiée/créée');
});

// Créer la table si elle n'existe pas
const createTableU = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`;

db.query(createTableU, (err, result) => {
  if (err) throw err;
  console.log('Table "user" vérifiée/créée avec succès');
});

// Routes

// Exemple d'endpoint pour ajouter un utilisateur
app.post('/users', (req, res) => {
  const { user, password } = req.body;

  const insertQuery = 'INSERT INTO user (user, password) VALUES (?, ?)';
  db.query(insertQuery, [user, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Utilisateur déjà existant.' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
  });
});

// Connexion d'un utilisateur
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  const selectQuery = 'SELECT * FROM user WHERE user = ? AND password = ?';
  db.query(selectQuery, [user, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      // Utilisateur trouvé
      return res.status(200).json({ message: 'Connexion réussie', user: results[0] });
    } else {
      // Aucun utilisateur correspondant
      return res.status(401).json({ message: 'Nom d’utilisateur ou mot de passe incorrect' });
    }
  });
});

// Obtenir tous les médecins + prestation calculée
app.get('/api/medecins', (req, res) => {
  const sql = `SELECT *, (nb_jours * taux_journalier) AS prestation FROM medecin`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Obtenir les stats globales
app.get('/api/medecins/stats', (req, res) => {
  const sql = `
    SELECT 
      SUM(nb_jours * taux_journalier) AS total,
      MIN(nb_jours * taux_journalier) AS min,
      MAX(nb_jours * taux_journalier) AS max
    FROM medecin`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// Ajouter un médecin
app.post('/api/medecins', (req, res) => {
  const { nom, nb_jours, taux_journalier } = req.body;
  const sql = "INSERT INTO medecin (nom, nb_jours, taux_journalier) VALUES (?, ?, ?)";
  db.query(sql, [nom, nb_jours, taux_journalier], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, nom, nb_jours, taux_journalier });
  });
});

// Modifier un médecin
app.put('/api/medecins/:id', (req, res) => {
  const { id } = req.params;
  const { nom, nb_jours, taux_journalier } = req.body;
  const sql = "UPDATE medecin SET nom=?, nb_jours=?, taux_journalier=? WHERE id=?";
  db.query(sql, [nom, nb_jours, taux_journalier, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Supprimer un médecin
app.delete('/api/medecins/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM medecin WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur API lancé sur http://localhost:${PORT}`);
});
