import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";

function Home() {
  const { getUnlockTime, withdrawMoney } = useAuth();
  return <div>Helllo</div>;
}

export default Home;
