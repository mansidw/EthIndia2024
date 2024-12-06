# Hardhat

Try running some of the following tasks:

```shell
npx hardhat help
REPORT_GAS=true npx hardhat test

# Compile Contracts
npx hardhat compile

# Start local blockchain test network
npx hardhat node

# Option 1 - Deploy contracts on hardhat ignition
npx hardhat ignition deploy ./ignition/modules/Lock.js

# Option 2 - Deploy contracts on any preferred network
npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost

# Option 3 - Save contract address and ABI into frontend json file
npx hardhat run scripts/deploy.js --network localhost
```
