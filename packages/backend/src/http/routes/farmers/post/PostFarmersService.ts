import { BadRequestError } from "@atz3n/express-utils";
import { IFarmerStore } from "../../../../storage/farmer/IFarmerStore";
import { RouteService } from "../../../routerFactory";


interface PostFarmersServiceOptions {
    farmerStore: IFarmerStore;
}

interface Inputs {
    address: string;
    name: string;
    email: string;
}


export class PostFarmersService implements RouteService {
    constructor(private readonly options: PostFarmersServiceOptions) {}


    public async run(inputs: Inputs): Promise<void> {
        const { address, name, email } = inputs;

        const farmer = (await this.options.farmerStore.find({ email }))[0];
        if (farmer) {
            throw new BadRequestError("Farmer already exists");
        }

        await this.options.farmerStore.upsert({
            address,
            email,
            farmlands: [],
            name
        });
    }
}