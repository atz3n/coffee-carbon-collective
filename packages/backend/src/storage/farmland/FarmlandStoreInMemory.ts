import { AInMemoryStore } from "../AInMemoryStore";
import { Farmland, IFarmlandStore } from "./IFarmlandStore";


export class FarmlandStoreInMemory extends AInMemoryStore implements IFarmlandStore {
    public store: Farmland[] = [];


    public async upsert(farmland: Farmland): Promise<void> {
        this._upsert({ tokenId: farmland.tokenId }, farmland);
    }


    public async find(params: {tokenId?: number}): Promise<Farmland[]> {
        return this._find(params);
    }


    public async delete(params: { tokenId?: number; }): Promise<void> {
        this._delete(params);
    }
}