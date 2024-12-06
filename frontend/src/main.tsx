import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import PageNavbar from "./components/common/PageNavbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/common/Footer";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { DataProvider } from "./context/DataContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AnonAadhaarProvider _useTestAadhaar={true}>
        <AuthProvider>
          <DataProvider>
            <PageNavbar />
            <App />
            {/* <Footer /> */}
          </DataProvider>
        </AuthProvider>
      </AnonAadhaarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
