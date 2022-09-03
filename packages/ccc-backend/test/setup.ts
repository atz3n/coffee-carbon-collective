import { Contracts } from "../src/contract/Contracts";
import { CarbonCreditCoin } from "../src/contract/interfaces/CarbonCreditCoin";
import { FarmlandRegistry } from "../src/contract/interfaces/FarmlandRegistry";
import { BlockchainInfoStore } from "../src/storage/blockchain/BlockchainInfoStore";
import { createBlockchainInfoStore } from "../src/storage/blockchain/blockchainInfoStoreFactory";
import { CoinHolderStore } from "../src/storage/coin-holder/CoinHolderStore";
import { createCoinHolderStore } from "../src/storage/coin-holder/coinHolderStoreFactory";
import { FarmlandStore } from "../src/storage/farmland/FarmlandStore";
import { createFarmlandStore } from "../src/storage/farmland/farmlandStoreFactory";
import { StorageType } from "../src/storage/StorageType";
import { DummyTransport, initLogger } from "../src/utils/logger";


jest.setTimeout(100 * 1000);

initLogger({
    level: "all",
    transports: [
        new DummyTransport(),
        // new ConsoleTransport()
    ]
});

BlockchainInfoStore.init(createBlockchainInfoStore(StorageType.IN_MEMORY));
CoinHolderStore.init(createCoinHolderStore(StorageType.IN_MEMORY));
FarmlandStore.init(createFarmlandStore(StorageType.IN_MEMORY));

Contracts.init({
    carbonCreditCoins: <CarbonCreditCoin> {},
    farmlandRegistry: <FarmlandRegistry> {}
});