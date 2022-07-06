import React from "react";
import AppRouter from "./routes/AppRouter";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
