import { model, Schema } from "mongoose";
import { AMongoDBStore } from "../AMongoDBStore";
import { TokenHolder, TokenHolderType, ITokenHolderStore } from "./ITokenHolderStore";


export class TokenHolderStoreMongoDB extends AMongoDBStore implements ITokenHolderStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("TokenHolder", new Schema<TokenHolder>({
                type: { type: String, required: true },
                address: { type: String, required: true },
                amount: { type: Number, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(tokenHolder: TokenHolder): Promise<void> {
        await this._upsert({ address: tokenHolder.address }, tokenHolder);
    }


    public async find(params: {address?: string, type?: TokenHolderType}): Promise<TokenHolder[]> {
        return await this._find(params);
    }


    public async delete(params: {address?: string}): Promise<void> {
        await this._delete(params);
    }
}