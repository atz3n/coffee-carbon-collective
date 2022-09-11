import { AInMemoryStore } from "../AInMemoryStore";
import { TokenHolder, TokenHolderType, ITokenHolderStore } from "./ITokenHolderStore";


export class TokenHolderStoreInMemory extends AInMemoryStore implements ITokenHolderStore {
    public store: TokenHolder[] = [];


    public async upsert(tokenHolder: TokenHolder): Promise<void> {
        this._upsert({ address: tokenHolder.address }, tokenHolder);
    }


    public async find(params: {address?: string, type?: TokenHolderType}): Promise<TokenHolder[]> {
        return this._find(params);
    }


    public async delete(params: {address?: string}): Promise<void> {
        this._delete(params);
    }
}