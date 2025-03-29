//main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { EtudiantProvider } from "./contexts/ctx.etudiant";
import { MatiereProvider } from "./contexts/ctx.matiere";
import { NoteProvider } from "./contexts/ctx.note";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EtudiantProvider>
        <MatiereProvider>
          <NoteProvider>
            <App />
          </NoteProvider>
        </MatiereProvider>
      </EtudiantProvider>
    </BrowserRouter>
  </React.StrictMode>
);
