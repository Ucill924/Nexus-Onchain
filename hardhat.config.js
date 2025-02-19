require("@nomicfoundation/hardhat-toolbox");

module.exports = {
    solidity: "0.8.28",
    networks: {
        nexus: {
            url: "https://rpc.nexus.xyz/http",
            chainId: 392,
            accounts: ["Your_private_key"]
        }
    },
    etherscan: {
      apiKey: {
        'nexus': 'empty'
      },
      customChains: [
        {
          network: "nexus",
          chainId: 392,
          urls: {
            apiURL: "https://explorer.nexus.xyz/api",
            browserURL: "https://explorer.nexus.xyz"
          }
        }
      ]
    }
  };