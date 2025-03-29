//Note.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableNot from "../components/Notes/TableNot"; // Table pour les notes
import { CirclePlus, Search } from "lucide-react";
import { useNote } from "../contexts/ctx.note"; // Contexte des notes
import { useEts } from "../contexts/ctx.etudiant";
import { useParams } from "react-router-dom";
import { useMat } from "../contexts/ctx.matiere";

function Note() {
  const { id } = useParams(); // On récupère l'ID de l'étudiant depuis les paramètres de l'URL

  const {
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
  } = useNote();

    const {
        etudiant, setEtudiant,
    } = useEts();

    const {
        matiere, setMatiere,
    } = useMat();

  const headers = ["Nom", "Matière", "Note", "Actions"];

  const rows = notes.map(not => ({
    id: not.id_note,
    nom: not.nom_etudiant,
    matiere: not.matiere,
    note: not.note,
  }));

  useEffect(() => {
      setNotes([]); // On vide les notes
      setIdEtudiant(id); // On met à jour l'ID de l'étudiant
      list_notes(id); // On charge les notes de cet étudiant
  }, [id]);

  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="bg-white w-screen h-screen shadow-lg flex flex-row p-3">
        <Sidebar />
        <div className="flex-1 flex-col shadow-lg rounded-lg p-5">
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">Liste des Notes</h5>
              <p className="text-gray-600">Vous trouvez ici la liste des notes des étudiants</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <input type="text" placeholder="Search" className="w-full px-4 py-2 border rounded-lg pl-10" />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => list_notes(idEtudiant)}>
                Rechercher
              </button>
            </div>
          </div>
          {rows.length > 0 ? (
            <TableNot 
              headers={headers} 
              rows={rows} 
              onEdit={(id, nom, matiere, note) => {
                setShowUpNote(true);
                setShowNote(true);
                colectNote(id, nom, matiere, note);
              }} 
              onDel={(id) => del_note(id)} 
              onNot={() => {}} // Vous pouvez gérer cela si nécessaire
            />
          ) : (
            <div className="text-red-500 text-center mt-4">
              Aucun note trouvée pour cet étudiant avec l'ID : {idEtudiant}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-10 right-10">
        <button className="p-2 rounded-lg" onClick={() => { setShowNote(true); setShowUpNote(false); clearNote(); }}>
          <CirclePlus className="h-16 w-16 text-blue-600 hover:text-gray-600" />
        </button>
      </div>

      {/* Modal */}
      {showNote && (
        <div>
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" onClick={() => setShowNote(false)}></div>
          <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl z-50 w-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-600">{showUpNote ? "Modifier la Note" : "Ajouter une Note"}</h2>
              <form className="flex flex-col gap-4 mt-4">
                <input 
                  type="text" 
                  placeholder={notes[0].nom_etudiant}
                  className="px-4 py-2 border rounded-lg" 
                  value={idEtudiant} 
                  onChange={(e) => setIdEtudiant(e.target.value)}
                  disabled 
                />
                <select
                    id="matiere-modal"
                    className="px-4 py-2 border rounded-lg"
                    value={idMatiere}
                    onChange={(e) => setIdMatiere(e.target.value)} // Met à jour l'ID de la matière sélectionnée
                    >
                    <option value="">Choisir une Matière</option> {/* Option par défaut */}
                    {matiere.map((item) => (
                        <option key={item.id_matiere} value={item.id_matiere}>
                        {item.design} {/* Affiche le nom de la matière */}
                        </option>
                    ))}
                </select>

                <input 
                  type="number" 
                  placeholder="Note" 
                  className="px-4 py-2 border rounded-lg" 
                  value={note} 
                  onChange={(e) => setNote(e.target.value)} 
                />
                <button 
                  type="button"
                  onClick={() => {
                    if (showUpNote) {
                      // Si showUpNote est true, c'est un update
                      update_note(idN);  
                    } else {
                      // Sinon, c'est un add
                      add_note();  // Fonction d'ajout
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  {showUpNote ? "Modifier" : "Ajouter"}
                </button>

                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => setShowNote(false)}
                >
                  Annuler
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
