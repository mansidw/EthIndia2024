/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */

import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { useEffect, useState, useContext, createContext } from "react";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import RPC from "../utils/viemRPC";

import { toast } from "react-toastify";

const AuthContext = createContext();

const clientId = import.meta.env.VITE_SOME_KEY;

// const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0xaa36a7",
//   rpcTarget: "https://rpc.ankr.com/eth_sepolia",
//   displayName: "Ethereum Sepolia Testnet",
//   blockExplorerUrl: "https://sepolia.etherscan.io",
//   ticker: "ETH",
//   tickerName: "Ethereum",
//   logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
// };
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x7a69", // Hardhat local network chainId in hexadecimal
  rpcTarget: "http://localhost:8545", // Local Hardhat network RPC URL
  displayName: "Hardhat Local Network",
  blockExplorerUrl: "", // Local network does not have a block explorer
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "", // Local network typically does not have a logo
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

export function AuthProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [publicAddress, setWalletAddress] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        if (provider != null) return;
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
          sessionTime: 3600,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          chainConfig: { ...chainConfig },
        });
        await web3auth.configureAdapter(metamaskAdapter);
        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: "openlogin",
              loginMethods: {
                email_passwordless: {
                  name: "email_passwordless",
                  showOnModal: true,
                },
                google: {
                  name: "google",
                  showOnModal: true,
                },
              },
            },
          },
        });
        setProvider(web3auth.provider);
        if (web3auth.connected) {
          setLoggedIn(true);
          toast.success("Sup User!🙋‍♂️")
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getAccounts();
      getBalance();
      getUserInfo();
    }

  }, [loggedIn]);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    console.log(user)
    setUserInfo(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    console.log("logged out");
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return "";
    }
    const address = await RPC.getAccounts(provider);
    console.log(address)
    setWalletAddress(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    console.log(balance);
    setAccountBalance(balance);
  };

  // Smart Contract Functions 
  const getUnlockTime = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const unlockTime = await RPC.getUnlockTime(provider);
    console.log(unlockTime);
  }

  const withdrawMoney = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const result = await RPC.withdrawMoney(provider, publicAddress);
    console.log(result);
  }

  return (
    <AuthContext.Provider value={{
      loggedIn,
      login,
      publicAddress,
      userInfo,
      accountBalance,
      getUserInfo,
      logout,
      getAccounts,
      getBalance,
      // -
      getUnlockTime,
      withdrawMoney
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
