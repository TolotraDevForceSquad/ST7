import { Pencil } from "lucide-react";

const Table = ({ headers, rows, onEdit }) => {
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
          {rows.map(({ name, amount, date, status, account }, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{name}</td>
              <td className="px-4 py-2">{amount}</td>
              <td className="px-4 py-2">{date}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white 
                  ${status === "paid" ? "bg-green-500" : status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                  {status}
                </span>
              </td>
              <td className="px-4 py-2">{account}</td>
              <td className="px-4 py-2">
                <button onClick={() => onEdit(name)} className="p-2 rounded-lg hover:bg-gray-200">
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
