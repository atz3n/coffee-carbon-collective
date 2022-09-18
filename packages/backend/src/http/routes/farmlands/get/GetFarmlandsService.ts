import { Farmland, IFarmlandStore } from "../../../../storage/farmland/IFarmlandStore";
import { RouteService } from "../../../routerFactory";


interface Options {
    farmlandStore: IFarmlandStore;
}

interface Inputs {
    owner: string;
    tokenId: string;
}

interface Outputs {
    farmlands: Farmland[];
}


export class GetFarmlandsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const farmlands = await this.options.farmlandStore.find(inputs);
        return { farmlands };
    }
}