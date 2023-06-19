import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import {CustomChain} from "@nomiclabs/hardhat-etherscan/src/types";

// require("@nomiclabs/hardhat-waffle")
// require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy");
// require("solidity-coverage")
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("./tasks");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    polygon_mumbai: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [PRIVATE_KEY!],
      chainId: 80001,
    },
    polygon_mainnet: {
      url: "https://polygon.llamarpc.com",
      accounts: [PRIVATE_KEY!],
      chainId: 137,
    }
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: "PMIQTVRYJXJPQFE4HQSS7G7ZABWDB4H2D9",
      customChains: [
        {
            network: "polygon_mainnet",
            chainId: 137,
            urls: {
                apiURL: "https://api.polygonscan.com/api",
                browserURL: "https://polygonscan.com/"
            }
        },
        {
          network: "polygon_testnet",
          chainId:  80001,
          urls: {
            apiURL: "https://api-testnet.polygonscan.com/api",
            browserURL: "https://mumbai.polygonscan.com/"
          }
        }
        ]
    },
  solidity: {
    compilers: [
      {
        version: "0.8.19",
      },
      {
        version: "0.8.7",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};

export default config;
