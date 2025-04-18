import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNote } from "../contexts/ctx.note";
import Sidebar from "../components/Sidebar";
import { Search } from "lucide-react";
import TableAudi from "../components/Notes/TableAudi";

function AuditNotes() {
    const {
        list_audit_notes,
        audiNotes, setAuditNotes,
    } = useNote();

    const [searchTerm, setSearchTerm] = useState(""); // Nouvel état pour la recherche

    const headers = [
        "Type d'opération",
        "Date de mise à jour",
        "Numéro étudiant",
        "Nom de l'étudiant",
        "Matière",
        "Ancienne note",
        "Nouvelle note",
        "Utilisateur"
    ];
    
    const filteredRows = audiNotes
        .filter(item => {
            const searchValue = searchTerm.toLowerCase();
            return (
                item.type_operation.toLowerCase().includes(searchValue) ||
                item.date_mise_a_jour.toLowerCase().includes(searchValue) ||
                item.id_etudiant.toString().includes(searchValue) ||
                item.nom_etudiant.toLowerCase().includes(searchValue) ||
                item.design_matiere.toLowerCase().includes(searchValue) ||
                (item.note_ancien && item.note_ancien.toLowerCase().includes(searchValue)) ||
                (item.note_nouv && item.note_nouv.toLowerCase().includes(searchValue)) ||
                item.utilisateur.toLowerCase().includes(searchValue)
            );
        })
        .map(item => ({
            type_operation: item.type_operation,
            date_mise_a_jour: new Date(item.date_mise_a_jour).toLocaleString(),
            numero_etudiant: item.id_etudiant,
            nom: item.nom_etudiant,
            matiere: item.design_matiere,
            ancienne_note: item.note_ancien ?? "-",
            nouvelle_note: item.note_nouv ?? "-",
            utilisateur: item.utilisateur,
        }));
    
    useEffect(() => {
        list_audit_notes();
    }, []);

    return (
        <div className="w-screen h-screen items-center justify-center">
            <div className="bg-white w-screen h-screen  flex flex-row p-3">
                <Sidebar />
                <div className="flex-1 flex-col rounded-lg p-5">
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <h5 className="text-lg font-semibold">Audit des Notes</h5>
                            <p className="text-gray-600">Vous trouvez ici l'Historique des Modifications des Notes</p>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative w-full md:w-72">
                                <input 
                                    type="text" 
                                    value={searchTerm} // Lier l'état de recherche
                                    onChange={(e) => setSearchTerm(e.target.value)} // Déclencher la recherche en temps réel
                                    placeholder="Search" 
                                    className="w-full px-4 py-2 border rounded-lg pl-10" 
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                            </div>
                        </div>
                    </div>
                    <TableAudi 
                        headers={headers} 
                        rows={filteredRows} // On passe les rows filtrées ici
                        summary={{
                            insertions: filteredRows.filter(row => row.type_operation === "INSERT").length,
                            modifications: filteredRows.filter(row => row.type_operation === "UPDATE").length,
                            suppressions: filteredRows.filter(row => row.type_operation === "DELETE").length
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AuditNotes;
