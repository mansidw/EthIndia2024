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

import Web3, { ERR_INVALID_RESPONSE } from "web3";
import VoteOff from "../contract_ref/VoteOff.json";
// import BlockChainContext from "../context/BlockChain.jsx"
import BlockChain from "../context/BlockChain.jsx";
import chainData from "../contract_ref/deployed-contracts.json";

const getWeb3 = async () => {
  let tempWeb3 = undefined;
  if (window.ethereum) {
    tempWeb3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
      console.log("temp1 ", tempWeb3);
      // console.log(web3.eth.getAccounts());
      // Acccounts now exposed
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (tempWeb3) {
    tempWeb3 = new Web3(tempWeb3.currentProvider);
    console.log("temp2", tempWeb3);
    // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }

  return tempWeb3;
};

function CustomRoutes() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState();
  const [balance, setBalance] = useState(0);

  const location = useLocation(); // Get the current location

  // Define routes where SideBar should NOT be rendered
  const noSidebarRoutes = ["/", "/home"];

  // Check if the current route is in the no-sidebar list
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  const init = async () => {
    // load web3
    const tempWeb3 = await getWeb3();
    // loadBlockchainData
    const tempAccounts = await tempWeb3.eth.getAccounts();
    const networkId = await tempWeb3.eth.net.getId();
    const balanceInWei = await tempWeb3.eth.getBalance(tempAccounts[0]);
    const balanceInEther = tempWeb3.utils.fromWei(balanceInWei, "ether");

    let VoteOffCon;

    const listener = (accs) => {
      setAccounts(accs);
    };

    window.ethereum.on("accountsChanged", listener);

    console.log("tempWeb3", tempWeb3);
    console.log("tempaccounts", tempAccounts);
    console.log("networkId", networkId);

    const networkdata = chainData[networkId];
    console.log("networkData", networkdata);
    if (networkdata) {
      console.log("came indise------------");
      const abi = VoteOff;
      VoteOffCon = new tempWeb3.eth.Contract(abi, networkdata);

      setContract(VoteOffCon);
      setWeb3(tempWeb3);
      setAccounts(tempAccounts);
      setBalance(balanceInEther);
    }
  };

  const checkIfuserAlreadyregistered = async () => {
    let res = await contract?.methods.checkIfAlreadyRegistered().call();
    console.log("check user : ", res);
    return res;
  };

  useEffect(() => {
    init();
  }, []);

  console.log("contract address : ", contract?._address);
  console.log("account address: ", accounts[0]);

  return (
    <BlockChain.Provider value={{ web3, accounts, contract }}>
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
