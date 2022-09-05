import { model, Schema } from "mongoose";
import { AMongoDBStore } from "../AMongoDBStore";
import { CoinHolder, CoinHolderType, ICoinHolderStore } from "./ICoinHolderStore";


export class CoinHolderStoreMongoDB extends AMongoDBStore implements ICoinHolderStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("CoinHolder", new Schema<CoinHolder>({
                type: { type: String, required: true },
                address: { type: String, required: true },
                amount: { type: Number, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(coinHolder: CoinHolder): Promise<void> {
        await this._upsert({ address: coinHolder.address }, coinHolder);
    }


    public async find(params: {address?: string, type?: CoinHolderType}): Promise<CoinHolder[]> {
        return await this._find(params);
    }


    public async delete(params: {address?: string}): Promise<void> {
        await this._delete(params);
    }
}