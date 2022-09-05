import { Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { initContractListeners } from "./contract";
import { Contracts } from "./contract/Contracts";
import { CarbonCreditCoin } from "./contract/interfaces/CarbonCreditCoin";
import CarbonCreditCoinJSON from "./contract/interfaces/CarbonCreditCoin.json";
import { FarmlandRegistry } from "./contract/interfaces/FarmlandRegistry";
import FarmlandRegistryJSON from "./contract/interfaces/FarmlandRegistry.json";
import { initHttpServer } from "./http";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { RPCProvider } from "./lib/RPCProvider";
import { BlockchainInfoStore } from "./storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "./storage/blockchain/blockchainInfoStoreFactory";
import { CoinHolderStore } from "./storage/coin-holder/CoinHolderStore";
import { createCoinHolderStore } from "./storage/coin-holder/coinHolderStoreFactory";
import { FarmlandStore } from "./storage/farmland/FarmlandStore";
import { createFarmlandStore } from "./storage/farmland/farmlandStoreFactory";
import { StorageType } from "./storage/StorageType";
import { ConsoleTransport, initLogger, logger } from "./utils/logger";


async function main(): Promise<void> {
    initLogger({
        level: EnvVars.RUN_CONTEXT === RUN_CONTEXT.DEVELOPMENT ? "all" : "http",
        transports: [
            new ConsoleTransport()
        ]
    });

    logger.info("Init databases...");
    const storageType = EnvVars.MONGO_DB_URL ? StorageType.MONGO_DB : StorageType.IN_MEMORY;
    BlockchainInfoStore.init(createBlockchainInfoStore(storageType));
    CoinHolderStore.init(createCoinHolderStore(storageType));
    FarmlandStore.init(createFarmlandStore(storageType));

    logger.info("Init RPC provider...");
    RPCProvider.setWSConfig({
        connectionCheckIntervalSec: EnvVars.WS_RPC_CONNECTION_CHECK_INTERVAL_SEC,
        connectionCheckTimeoutSec: EnvVars.WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC,
        keepAliveIntervalSec: EnvVars.WS_RPC_KEEP_ALIVE_INTERVAL_SEC,
        reconnectDelaySec: EnvVars.WS_RPC_RECONNECT_DELAY_SEC
    });
    RPCProvider.init(EnvVars.RPC_URL, async (provider: Provider) => {
        logger.info("Reinit contracts...");
        Contracts.init({
            farmlandRegistry: <FarmlandRegistry> new Contract(
                EnvVars.FARMLAND_REGISTRY_CONTRACT_ADDRESS,
                FarmlandRegistryJSON.abi,
                provider
            ),
            carbonCreditCoins: <CarbonCreditCoin> new Contract(
                EnvVars.CARBON_CREDIT_COIN_CONTRACT_ADDRESS,
                CarbonCreditCoinJSON.abi,
                provider
            ),
        });
        logger.info("Reinit contract listeners...");
        await initContractListeners(Contracts.getFarmlandRegistry(), Contracts.getCarbonCreditCoin());
        logger.info("Listeners reinitialized");
    });

    logger.info("Init contracts...");
    Contracts.init({
        farmlandRegistry: <FarmlandRegistry> new Contract(
            EnvVars.FARMLAND_REGISTRY_CONTRACT_ADDRESS,
            FarmlandRegistryJSON.abi,
            RPCProvider.provider
        ),
        carbonCreditCoins: <CarbonCreditCoin> new Contract(
            EnvVars.CARBON_CREDIT_COIN_CONTRACT_ADDRESS,
            CarbonCreditCoinJSON.abi,
            RPCProvider.provider
        ),
    });

    logger.info("Init http server...");
    const server = initHttpServer();

    logger.info("Start server...");
    server.listen(EnvVars.PORT, () => {
        logger.info(`Listening on port ${EnvVars.PORT}...`);
    });

    logger.info("Init contract listeners...");
    await initContractListeners(Contracts.getFarmlandRegistry(), Contracts.getCarbonCreditCoin());
    logger.info("Listeners initialized");

    logger.info("Done.");
}


main();