// ctx.note.jsx
import { useState, createContext, useContext } from "react";
import { API_URL } from "../../config";

const ctxNote = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [idN, setIdN] = useState(null);
  const [idEtudiant, setIdEtudiant] = useState("");
  const [idMatiere, setIdMatiere] = useState("");
  const [note, setNote] = useState("");

  const [showNote, setShowNote] = useState(false);
  const [showUpNote, setShowUpNote] = useState(false);

  const clearNote = () => {
    setIdN(null);
    setIdEtudiant(null);
    setIdMatiere(null);
    setNote("");
  };

  const colectNote = (id, idEtudiant, idMatiere, note) => {
    setIdN(id);
    setIdEtudiant(idEtudiant);
    setIdMatiere(idMatiere);
    setNote(note);
  };

  const list_notes = async (id) => {
    try {
      const response = await fetch(`${API_URL}/notes/${id}`);
      console.log("Status de la réponse :", response.status);
      
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des notes");
      }

      const data = await response.json();
      console.log("Données reçues de l'API :", data);
      setNotes(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
    
  


// Fonction pour ajouter une note
const add_note = async (idEtudiant) => {
  try {
    console.log("Tentative d'ajout d'une note avec les données : ", { idEtudiant, idMatiere, note });

    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_etudiant: idEtudiant, id_matiere: idMatiere, note }),
    });

    console.log("Réponse du serveur reçue:", response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Réponse d'erreur du serveur:", errorData);
      throw new Error(errorData.message || "Erreur lors de l'ajout de la note");
    }

    const data = await response.json();
    console.log("Données reçues après ajout de la note:", data);

    list_notes(idEtudiant); // Rafraîchir la liste des notes pour cet étudiant
    setShowNote(false);

  } catch (error) {
    console.error("Erreur lors de l'ajout de la note :", error.message);
  }
};


  // Fonction pour supprimer une note
  const del_note = async (id, idEts) => {
    try {
      console.log("Tentative de suppression de la note avec ID:", id);
  
      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression de la note");
      }
  
      // Afficher la réponse sous forme de texte brut pour éviter l'erreur de double appel de .json()
      const responseText = await response.text();
      console.log("Données reçues de l'API après suppression de la note:", responseText);
      console.log("Appel à list_notes avec idEts:", idEts);

      list_notes(idEts);
  
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };
  

  // Fonction pour mettre à jour une note
  const update_note = async (id) => {
    try {
      console.log("Tentative de modification de la note avec ID:", id);

      const response = await fetch(`${API_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_etudiant: idEtudiant, id_matiere: idMatiere, note }),
      });

      console.log("Réponse du serveur:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification de la note");
      }

      const data = await response.json();
      console.log("Données reçues de l'API après modification de la note:", data);

      list_notes(idEtudiant); // Rafraîchir la liste des notes après la modification
      setShowNote(false);
      setShowUpNote(false);

    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  return (
    <ctxNote.Provider
      value={{
        notes, setNotes,
        list_notes,
        add_note,
        idN, setIdN,
        idEtudiant, setIdEtudiant,
        idMatiere, setIdMatiere,
        note, setNote,
        del_note,
        showNote, setShowNote,
        showUpNote, setShowUpNote,
        update_note,
        clearNote, colectNote,
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
