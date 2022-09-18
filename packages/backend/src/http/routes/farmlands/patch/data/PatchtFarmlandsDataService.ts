import { BadRequestError } from "@atz3n/express-utils";
import { FarmlandRegistry } from "../../../../../contract/interfaces/contracts/registry";
import { IpfsStorer } from "../../../../../lib/IpfsStorer";
import { IFarmlandStore } from "../../../../../storage/farmland/IFarmlandStore";
import { RouteService } from "../../../../routerFactory";


interface Options {
    farmlandStore: IFarmlandStore;
    ipfsStorer: IpfsStorer;
    farmlandRegistry: FarmlandRegistry;
}


interface Inputs {
    tokenId: string;
    description?: string;
    imageName?: string;
    imageData?: string;
    name?: string;
    country?: string;
    produce?: string;
    kmlName?: string;
    kmlData?: string;
    size?: number;
}


export class PostFarmlandsDataService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const { tokenId, description, imageName, imageData, name, country, produce, kmlName, kmlData, size } = inputs;

        const farmland = (await this.options.farmlandStore.find({ tokenId }))[0];
        if (!farmland) {
            throw new BadRequestError("Farmland does not exist");
        }


        const cid = await this.options.ipfsStorer.store({
            country: country || farmland.country || "",
            description: description || farmland.description || "",
            imageData: imageData || farmland.imageData || "",
            imageName: imageName || farmland.imageName || "",
            kmlData: kmlData || farmland.kmlData || "",
            kmlName: kmlName || farmland.kmlName || "",
            name: name || farmland.name || "",
            produce: produce || farmland.produce || "",
            size: size || farmland.size || 0,
            altitude: farmland.altitude || 0,
            latitude: farmland.latitude || 0,
            longitude: farmland.longitude || 0
        });

        await this.options.farmlandRegistry.setTokenURI(tokenId, cid);
    }
}