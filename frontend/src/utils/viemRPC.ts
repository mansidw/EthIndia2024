import {
  createWalletClient,
  createPublicClient,
  custom,
  formatEther,
  parseEther,
  Address,
} from "viem";
import { mainnet, polygonAmoy, sepolia, hardhat,polygonZkEvmCardona  } from "viem/chains";
import type { IProvider } from "@web3auth/base";
import { abi, contractAddresses } from "../contract_ref";

const getViewChain = (provider: IProvider) => {

  console.log("joyjoyjoy")
  console.log(provider.chainId);

  switch (provider.chainId) {
    case "1":
      return mainnet;
    case "0x13882":
      return polygonAmoy;
    case "0xaa36a7":
      return sepolia;
    case "0x7a69":
      return hardhat;
    case "0x98a":
      return polygonZkEvmCardona;
    default:
      return mainnet;
  }
};

const getChainId = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    const chainId = await walletClient.getChainId();
    return chainId.toString();
  } catch (error) {
    return error;
  }
};
const getAccounts = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    return address;
  } catch (error) {
    return error;
  }
};

const getBalance = async (provider: IProvider): Promise<string> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const address = await walletClient.getAddresses();

    const balance = await publicClient.getBalance({ address: address[0] });
    console.log(balance);
    return formatEther(balance);
  } catch (error) {
    return error as string;
  }
};

const sendTransaction = async (provider: IProvider): Promise<any> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    // data for the transaction
    const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
    const amount = parseEther("0.0001");
    const address = await walletClient.getAddresses();

    // Submit transaction to the blockchain
    const hash = await walletClient.sendTransaction({
      account: address[0],
      to: destination,
      value: amount,
    });
    console.log(hash);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return JSON.stringify(
      receipt,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  } catch (error) {
    return error;
  }
};

const signMessage = async (provider: IProvider): Promise<any> => {
  try {
    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    // data for signing
    const address = await walletClient.getAddresses();
    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const hash = await walletClient.signMessage({
      account: address[0],
      message: originalMessage,
    });

    console.log(hash);

    return hash.toString();
  } catch (error) {
    return error;
  }
};

// ** Smart Contract Functions **
const getUnlockTime = async (provider: IProvider) => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });
    const chainId = await getChainId(provider);
    let unlockTime = await publicClient.readContract({
      abi: abi,
      // @ts-ignore
      address: `${contractAddresses[chainId]}`,
      functionName: "unlockTime",
    });

    return unlockTime;
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return "error";
  }
};

const withdrawMoney = async (provider: IProvider, publicAddress: string) => {
  try {
    const privateKey = await provider.request({
      method: "eth_private_key",
    });

    console.log("private key", privateKey);
  } catch (error) {
    console.log("error, probably you are using metamask/external wallet");
  }
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
      // @ts-ignore
      account: `${publicAddress}`,
    });
    console.log(publicAddress);
    const chainId = await getChainId(provider);
    console.log(1);
    console.log(chainId);
    // @ts-ignore
    console.log(contractAddresses[chainId]);
    let hash = await walletClient.writeContract({
      abi: abi,
      // @ts-ignore
      address: `${contractAddresses[chainId]}`,
      functionName: "withdraw",
    });
    await publicClient.waitForTransactionReceipt({ hash });
    return "success";
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return "error";
  }
};

const addData = async (
  provider: IProvider,
  url: string,
  urlhash: string,
  data: string,
  publicAddress: string[]
) => {
  try {
    console.log("all public addresses - ", publicAddress);
    const publicClient = await createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = await createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
      // @ts-ignore
      account: `${publicAddress[0]}`,
    });
    console.log(publicAddress[0]);
    const chainId = await getChainId(provider);
    console.log(chainId);
    // @ts-ignore
    console.log(contractAddresses[chainId]);
    let hash = await walletClient.writeContract({
      abi: abi,
      // @ts-ignore
      address: `${contractAddresses[chainId]}`,
      functionName: "addData",
      args: [url, data, urlhash],
    });
    await publicClient.waitForTransactionReceipt({ hash });
    return "success";
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return "error";
  }
};

const getAllArticles = async (provider: IProvider) => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });
    const chainId = await getChainId(provider);
    let articles = await publicClient.readContract({
      abi: abi,
      // @ts-ignore
      address: `${contractAddresses[chainId]}`,
      functionName: "getAllArticles",
    });

    return articles;
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return "error";
  }
};

const addUserVote = async (
  provider: IProvider,
  urlhash: string,
  vote: Number,
  stakeamt: Number,
  publicAddress: string[]
) => {
  try {
    console.log("all public addresses - ", publicAddress);
    const publicClient = await createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = await createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
      // @ts-ignore
      account: `${publicAddress[0]}`,
    });
    console.log(publicAddress[0]);
    const chainId = await getChainId(provider);
    console.log(chainId);
    // @ts-ignore
    console.log(contractAddresses[chainId]);
    let hash = await walletClient.writeContract({
      abi: abi,
      // @ts-ignore
      address: `${contractAddresses[chainId]}`,
      functionName: "addUserVote",
      args: [urlhash, vote, stakeamt],
    });
    await publicClient.waitForTransactionReceipt({ hash });
    return "success";
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return "error";
  }
};

const getAllVotes = async (provider: IProvider) => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });
    const chainId = await getChainId(provider);
    let voteDetails = await publicClient.readContract({
      abi: abi,
      // @ts-ignore
      address: `${contractAddresses[chainId]}`,
      functionName: "getAllVotes",
    });

    return voteDetails;
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return "error";
  }
};

export default {
  getChainId,
  getAccounts,
  getBalance,
  sendTransaction,
  signMessage,
  getUnlockTime,
  withdrawMoney,
  addData,
  getAllArticles,
  addUserVote,
  getAllVotes
};
