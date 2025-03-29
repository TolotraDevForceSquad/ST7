//ctx.etudiant.jsx
import { useState, createContext, useContext } from "react";
import { API_URL } from "../../config";

const ctxEtudiant = createContext();

//etudiant(id_etudiant, nom, moyenne)

export const EtudiantProvider = ({ children }) => {
  const [etudiant, setEtudiant] = useState([]);

  const [id, setId] = useState(null);
  const [nom, setNom] = useState("");
  const [moyenne, setMoyenne] = useState("");

  const [showEts, setShowEts] = useState(false);
  const [showUpEts, setShowUpEts] = useState(false);

  const clearEts = () => {
    setId(null);
    setNom("");
    setMoyenne("");
  };
  
  const colectEts = (id, nom, moyenne) => {
    setId(id);
    setNom(nom);
    setMoyenne(moyenne);
  };


  const list_etudiants = async () => {
    try {
      const response = await fetch(`${API_URL}/etudiants`);
      console.log("Status de la réponse :", response.status);
      if (!response.ok) {
        throw new Error("Erreur lors de la recuperation");
      }
      const data = await response.json();
      console.log("Données reçues de l'API :", data);
      setEtudiant(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  const add_etudiant = async () => {
    try {
      console.log("Tentative d'ajout d'un étudiant avec les données : ", { nom, moyenne });
  
      const response = await fetch(`${API_URL}/etudiants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, moyenne }),
      });
  
      console.log("Réponse du serveur reçue:", response);
  
      // Vérifier si la réponse a un code d'état HTTP OK (2xx)
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Réponse d'erreur du serveur:", errorData);
        throw new Error(errorData.message || "Erreur lors de l'ajout");
      }
  
      // Si la réponse est OK, récupérer les données de l'API
      const data = await response.json();
      console.log("Données reçues après ajout de l'étudiant:", data);
  
      // Rafraîchir la liste des étudiants
      list_etudiants();
      setShowEts(false);
  
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error.message);
    }
  }
  

  const del_etudiant = async (id) => {
    try {
      console.log("Tentative de suppression de l'étudiant avec ID:", id);
      
      const response = await fetch(`${API_URL}/etudiants/${id}`, {
        method: "DELETE",
      });
  
      console.log("Réponse du serveur:", response);
  
      if (!response.ok) {
        // Si la réponse n'est pas OK, vérifier le type d'erreur
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }
  
      const data = await response.json();
      console.log("Données reçues de l'API après suppression:", data);
  
      list_etudiants(); // Rafraîchir la liste des étudiants après la suppression
    } catch (error) {
      // Afficher l'erreur détaillée dans la console
      console.error("Erreur:", error.message);
    }
  };

  const update_etudiant = async (id) => {
    try {
      console.log("Tentative de modification de l'étudiant avec ID:", id);
      
      const response = await fetch(`${API_URL}/etudiants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, moyenne }),
      });
  
      console.log("Réponse du serveur:", response);
  
      if (!response.ok) {
        // Si la réponse n'est pas OK, vérifier le type d'erreur
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification");
      }
  
      const data = await response.json();
      console.log("Données reçues de l'API après modification:", data);
  
      list_etudiants(); // Rafraîchir la liste des étudiants après la modification
      setShowEts(false);
      setShowUpEts(false);
    } catch (error) {
      // Afficher l'erreur détaillée dans la console
      console.error("Erreur:", error.message);
    }
  };
  
  

  return (
    <ctxEtudiant.Provider value={{ 
      etudiant, setEtudiant,
      list_etudiants,
      add_etudiant,
      id, setId,
      nom, setNom,
      moyenne, setMoyenne,
      del_etudiant,
      showEts, setShowEts,
      showUpEts, setShowUpEts,
      update_etudiant,
      clearEts, colectEts,
    }}>
      {children}
    </ctxEtudiant.Provider>
  );
}

export const useEts = () => {
  const context = useContext(ctxEtudiant);
  if (!context) {
    throw new Error("Mauvais Utilisation de UseEts");
  }
    return useContext(ctxEtudiant);
}