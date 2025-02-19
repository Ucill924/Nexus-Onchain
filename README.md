# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

How to run 

Set privatekey in hardhat.config.js

for increament :

```shell
npx hardhat run scripts/increment.js --network nexus
```
for Deploy and Verify :

```shell
npx hardhat run scripts/deployAndVerify.js --network nexus

```
