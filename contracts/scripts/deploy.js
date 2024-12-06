const { ethers, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

const CONTRACT_ADD_FILE =
  "../frontend/src/contract_ref/deployed-contracts.json";

const CONTRACT_ABI_FILE = "../frontend/src/contract_ref/abi.json";

async function main() {
  // Initialize an empty object to store deployed contract addresses
  let chainId = network?.config?.chainId;
  let deployedContracts = {};

  // Check if the 'deployed-contracts.json' file exists
  if (fs.existsSync(CONTRACT_ADD_FILE)) {
    // If the file exists, read its contents and parse the JSON data
    const data = fs.readFileSync(CONTRACT_ADD_FILE, "utf8");
    deployedContracts = JSON.parse(data);
  }

  // Deploy the 'Lock' contract with a specified unlock time
  const unlockTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  const lockContractFactory = await ethers.getContractFactory("Lock");
  const lockContract = await lockContractFactory.deploy(unlockTime);

  // Print the address of the deployed 'Lock' contract
  const lockAddress = await lockContract.getAddress();
  console.log("Lock contract has been deployed at", lockAddress);

  // Update the deployed contracts object with the 'Lock' contract address
  deployedContracts[chainId] = lockAddress;

  const dir = path.dirname(CONTRACT_ADD_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Write the updated 'deployedContracts' object to 'deployed-contracts.json' file
  fs.writeFileSync(
    CONTRACT_ADD_FILE,
    JSON.stringify(deployedContracts, null, 2)
  );
  console.log("Lock contract address has been saved.");

  //   updating the Abi file
  fs.writeFileSync(CONTRACT_ABI_FILE, lockContract.interface.formatJson());
  console.log("ABI file updated");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
