import { BadRequestError } from "@atz3n/express-utils";
import { IFarmerStore } from "../../../../storage/farmer/IFarmerStore";
import { RouteService } from "../../../routerFactory";


interface Options {
    farmerStore: IFarmerStore;
}

interface Inputs {
    name?: string;
    email?: string;
    uid: string;
}


export class PatchFarmersService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const { name, email, uid } = inputs;

        const farmer = (await this.options.farmerStore.find({ uid }))[0];
        if (!farmer) {
            throw new BadRequestError("Farmer does not exist");
        }

        farmer.email = email || farmer.email;
        farmer.name = name || farmer.name;
        await this.options.farmerStore.upsert(farmer);
    }
}