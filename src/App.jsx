import { Routes, Route } from "react-router-dom";
import Board from "./pages/Board";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
    </Routes>
  );
}

export default App;
