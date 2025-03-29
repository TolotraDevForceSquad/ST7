import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TableMat from "../components/Matieres/TableMat";
import { CirclePlus, Search } from "lucide-react";
import { useMat } from "../contexts/ctx.matiere";

function Matiere() {
  const {
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
  } = useMat();

  const headers = ["Désignation", "Coefficient", "Actions"];

  const rows = matiere.map(mat => ({
    id: mat.id_matiere,
    design: mat.design,
    coef: mat.coef,
  }));

  useEffect(() => {
    list_matieres();
  }, []);

  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="bg-white w-screen h-screen shadow-lg flex flex-row p-3">
        <Sidebar />
        <div className="flex-1 flex-col shadow-lg rounded-lg p-5">
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">Liste des Matières</h5>
              <p className="text-gray-600">Vous trouvez ici la liste des matières avec certaines options</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-72">
                <input type="text" placeholder="Search" className="w-full px-4 py-2 border rounded-lg pl-10" />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={list_matieres}>
                Rechercher
              </button>
            </div>
          </div>
          <TableMat headers={headers} rows={rows} 
            onEdit={(i,d,c) => {
              setShowUpMat(true);
              setShowMat(true);
              colectMat(i,d,c);
            }} onDel={(id) => del_matiere(id)} />
        </div>
      </div>

      <div className="fixed bottom-10 right-10">
        <button className="p-2 rounded-lg" onClick={() => {setShowMat(true); setShowUpMat(false); clearMat();}}>
          <CirclePlus className="h-16 w-16 text-blue-600 hover:text-gray-600"/>
        </button>
      </div>

      {/* Modal */}
      {showMat && (
        <div>
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-40" onClick={() => setShowMat(false)}></div>

        <div className="absolute flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-2xl z-50 w-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-blue-600">{showUpMat ? "Modifier Matière" : "Ajouter Matière"}</h2>
            <form className="flex flex-col gap-4 mt-4">
              <input 
                type="text" 
                placeholder="Désignation" 
                className="px-4 py-2 border rounded-lg" 
                value={design}
                onChange={(e) => setDesign(e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Coefficient" 
                className="px-4 py-2 border rounded-lg" 
                value={coef}
                onChange={(e) => setCoef(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => {
                  if (showUpMat) {
                    // Update the matiere
                    update_matiere(id);
                  } else {
                    // Add a new matiere
                    add_matiere();
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {showUpMat ? "Modifier" : "Ajouter"}
              </button>

              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowMat(false)}
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

export default Matiere;
