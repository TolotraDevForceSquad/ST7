//Etudiant.jsx

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableEts from "../components/Etudiants/TableEts";
import { CirclePlus, Search } from "lucide-react";
import { useEts } from "../contexts/ctx.etudiant";
import { useNote } from "../contexts/ctx.note";

//etudiant(id_etudiant, nom, moyenne)

function Etudiant() {
  const {
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
  } = useEts();

  // const {
  //   list_notes,
  // } = useNote();


  const headers = ["Nom", "Moyenne", "Actions"];

  const rows = etudiant.map(etu => ({
    id: etu.id_etudiant,
    nom: etu.nom,
    moyenne: etu.moyenne,
  }));


  useEffect(() => {
    list_etudiants();
    clearEts();
  }, []);

  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="bg-white w-screen h-screen shadow-lg flex flex-row p-3">
        <Sidebar />
        <div className="flex-1 flex-col shadow-lg rounded-lg p-5">
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">Liste des Etudiants</h5>
              <p className="text-gray-600">Vous trouvez ici la liste des etudiants avec certaines options</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <input type="text" placeholder="Search" className="w-full px-4 py-2 border rounded-lg pl-10" />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={list_etudiants}>
                Rechercher
              </button>
            </div>
          </div>
          <TableEts headers={headers} rows={rows} 
            onEdit={(i,n,m) => {
              setShowUpEts(true);
              setShowEts(true);
              colectEts(i,n,m);
            }} 
            onDel={(id) => del_etudiant(id)}
          />
        </div>
      </div>
      
      <div className="fixed bottom-10 right-10">
        <button className="p-2 rounded-lg" onClick={() => {setShowEts(true);setShowUpEts(false); clearEts();}}>
          <CirclePlus className="h-16 w-16 text-blue-600 hover:text-gray-600"/>
        </button>
      </div>
  
      {/* Modal */}
      {showEts && (
        <div>
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" onClick={() => setShowEts(false)}></div>

        <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl z-50 w-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-600">{showUpEts ? "Modifier" : "Ajouter"} Etudiant</h2>
            <form className="flex flex-col gap-4 mt-4">
              <input 
                type="text" 
                placeholder="Nom" 
                className="px-4 py-2 border rounded-lg" 
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Moyenne" 
                className="px-4 py-2 border rounded-lg" 
                value={moyenne}
                onChange={(e) => setMoyenne(e.target.value)}
              />
              <button 
                type="button"
                //clicker et ajouter un etudiant
                onClick={() => {
                  if (showUpEts) {
                    // Si showUpEts est true, c'est un update
                    update_etudiant(id);  
                  } else {
                    // Sinon, c'est un add
                    add_etudiant();  // Fonction d'ajout
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {showUpEts ? "Modifier" : "Ajouter"}
              </button>

              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setShowEts(false);
                  // setShowUpEts(false);
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

export default Etudiant;
