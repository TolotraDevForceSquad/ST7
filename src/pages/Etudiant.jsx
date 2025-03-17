import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { Search } from "lucide-react";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = [
  { name: "Spotify", amount: "$2,500", date: "Wed 3:00pm", status: "paid", account: "visa" },
  { name: "Amazon", amount: "$5,000", date: "Wed 1:00pm", status: "paid", account: "master-card" },
  { name: "Pinterest", amount: "$3,400", date: "Mon 7:40pm", status: "pending", account: "master-card" },
  { name: "Google", amount: "$1,000", date: "Wed 5:00pm", status: "paid", account: "visa" },
  { name: "Netflix", amount: "$14,000", date: "Wed 3:30am", status: "cancelled", account: "visa" },
];

const handleEdit = (name) => {
  alert(`Modifier : ${name}`);
};

function Etudiant() {
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
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Rechercher
              </button>
            </div>
          </div>
          <Table headers={TABLE_HEAD} rows={TABLE_ROWS} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
}

export default Etudiant;
