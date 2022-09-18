import { Contracts } from "../src/contract/Contracts";
import { BlockchainInfoStore } from "../src/storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "../src/storage/blockchain/blockchainInfoStoreFactory";
import { TokenHolderStore } from "../src/storage/token-holder/TokenHolderStore";
import { createTokenHolderStore } from "../src/storage/token-holder/tokenHolderStoreFactory";
import { FarmlandStore } from "../src/storage/farmland/FarmlandStore";
import { createFarmlandStore } from "../src/storage/farmland/farmlandStoreFactory";
import { StorageType } from "../src/storage/StorageType";
import { DummyTransport, initLogger } from "../src/utils/logger";
import { FarmlandRegistry } from "../src/contract/interfaces/contracts/registry";
import { CarbonCreditToken } from "../src/contract/interfaces/contracts/token";
import { createFarmerStore } from "../src/storage/farmer/farmerStoreFactory";
import { FarmerStore } from "../src/storage/farmer/FarmerStore";


// Default mock nft.storage as a workaround for error:
// "Cannot find module 'carbites/treewalk' from 'node_modules/nft.storage/dist/src/lib.cjs'"
// TODO: check if the error still occurs in a later nft.storage version
jest.mock("nft.storage", () => {
    return {
        NFTStorage: jest.fn().mockImplementation(() => {
            return {};
        }),
        File: jest.fn().mockImplementation(() => {
            return {};
        }),
    };
});

jest.setTimeout(100 * 1000);

initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport()
    ]
});

BlockchainInfoStore.init(createBlockchainInfoStore(StorageType.IN_MEMORY));
TokenHolderStore.init(createTokenHolderStore(StorageType.IN_MEMORY));
FarmlandStore.init(createFarmlandStore(StorageType.IN_MEMORY));
FarmerStore.init(createFarmerStore(StorageType.IN_MEMORY));

Contracts.init({
    carbonCreditToken: <CarbonCreditToken> {},
    farmlandRegistry: <FarmlandRegistry> {}
});

console.log("TODO: Add a lot more tests!!!");