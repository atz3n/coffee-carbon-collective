import { model, Schema } from "mongoose";
import { AMongoDBStore } from "../AMongoDBStore";
import { DeleteParams, Farmer, FindParams, IFarmerStore } from "./IFarmerStore";


export class FarmerStoreMongoDB extends AMongoDBStore implements IFarmerStore {
    constructor(options: { mongoUrl: string }) {
        super({
            model: model("Farmer", new Schema<Farmer>({
                address: { type: String, required: true },
                farmlands: { type: [String], required: true },
                name: { type: String, required: true },
                email: { type: String, required: true }
            })),
            url: options.mongoUrl
        });
    }


    public async upsert(farmland: Farmer): Promise<void> {
        await this._upsert({ email: farmland.email }, farmland);
    }


    public async find(params: FindParams): Promise<Farmer[]> {
        return await this._find(params);
    }


    public async delete(params: DeleteParams): Promise<void> {
        await this._delete(params);
    }
}