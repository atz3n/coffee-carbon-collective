import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-contract-sizer";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/types";
import "solidity-coverage";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        hardhat: {
            initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
        },
        evm: {
            url: process.env.RPC_URL || "",
            accounts: process.env.DEPLOYER_SECRET !== undefined ? [process.env.DEPLOYER_SECRET] : [],
        },
        alfajores: {
            url: process.env.CELO_RPC_URL,
            accounts: {
                mnemonic: process.env.MNEMONIC,
                path: "m/44'/52752'/0'/0",
            },
            chainId: 44787,
        },
    },
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
    contractSizer: {
        runOnCompile: true,
    },
};

export default config;
