//App.jsx

import { Routes, Route } from "react-router-dom";
import Etudiant from "./pages/Etudiant";
import Matiere from "./pages/Matiere";
import Note from "./pages/Note";
import AuditNotes from "./pages/AudiNote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Etudiant />} />
      <Route path="/etudiants" element={<Etudiant />} />
      <Route path="/matieres" element={<Matiere />} />
      <Route path="/notes/:id" element={<Note />} />
      <Route path="/audit_notes" element={<AuditNotes />} />
    </Routes>
  );
}

export default App;
