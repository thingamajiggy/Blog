import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { AuthContextProvider } from "./context/authContext";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
