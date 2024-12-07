import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="side_nav_container">
      <div className="sidebar_container">
        <div className="side_nav">
          <div className="nav_points">
            <ul className="nav_list">
              <Link to="">
                <li
                  className={`nav_item ${
                    currentPath === "/add" ? "active" : ""
                  }`}
                >
                  <p>Add Data</p>
                </li>
              </Link>
              <Link to="verify">
                <li
                  className={`nav_item ${
                    currentPath === "/verify" ? "active" : ""
                  }`}
                >
                  <p>Verify</p>
                </li>
              </Link>
              <Link to="market">
                <li
                  className={`nav_item ${
                    currentPath === "/market" || currentPath.includes("/market")
                      ? "active"
                      : ""
                  }`}
                >
                  <p>Market place</p>
                </li>
              </Link>
              <Link to="profile">
                <li
                  className={`nav_item ${
                    currentPath === "/profile" ? "active" : ""
                  }`}
                >
                  <p>Profile</p>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
