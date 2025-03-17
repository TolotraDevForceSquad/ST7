import { Link } from "react-router-dom";
import { GraduationCap, NotebookPen, Inbox, User, Settings, LogOut } from "lucide-react";

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
          <Link to="/notes" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <NotebookPen className="h-5 w-5 mr-3 text-gray-700" />
            <span>Notes</span>
          </Link>
        </li>
        <li>
          <Link to="/inbox" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <Inbox className="h-5 w-5 mr-3 text-gray-700" />
            <span>Inbox</span>
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">14</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <User className="h-5 w-5 mr-3 text-gray-700" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer">
            <Settings className="h-5 w-5 mr-3 text-gray-700" />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/logout" className="flex items-center p-3 rounded-md hover:bg-gray-100 cursor-pointer text-red-500">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;