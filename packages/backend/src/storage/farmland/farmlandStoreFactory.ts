import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { FarmlandStoreInMemory } from "./FarmlandStoreInMemory";
import { FarmlandStoreMongoDB } from "./FarmlandStoreMongoDB";
import { IFarmlandStore } from "./IFarmlandStore";


export function createFarmlandStore(type: StorageType): IFarmlandStore {
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

function createInMemoryStore(): IFarmlandStore {
    return new FarmlandStoreInMemory();
}

function createMongoDbStore(): IFarmlandStore {
    return new FarmlandStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}