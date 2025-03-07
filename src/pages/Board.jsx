import { 
  GraduationCap, 
  NotebookPen, 
  Inbox, 
  User, 
  Settings, 
  LogOut,
  Pencil, Download, Search 
} from "lucide-react";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];

const TABLE_ROWS = [
  { name: "Spotify", amount: "$2,500", date: "Wed 3:00pm", status: "paid", account: "visa" },
  { name: "Amazon", amount: "$5,000", date: "Wed 1:00pm", status: "paid", account: "master-card" },
  { name: "Pinterest", amount: "$3,400", date: "Mon 7:40pm", status: "pending", account: "master-card" },
  { name: "Google", amount: "$1,000", date: "Wed 5:00pm", status: "paid", account: "visa" },
  { name: "Netflix", amount: "$14,000", date: "Wed 3:30am", status: "cancelled", account: "visa" },
];

function Board() {
  return (
    <div className="w-screen h-screen items-center justify-center">
      <div className="bg-white w-screen h-screen shadow-lg flex flex-row p-3">
        <div className="flex flex-col rounded-lg shadow-lg p-2 w-60">
          <div className="mb-4">
            
          </div>
          
          <ul className="space-y-2">
            <li className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
              <GraduationCap className="h-5 w-5 mr-3 text-gray-700" />
              <span>Etudians</span>
            </li>
            <li className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
              <NotebookPen className="h-5 w-5 mr-3 text-gray-700" />
              <span>Notes</span>
            </li>
            <li className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
              <Inbox className="h-5 w-5 mr-3 text-gray-700" />
              <span>Inbox</span>
              <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">14</span>
            </li>
            <li className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
              <User className="h-5 w-5 mr-3 text-gray-700" />
              <span>Profile</span>
            </li>
            <li className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
              <Settings className="h-5 w-5 mr-3 text-gray-700" />
              <span>Settings</span>
            </li>
            <li className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer text-red-500">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
        {/* List Etudiants */}
        <div className="flex-1 flex-col shadow-lg rounded-lg p-5">
          <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h5 className="text-lg font-semibold">Liste des Etudiants</h5>
              <p className="text-gray-600">Vous trouvez ici la liste des etudiants avec certaint option</p>
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="px-4 py-2 text-left text-gray-700 font-semibold">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, amount, date, status, account }, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2">{amount}</td>
                    <td className="px-4 py-2">{date}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-white ${status === "paid" ? "bg-green-500" : status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{account}</td>
                    <td className="px-4 py-2">
                      <button className="p-2 rounded-lg hover:bg-gray-200">
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="px-4 py-2 border rounded-lg">Previous</button>
            <div className="flex gap-2">
              {[1, 2, 3, "...", 8, 9, 10].map((num, idx) => (
                <button key={idx} className="px-3 py-1 border rounded-lg hover:bg-gray-200">{num}</button>
              ))}
            </div>
            <button className="px-4 py-2 border rounded-lg">Next</button>
          </div>         
        </div>
      </div>
    </div>
  );
}

export default Board;