import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connexion à la base MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gest_notes'
});

db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
    } else {
        console.log('Connecté à MySQL');
    }
});

// CRUD pour les étudiants

// 1. Récupérer tous les étudiants
app.get('/etudiants', (req, res) => {
    db.query('SELECT * FROM etudiant', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Récupérer un étudiant par son ID
app.get('/etudiants/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM etudiant WHERE id_etudiant = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.json(results[0]);
    });
});

// 3. Ajouter un nouvel étudiant
app.post('/etudiants', (req, res) => {
    const { nom, moyenne } = req.body;
    console.log("Données reçues sur le serveur : ", { nom, moyenne });

    // Vérifier si 'moyenne' est bien un nombre
    if (isNaN(moyenne) || moyenne === '') {
        return res.status(400).json({ message: "La moyenne doit être un nombre valide" });
    }

    db.query('INSERT INTO etudiant (nom, moyenne) VALUES (?, ?)', [nom, moyenne], (err, results) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
        id: results.insertId,
        nom: nom,
        moyenne: moyenne
        });
    });
});
  

// 4. Modifier un étudiant
app.put('/etudiants/:id', (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    if (!nom) {
        return res.status(400).json({ message: 'Le nom est requis' });
    }
    db.query('UPDATE etudiant SET nom = ? WHERE id_etudiant = ?', [nom, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.json({ message: 'Étudiant mis à jour' });
    });
});

// 5. Supprimer un étudiant
app.delete('/etudiants/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM etudiant WHERE id_etudiant = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.json({ message: 'Étudiant supprimé' });
    });
});

// CRUD Matières

// 1. Récupérer toutes les matières
app.get('/matieres', (req, res) => {
    db.query('SELECT * FROM matiere', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Récupérer une matière par son ID
app.get('/matieres/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM matiere WHERE id_matiere = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Matière non trouvée' });
        }
        res.json(results[0]);
    });
});

// 3. Ajouter une nouvelle matière
app.post('/matieres', (req, res) => {
    const { design, coef } = req.body;
    if (!design || !coef) {
        return res.status(400).json({ message: 'Désignation et coefficient requis' });
    }
    db.query('INSERT INTO matiere (design, coef) VALUES (?, ?)', [design, coef], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, design, coef });
    });
});

// 4. Modifier une matière
app.put('/matieres/:id', (req, res) => {
    const { id } = req.params;
    const { design, coef } = req.body;
    if (!design || !coef) {
        return res.status(400).json({ message: 'Désignation et coefficient requis' });
    }
    db.query('UPDATE matiere SET design = ?, coef = ? WHERE id_matiere = ?', [design, coef, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Matière non trouvée' });
        }
        res.json({ message: 'Matière mise à jour' });
    });
});

// 5. Supprimer une matière

app.delete('/matieres/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM matiere WHERE id_matiere = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Matière non trouvée' });
        }
        res.json({ message: 'Matière supprimée' });
    });
});

// CRUD Notes
// Fonction pour recalculer la moyenne d'un étudiant
const recalculerMoyenne = (id_etudiant) => {
    db.query(`
        SELECT SUM(n.note * m.coef) / SUM(m.coef) AS moyenne 
        FROM note n 
        JOIN matiere m ON n.id_matiere = m.id_matiere 
        WHERE n.id_etudiant = ?
    `, [id_etudiant], (err, results) => {
        if (!err) {
            const nouvelleMoyenne = results[0].moyenne || 0;
            db.query('UPDATE etudiant SET moyenne = ? WHERE id_etudiant = ?', [nouvelleMoyenne, id_etudiant]);
        }
    });
};

// 1. Ajouter une note
app.post('/notes', (req, res) => {
    const { id_etudiant, id_matiere, note } = req.body;
    if (!id_etudiant || !id_matiere || note === undefined || note < 0 || note > 20) {
        return res.status(400).json({ message: 'Données invalides' });
    }
    db.query('INSERT INTO note (id_etudiant, id_matiere, note) VALUES (?, ?, ?)', [id_etudiant, id_matiere, note], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        recalculerMoyenne(id_etudiant); // Recalculer la moyenne après l'ajout de la note
        res.status(201).json({ message: 'Note ajoutée' });
    });
});

// 2. Modifier une note
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { note, id_matiere } = req.body;

    if (note === undefined || note < 0 || note > 20) {
        return res.status(400).json({ message: 'Note invalide' });
    }
    if (!id_matiere) {
        return res.status(400).json({ message: 'Matière invalide' });
    }
    
    // Vérifier si la note existe avant de la mettre à jour
    db.query('SELECT id_etudiant FROM note WHERE id_note = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Note non trouvée' });
        }
        
        const id_etudiant = results[0].id_etudiant;

        // Mettre à jour la note et la matière
        const query = 'UPDATE note SET note = ?, id_matiere = ? WHERE id_note = ?';
        db.query(query, [note, id_matiere, id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Note non trouvée' });
            }
            // Recalculer la moyenne après la mise à jour de la note
            recalculerMoyenne(id_etudiant);
            res.json({ message: 'Note et matière mises à jour' });
        });
    });
});

// 3. Supprimer une note
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT id_etudiant FROM note WHERE id_note = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Note non trouvée' });
        }
        
        const id_etudiant = results[0].id_etudiant;

        db.query('DELETE FROM note WHERE id_note = ?', [id], (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Note non trouvée' });
            }
            // Recalculer la moyenne après la suppression de la note
            recalculerMoyenne(id_etudiant);
            res.json({ message: 'Note supprimée' });
        });
    });
});

// Route pour obtenir les notes d'un étudiant pour chaque matière
app.get('/notes/:id_etudiant', (req, res) => {
    const id_etudiant = req.params.id_etudiant;
    const query = `
      SELECT 
        e.id_etudiant, e.nom AS nom_etudiant,
        m.id_matiere, m.design AS matiere, 
        n.note, n.id_note
      FROM note n
      JOIN etudiant e ON e.id_etudiant = n.id_etudiant
      JOIN matiere m ON m.id_matiere = n.id_matiere
      WHERE e.id_etudiant = ?
    `;
  
    db.query(query, [id_etudiant], (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête : ', err);
        res.status(500).send('Erreur serveur');
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ message: 'Étudiant ou notes non trouvés', notes: [] });
        return;
      }
      res.json({ notes: results });
    });
});

// // Récupérer toutes les entrées de l'audit_note
// app.get('/audit_notes', (req, res) => {
//     const query = `SELECT * FROM audit_note`;
    
//     db.query(query, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });


// Récupérer toutes les entrées de l'audit_note avec résumé des opérations
app.get('/audit_notes', (req, res) => {
    const query = `SELECT * FROM audit_note`;
    
    // Requête pour compter le nombre d'opérations par type
    const countQuery = `
        SELECT 
            COUNT(CASE WHEN type_operation = 'INSERT' THEN 1 END) AS insertions,
            COUNT(CASE WHEN type_operation = 'UPDATE' THEN 1 END) AS modifications,
            COUNT(CASE WHEN type_operation = 'DELETE' THEN 1 END) AS suppressions
        FROM audit_note
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Effectuer la requête pour le résumé des opérations
        db.query(countQuery, (err, summaryResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            const summary = summaryResults[0]; // Résumé des opérations
            const totalInsertions = summary.insertions || 0;
            const totalModifications = summary.modifications || 0;
            const totalSuppressions = summary.suppressions || 0;

            // Retourner les résultats des audits et le résumé des opérations
            res.json({
                audit_notes: results,
                summary: {
                    insertions: totalInsertions,
                    modifications: totalModifications,
                    suppressions: totalSuppressions
                }
            });
        });
    });
});




app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
