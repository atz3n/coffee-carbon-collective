import { AInMemoryStore } from "../AInMemoryStore";
import { DeleteParams, Farmer, FindParams, IFarmerStore } from "./IFarmerStore";


export class FarmerStoreInMemory extends AInMemoryStore implements IFarmerStore {
    public store: Farmer[] = [];


    public async upsert(farmer: Farmer): Promise<void> {
        this._upsert({ email: farmer.email }, farmer);
    }


    public async find(params: FindParams): Promise<Farmer[]> {
        return this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        this._delete(params);
    }
}