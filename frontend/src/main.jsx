import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router";

import App from "./pages/App.jsx";
import Setup from "./pages/Setup.jsx";
import Tagli from "./pages/Tagli.jsx";
import Materiali from "./pages/Materiali.jsx";
import TitleBar from "./components/ui/TitleBar.jsx";

const isMacOS = window.env?.platform === "darwin";
const Router = window.electron ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {!isMacOS && <TitleBar />}

    <Router>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/dashboard" element={<App />} />
        <Route path="/tagli" element={<Tagli />} />
        <Route path="/materiali" element={<Materiali />} />
      </Routes>
    </Router>
  </StrictMode>,
);
