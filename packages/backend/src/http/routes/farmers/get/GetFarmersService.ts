import { Farmer, IFarmerStore } from "../../../../storage/farmer/IFarmerStore";
import { RouteService } from "../../../routerFactory";


interface Options {
    farmerStore: IFarmerStore;
}

interface Inputs {
    email: string;
}

interface Outputs {
    farmers: Farmer[];
}


export class GetFarmersService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const { email } = inputs;
        const farmers = await this.options.farmerStore.find({ email });
        return { farmers };
    }
}