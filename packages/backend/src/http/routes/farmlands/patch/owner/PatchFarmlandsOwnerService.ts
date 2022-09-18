import { BadRequestError } from "@atz3n/express-utils";
import { FarmlandRegistry } from "../../../../../contract/interfaces/contracts/registry";
import { IFarmerStore } from "../../../../../storage/farmer/IFarmerStore";
import { IFarmlandStore } from "../../../../../storage/farmland/IFarmlandStore";
import { RouteService } from "../../../../routerFactory";


interface Options {
    farmlandStore: IFarmlandStore;
    farmerStore: IFarmerStore;
    farmlandRegistry: FarmlandRegistry;
}


interface Inputs {
    owner: string;
    tokenId: string;
}


export class PatchFarmlandsOwnerService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const { owner, tokenId } = inputs;

        const farmland = (await this.options.farmlandStore.find({ tokenId }))[0];
        if (!farmland) {
            throw new BadRequestError("Farmland does not exist");
        }

        const farmer = (await this.options.farmerStore.find({ address: owner }))[0];
        if (!farmer) {
            throw new BadRequestError("Farmer does not exist");
        }

        await this.options.farmlandRegistry.transferFrom(farmland.owner, owner, tokenId);
    }
}