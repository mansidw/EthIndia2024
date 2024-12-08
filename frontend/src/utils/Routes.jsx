import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../components/profile/Profile";
import Anon from "../components/signin/Anon";
import SideBar from "../components/SideBar/SideBar";
import Adddata from "../components/AddData/AddData";
import Verify from "../components/Verify/Verify";
import LandingPage from "../components/LandingPage/LandingPage";
import UserProfile from "../components/UserProfile/UserProfile";
import "./Routes.css";

// import BlockChainContext from "../context/BlockChain.jsx"
import BlockChain from "../context/BlockChain.jsx";


function CustomRoutes() {

  const location = useLocation(); // Get the current location

  // Define routes where SideBar should NOT be rendered
  const noSidebarRoutes = ["/", "/home"];

  // Check if the current route is in the no-sidebar list
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  const web3 = "";
  const accounts = [""];
  const contract = "";
  const balance = 0;
  return (
    <BlockChain.Provider>
      <div className="route_container">
        {/* Conditionally render Sidebar */}
        {!hideSidebar && (
          <div className="left_container">
            <SideBar />
          </div>
        )}
        <div className={`right_container ${hideSidebar ? "full_width" : ""}`}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/add"
              element={
                <Adddata web3={web3} accounts={accounts} contract={contract} />
              }
            />
            <Route
              path="/verify"
              element={
                <Verify web3={web3} accounts={accounts} contract={contract} />
              }
            />
            <Route
              path="/profile"
              element={
                <UserProfile
                  web3={web3}
                  accounts={accounts}
                  contract={contract}
                  balance={balance}
                />
              }
            />
            <Route path="/anon" element={<Anon />} />
          </Routes>
        </div>
      </div>
    </BlockChain.Provider>
  );
}

export default CustomRoutes;
