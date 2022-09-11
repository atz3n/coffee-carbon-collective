import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { TokenHolderStoreInMemory } from "./TokenHolderStoreInMemory";
import { TokenHolderStoreMongoDB } from "./TokenHolderStoreMongoDB";
import { ITokenHolderStore } from "./ITokenHolderStore";


export function createTokenHolderStore(type: StorageType): ITokenHolderStore {
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

function createInMemoryStore(): ITokenHolderStore {
    return new TokenHolderStoreInMemory();
}

function createMongoDbStore(): ITokenHolderStore {
    return new TokenHolderStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}