import { BadRequestError } from "@atz3n/express-utils";
import { randomUUID } from "crypto";
import { IFarmerStore } from "../../../../storage/farmer/IFarmerStore";
import { RouteService } from "../../../routerFactory";


interface Options {
    farmerStore: IFarmerStore;
}

interface Inputs {
    address: string;
    name: string;
    email: string;
}

interface Outputs {
    uid: string;
}


export class PostFarmersService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const { address, name, email } = inputs;

        const farmer = (await this.options.farmerStore.find({ email }))[0];
        if (farmer) {
            throw new BadRequestError("Email already used");
        }

        const uid = randomUUID();
        await this.options.farmerStore.upsert({
            address,
            email,
            farmlands: [],
            name,
            uid
        });

        return { uid };
    }
}