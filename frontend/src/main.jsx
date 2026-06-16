import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import TitleBar from "./components/TitleBar.jsx";
const isMacOS = window.env?.platform === "darwin";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {!isMacOS && <TitleBar />}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
