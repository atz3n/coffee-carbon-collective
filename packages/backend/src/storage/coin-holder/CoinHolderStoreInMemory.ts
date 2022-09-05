import { AInMemoryStore } from "../AInMemoryStore";
import { CoinHolder, CoinHolderType, ICoinHolderStore } from "./ICoinHolderStore";


export class CoinHolderStoreInMemory extends AInMemoryStore implements ICoinHolderStore {
    public store: CoinHolder[] = [];


    public async upsert(coinHolder: CoinHolder): Promise<void> {
        this._upsert({ address: coinHolder.address }, coinHolder);
    }


    public async find(params: {address?: string, type?: CoinHolderType}): Promise<CoinHolder[]> {
        return this._find(params);
    }


    public async delete(params: {address?: string}): Promise<void> {
        this._delete(params);
    }
}