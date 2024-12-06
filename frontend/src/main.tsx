import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PageNavbar from "./components/common/PageNavbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/common/Footer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PageNavbar />
        <App />
        {/* <Footer /> */}
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
