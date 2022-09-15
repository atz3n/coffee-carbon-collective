import { Provider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { initContractListeners } from "./contract";
import { Contracts } from "./contract/Contracts";
import { CarbonCreditToken } from "./contract/interfaces/contracts/token";
import CarbonCreditTokenJSON from "./contract/interfaces/contracts/token/CarbonCreditToken.json";
import { FarmlandRegistry } from "./contract/interfaces/contracts/registry";
import FarmlandRegistryJSON from "./contract/interfaces/contracts/registry/FarmlandRegistry.json";
import { initHttpServer } from "./http";
import { EnvVars, RUN_CONTEXT } from "./lib/EnvVars";
import { RPCProvider } from "./lib/RPCProvider";
import { BlockchainInfoStore } from "./storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "./storage/blockchain/blockchainInfoStoreFactory";
import { TokenHolderStore } from "./storage/token-holder/TokenHolderStore";
import { createTokenHolderStore } from "./storage/token-holder/tokenHolderStoreFactory";
import { FarmlandStore } from "./storage/farmland/FarmlandStore";
import { createFarmlandStore } from "./storage/farmland/farmlandStoreFactory";
import { StorageType } from "./storage/StorageType";
import { ConsoleTransport, initLogger, logger } from "./utils/logger";
import { FarmerStore } from "./storage/farmer/FarmerStore";
import { createFarmerStore } from "./storage/farmer/farmerStoreFactory";


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
    TokenHolderStore.init(createTokenHolderStore(storageType));
    FarmlandStore.init(createFarmlandStore(storageType));
    FarmerStore.init(createFarmerStore(storageType));

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
            carbonCreditToken: <CarbonCreditToken> new Contract(
                EnvVars.CARBON_CREDIT_TOKEN_CONTRACT_ADDRESS,
                CarbonCreditTokenJSON.abi,
                provider
            ),
        });
        logger.info("Reinit contract listeners...");
        await initContractListeners(Contracts.getFarmlandRegistry(), Contracts.getCarbonCreditToken());
        logger.info("Listeners reinitialized");
    });

    logger.info("Init contracts...");
    Contracts.init({
        farmlandRegistry: <FarmlandRegistry> new Contract(
            EnvVars.FARMLAND_REGISTRY_CONTRACT_ADDRESS,
            FarmlandRegistryJSON.abi,
            RPCProvider.provider
        ),
        carbonCreditToken: <CarbonCreditToken> new Contract(
            EnvVars.CARBON_CREDIT_TOKEN_CONTRACT_ADDRESS,
            CarbonCreditTokenJSON.abi,
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
    await initContractListeners(Contracts.getFarmlandRegistry(), Contracts.getCarbonCreditToken());
    logger.info("Listeners initialized");

    logger.info("Done.");
}


main();