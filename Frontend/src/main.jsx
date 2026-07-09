import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./global.css";
import "./buttons.css";
import "./cards.css";
import "./layout.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

