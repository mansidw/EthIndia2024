import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../components/home/Home";
import Profile from "../components/profile/Profile";
import Anon from "../components/signin/Anon";
import SideBar from "../components/SideBar/SideBar";
import Adddata from "../components/AddData/AddData";
import Verify from "../components/Verify/Verify";
import LandingPage from "../components/LandingPage/LandingPage";
import UserProfile from "../components/UserProfile/UserProfile";
import "./Routes.css";

function CustomRoutes() {
  const location = useLocation(); // Get the current location

  // Define routes where SideBar should NOT be rendered
  const noSidebarRoutes = ["/", "/home"];

  // Check if the current route is in the no-sidebar list
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
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
          <Route path="/add" element={<Adddata />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/anon" element={<Anon />} />
        </Routes>
      </div>
    </div>
  );
}

export default CustomRoutes;
