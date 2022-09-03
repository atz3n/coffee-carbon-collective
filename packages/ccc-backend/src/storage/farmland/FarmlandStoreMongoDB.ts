import { model, Schema } from "mongoose";
import { AMongoDBStore } from "../AMongoDBStore";
import { Farmland, IFarmlandStore } from "./IFarmlandStore";


export class FarmlandStoreMongoDB extends AMongoDBStore implements IFarmlandStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("Farmland", new Schema<Farmland>({
                tokenId: { type: Number, required: true },
                owner: { type: String, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(farmland: Farmland): Promise<void> {
        await this._upsert({ tokenId: farmland.tokenId }, farmland);
    }


    public async find(params: {tokenId?: number}): Promise<Farmland[]> {
        return await this._find(params);
    }


    public async delete(params: {tokenId?: number}): Promise<void> {
        await this._delete(params);
    }
}