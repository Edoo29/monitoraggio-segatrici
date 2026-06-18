import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router";

import App from "./pages/App.jsx";
import Setup from "./pages/Setup.jsx";
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
      </Routes>
    </Router>
  </StrictMode>,
);
