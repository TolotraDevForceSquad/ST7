import React from "react";

const TableAudi = ({ headers, rows, summary }) => {
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
          {rows.map((row, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{row.type_operation}</td>
              <td className="px-4 py-2">{row.date_mise_a_jour}</td>
              <td className="px-4 py-2">{row.numero_etudiant}</td>
              <td className="px-4 py-2">{row.nom}</td>
              <td className="px-4 py-2">{row.matiere}</td>
              <td className="px-4 py-2">{row.ancienne_note ?? "-"}</td>
              <td className="px-4 py-2">{row.nouvelle_note ?? "-"}</td>
              <td className="px-4 py-2">{row.utilisateur}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Résumé des opérations */}
      <div className="mt-4 text-right font-semibold text-gray-700">
        Insertion : {summary.insertions} | Modification : {summary.modifications} | Suppression : {summary.suppressions}
      </div>
    </div>
  );
};

export default TableAudi;