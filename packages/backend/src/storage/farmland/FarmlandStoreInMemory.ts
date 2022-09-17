import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, Farmland, FindParams, IFarmlandStore } from "./IFarmlandStore";


export class FarmlandStoreInMemory extends AInMemoryStore implements IFarmlandStore {
    public store: Farmland[] = [];


    public async upsert(farmland: Farmland): Promise<void> {
        this._upsert({ tokenId: farmland.tokenId }, farmland);
    }


    public async find(params: FindParams): Promise<Farmland[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}