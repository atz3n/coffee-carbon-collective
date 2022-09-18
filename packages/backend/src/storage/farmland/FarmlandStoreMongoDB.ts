import { model, Schema } from "mongoose";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, Farmland, FindParams, IFarmlandStore } from "./IFarmlandStore";


export class FarmlandStoreMongoDB extends AMongoDBStore implements IFarmlandStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("Farmland", new Schema<Farmland>({
                tokenId: { type: String, required: true },
                owner: { type: String, required: true },
                description: { type: String, required: false },
                imageData: { type: String, required: false },
                imageName: { type: String, required: false },
                name: { type: String, required: false },
                country: { type: String, required: false },
                produce: { type: String, required: false },
                size: { type: Number, required: false },
                altitude: { type: Number, required: false },
                kmlData: { type: String, required: false },
                kmlName: { type: String, required: false },
                longitude: { type: Number, required: false },
                latitude: { type: Number, required: false }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(farmland: Farmland): Promise<void> {
        await this._upsert({ tokenId: farmland.tokenId }, farmland);
    }


    public async find(params: FindParams): Promise<Farmland[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}