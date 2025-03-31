// ctx.note.jsx
import { useState, createContext, useContext } from "react";
import { API_URL } from "../../config";

const ctxNote = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const [showNote, setShowNote] = useState(false);
  const [showUpNote, setShowUpNote] = useState(false);

  const [idMat, setIdMat] = useState("");
  const [note, setNote] = useState("");
  const [idNts, setIdNts] = useState("");

  const clearNotes = () => {
    setNote("");
    setIdMat("");
    setIdNts("");
    console.log("Notes cleared");
  }

  const list_note_ets = async (id) => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notes");
      }
      const data = await response.json();

      // Si les notes sont vides, stocke un tableau vide, sinon stocke les notes récupérées
      if (data.notes.length === 0) {
        setNotes([]); // Pas de notes
      } else {
        setNotes(data.notes); // Notes récupérées
      }
    } catch (error) {
      console.error("Erreur:", error);
      setNotes([]); // En cas d'erreur ou d'absence de notes, on vide le tableau
    }
  };

  const add_note_ets = async (id_etudiant, id_matiere, note) => {
    try {
        const response = await fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_etudiant,
                id_matiere,
                note
            })
        });

        if (!response.ok) { // Si la requête a échoué
            const errorData = await response.json();
            console.error('Erreur lors de l\'ajout de la note :', errorData.message);
        } else {
            const data = await response.json();
            console.log('Note ajoutée avec succès :', data.message);
            list_note_ets(id_etudiant);
            clearNotes();
            setShowNote(false);
        }
    } catch (error) {
        console.error('Erreur réseau ou serveur :', error.message);
    }
};

const up_note_ets = async (id_note, id_etudiant, note) => {
  try {
      if (note === "" || note < 0 || note > 20) {
          console.error('Note invalide');
          return;
      }

      const response = await fetch(`${API_URL}/notes/${id_note}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              note
          })
      });

      if (!response.ok) { 
          const errorData = await response.json();
          console.error('Erreur lors de la mise à jour de la note :', errorData.message);
      } else {
          const data = await response.json();
          console.log('Note mise à jour avec succès :', data.message);
          list_note_ets(id_etudiant);
          setShowNote(false);
          setShowUpNote(false);
          clearNotes();
      }
  } catch (error) {
      console.error('Erreur réseau ou serveur :', error.message);
  }
};

const del_note_ets = async (id_note, id_etudiant) => {
  try {
      const response = await fetch(`${API_URL}/notes/${id_note}`, {
          method: 'DELETE',
      });

      if (!response.ok) { 
          const errorData = await response.json();
          console.error('Erreur lors de la suppression de la note :', errorData.message);
      } else {
          const data = await response.json();
          console.log('Note supprimée avec succès :', data.message);
          list_note_ets(id_etudiant); // On recharge les notes pour l'étudiant concerné
      }
  } catch (error) {
      console.error('Erreur réseau ou serveur :', error.message);
  }
};



  return (
    <ctxNote.Provider
      value={{
        notes, setNotes,
        list_note_ets,
        showNote, setShowNote,
        showUpNote, setShowUpNote,
        idMat, setIdMat,
        note, setNote,
        add_note_ets,
        clearNotes,
        idNts, setIdNts,
        up_note_ets,
        del_note_ets,
      }}
    >
      {children}
    </ctxNote.Provider>
  );
};

export const useNote = () => {
    const context = useContext(ctxNote);
    if (!context) {
      throw new Error("Mauvaise utilisation de useNote");
    }
    return context;
};
