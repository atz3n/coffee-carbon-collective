import { EnvVars } from "../../lib/EnvVars";
import { StorageType } from "../StorageType";
import { FarmerStoreInMemory } from "./FarmerStoreInMemory";
import { FarmerStoreMongoDB } from "./FarmerStoreMongoDB";
import { IFarmerStore } from "./IFarmerStore";


export function createFarmerStore(type: StorageType): IFarmerStore {
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

function createInMemoryStore(): IFarmerStore {
    return new FarmerStoreInMemory();
}

function createMongoDbStore(): IFarmerStore {
    return new FarmerStoreMongoDB({ mongoUrl: EnvVars.MONGO_DB_URL });
}