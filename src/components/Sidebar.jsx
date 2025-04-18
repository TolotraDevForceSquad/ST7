import { Link } from "react-router-dom";
import { GraduationCap, Inbox, User, Settings, LogOut, ClipboardList, Briefcase, Archive } from "lucide-react";

function Sidebar() {
  return (
    <div className="flex flex-col rounded-lg shadow-lg p-2 w-60">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Menu</h2>
      </div>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <GraduationCap className="h-5 w-5 mr-3 text-gray-700" />
            <span>Étudiants</span>
          </Link>
        </li>
        <li>
          <Link to="/matieres" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <Briefcase className="h-5 w-5 mr-3 text-gray-700" />
            <span>Matieres</span>
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">14</span>
          </Link>
        </li>
        <li>
          <Link to="/audit_notes" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <Archive className="h-5 w-5 mr-3 text-gray-700" />
            <span>Audit des Notes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;