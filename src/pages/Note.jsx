import { useParams } from "react-router-dom";
import { useNote } from "../contexts/ctx.note";
import { useEffect } from "react";
import { CirclePlus, Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TableNot from "../components/Notes/TableNot";
import { useEts } from "../contexts/ctx.etudiant";
import { useMat } from "../contexts/ctx.matiere";

function Note() {
  const { id } = useParams();
  const { 
    notes, list_note_ets,
    showNote, setShowNote,
    showUpNote, setShowUpNote,
    idMat, setIdMat,
    note, setNote,
    add_note_ets,
    idNts, setIdNts,
    clearNotes,
    up_note_ets,
    del_note_ets,
  } = useNote();

  const {
    list_etudiants,
    etudiant, setEtudiant,
  } = useEts();

  const {
    list_matieres,
    matiere, setMatiere,
  } = useMat();
  
  useEffect(() => {
    if (id) {
      list_etudiants();
      list_matieres();
      list_note_ets(id);
    }
  }, [id]);

  const headers = ["Nom", "Matière", "Note", "Actions"];
  
  const rows = notes.map(note => ({
    id: note.id_note,
    idEts: note.id_etudiant,
    idMat: note.id_matiere,
    nom: note.nom_etudiant,
    matiere: note.matiere,
    note: note.note
  }));

  const handleDelete = (id, idEts) => {
    console.log("Suppression de la note :", { id, idEts });
  };
  
  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="bg-white w-screen h-screen shadow-lg flex flex-row p-3">
        <Sidebar />
        <div className="flex-1 flex-col shadow-lg rounded-lg p-5">
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">Liste des Notes</h5>
              <p className="text-gray-600">Vous trouvez ici la liste des notes de l'etudiant {notes[0]?.nom_etudiant || ""}</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <input type="text" placeholder="Search" className="w-full px-4 py-2 border rounded-lg pl-10" />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Rechercher
              </button>
            </div>
          </div>
          {notes.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              Cet étudiant n'a pas de notes pour le moment.
            </div>
          ) : (
            <TableNot 
              headers={headers}
              rows={rows}
              onEdit={(i,im,n,m,nt) => {
                  setShowUpNote(true);
                  setShowNote(true);
                  setIdNts(i);
                  setIdMat(im);
                  setNote(nt);
                }
              }
              onDel={(i,ie) => del_note_ets(i,ie)}
            />
          )}
        </div>
      </div>

      <div className="fixed bottom-10 right-10">
        <button className="p-2 rounded-lg" onClick={() => {setShowNote(true);clearNotes();}}>
          <CirclePlus className="h-16 w-16 text-blue-600 hover:text-gray-600"/>
        </button>
      </div>

      {/* Modal */}
      {showNote && (
        <div>
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" onClick={() => {setShowNote(false)}}></div>

        <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl z-50 w-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-600">{showUpNote ? "Modifier" : "Ajouter"} Note</h2>
            <form className="flex flex-col gap-4 mt-4">
              <input 
                type="text" 
                placeholder={etudiant.find((e) => e.id_etudiant === parseInt(id))?.nom || ""} 
                className="px-4 py-2 border rounded-lg"
                disabled 
              />
              <select
                  id="matiere-modal"
                  className="px-4 py-2 border rounded-lg"
                  value={idMat}
                  onChange={(e) => setIdMat(e.target.value)}
                  >
                  <option value="">Choisir une Matière</option>
                  {matiere
                    .filter(item => 
                      !rows.some(rowItem => rowItem.idMat === item.id_matiere) || item.id_matiere === parseInt(idMat)
                    )
                    .map(item => (
                        <option key={item.id_matiere} value={item.id_matiere}>
                            {item.design}
                        </option>
                    ))
                  }
              </select>
              <input 
                type="text" 
                placeholder="Note" 
                className="px-4 py-2 border rounded-lg" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => {
                  if (showUpNote) {
                    up_note_ets(idNts, id, note);
                  } else {
                    add_note_ets(id, idMat, note);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {showUpNote ? "Modifier" : "Ajouter"}
              </button>

              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setShowNote(false);
                }}
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
