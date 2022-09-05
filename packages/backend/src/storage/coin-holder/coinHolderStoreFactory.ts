import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { CoinHolderStoreInMemory } from "./CoinHolderStoreInMemory";
import { CoinHolderStoreMongoDB } from "./CoinHolderStoreMongoDB";
import { ICoinHolderStore } from "./ICoinHolderStore";


export function createCoinHolderStore(type: StorageType): ICoinHolderStore {
    switch (type) {
        case StorageType.IN_MEMORY: {
            return createInMemoryStore();
        }
        case StorageType.MONGO_DB: {
            return createMongoDbStore();
        }
        default: {
            return createInMemoryStore();
        }
    }
}

function createInMemoryStore(): ICoinHolderStore {
    return new CoinHolderStoreInMemory();
}

function createMongoDbStore(): ICoinHolderStore {
    return new CoinHolderStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}