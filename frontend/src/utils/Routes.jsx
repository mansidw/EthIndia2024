import { Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import Profile from "../components/profile/Profile";
import Anon from "../components/signin/Anon";
import SideBar from "../components/SideBar/SideBar";
import Adddata from "../components/AddData/Adddata";
import Verify from "../components/Verify/Verify";
import "./Routes.css";

function CustomRoutes() {
  return (
    <div className="route_container">
      <div className="left_container">
        <SideBar />
      </div>
      <div className="right_container">
        <Routes>
          <Route path="/" element={<Adddata />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/anon" element={<Anon />} />
        </Routes>
      </div>
    </div>
  );
}

export default CustomRoutes;
