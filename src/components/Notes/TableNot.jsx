//TableNot.jsx
import { ListCheck, Pencil, Trash2Icon, X } from "lucide-react";

const TableNot = ({ headers, rows, onEdit, onDel, onNot }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((head, index) => (
              <th key={index} className="px-4 py-2 text-left text-gray-700 font-semibold">{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({id, idEts, idMat, nom, matiere, note }, index) => ( 
            <tr key={index} className="border-t">
              {/* <td className="px-4 py-2">{id}</td> */}
              <td className="px-4 py-2">{nom}</td>
              <td className="px-4 py-2">{matiere}</td>
              <td className="px-4 py-2">{note}</td>
                <td className="px-4 py-2">
                  <button onClick={() => onEdit(id, idMat, nom, matiere, note)} className="p-2 rounded-lg hover:bg-gray-200">
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button onClick={() => onDel(id, idEts)} className="p-2 rounded-lg hover:bg-gray-200">
                    <Trash2Icon className="h-4 w-4 text-red-600"/>
                  </button>
                  {/* <button onClick={() => onNot(id)} className="p-2 rounded-lg hover:bg-gray-200">
                    <ListCheck className="h-5 w-5 text-blue-600"/>
                  </button> */}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableNot;
