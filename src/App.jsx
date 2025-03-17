import { Routes, Route } from "react-router-dom";
import Etudiant from "./pages/Etudiant";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Etudiant />} />
      <Route path="/etudiants" element={<Etudiant />} />
    </Routes>
  );
}

export default App;
