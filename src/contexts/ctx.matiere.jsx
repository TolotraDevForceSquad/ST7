// ctx.matiere.jsx
import { useState, createContext, useContext } from "react";
import { API_URL } from "../../config";

//matiere(id_matiere, design, coef)

const ctxMatiere = createContext();

export const MatiereProvider = ({ children }) => {
  const [matiere, setMatiere] = useState([]);

  const [id, setId] = useState(null);
  const [design, setDesign] = useState("");
  const [coef, setCoef] = useState("");

  const [showMat, setShowMat] = useState(false);
  const [showUpMat, setShowUpMat] = useState(false);

  const clearMat = () => {
    setId(null);
    setDesign("");
    setCoef("");
  };

  const colectMat = (id, design, coef) => {
    setId(id);
    setDesign(design);
    setCoef(coef);
  };

  // Fonction pour récupérer la liste des matières
  const list_matieres = async () => {
    try {
      const response = await fetch(`${API_URL}/matieres`);
      console.log("Status de la réponse :", response.status);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération");
      }
      const data = await response.json();
      console.log("Données reçues de l'API :", data);
      setMatiere(data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Fonction pour ajouter une matière
  const add_matiere = async () => {
    try {
      console.log("Tentative d'ajout d'une matière avec les données : ", { design, coef });

      const response = await fetch(`${API_URL}/matieres`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ design, coef }),
      });

      console.log("Réponse du serveur reçue:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Réponse d'erreur du serveur:", errorData);
        throw new Error(errorData.message || "Erreur lors de l'ajout");
      }

      const data = await response.json();
      console.log("Données reçues après ajout de la matière:", data);

      list_matieres(); // Rafraîchir la liste des matières
      setShowMat(false);

    } catch (error) {
      console.error("Erreur lors de l'ajout de la matière :", error.message);
    }
  };

  // Fonction pour supprimer une matière
  const del_matiere = async (id) => {
    try {
      console.log("Tentative de suppression de la matière avec ID:", id);

      const response = await fetch(`${API_URL}/matieres/${id}`, {
        method: "DELETE",
      });

      console.log("Réponse du serveur:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression");
      }

      const data = await response.json();
      console.log("Données reçues de l'API après suppression:", data);

      list_matieres(); // Rafraîchir la liste des matières après la suppression
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  // Fonction pour mettre à jour une matière
  const update_matiere = async (id) => {
    try {
      console.log("Tentative de modification de la matière avec ID:", id);

      const response = await fetch(`${API_URL}/matieres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ design, coef }),
      });

      console.log("Réponse du serveur:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la modification");
      }

      const data = await response.json();
      console.log("Données reçues de l'API après modification:", data);

      list_matieres(); // Rafraîchir la liste des matières après la modification
      setShowMat(false);
      setShowUpMat(false);

    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  return (
    <ctxMatiere.Provider
      value={{
        matiere, setMatiere,
        list_matieres,
        add_matiere,
        id, setId,
        design, setDesign,
        coef, setCoef,
        del_matiere,
        showMat, setShowMat,
        showUpMat, setShowUpMat,
        update_matiere,
        clearMat, colectMat,
      }}
    >
      {children}
    </ctxMatiere.Provider>
  );
};

export const useMat = () => {
  const context = useContext(ctxMatiere);
  if (!context) {
    throw new Error("Mauvaise utilisation de useMatiere");
  }
  return context;
};
