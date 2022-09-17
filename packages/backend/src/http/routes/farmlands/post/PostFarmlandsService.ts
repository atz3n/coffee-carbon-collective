import { BadRequestError } from "@atz3n/express-utils";
import { FarmlandRegistry } from "../../../../contract/interfaces/contracts/registry";
import { IpfsStorer } from "../../../../lib/IpfsStorer";
import { IFarmerStore } from "../../../../storage/farmer/IFarmerStore";
import { IFarmlandStore } from "../../../../storage/farmland/IFarmlandStore";
import { RouteService } from "../../../routerFactory";


interface Options {
    farmlandStore: IFarmlandStore;
    farmerStore: IFarmerStore;
    farmlandRegistry: FarmlandRegistry;
    ipfsStorer: IpfsStorer;
}


interface Inputs {
    owner: string;
    description: string;
    imageData: string;
    imageName: string;
    name: string;
    country: string;
    produce: string;
    size: number;
    altitude: number;
    kmlData: string;
    kmlName: string;
    longitude: number;
    latitude: number;
}


interface Outputs {
    tokenId: string;
}


export class PostFarmlandsService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<Outputs> {
        const { owner, name, description, imageName, imageData, country, size,
            produce, altitude, kmlData, kmlName, longitude, latitude } = inputs;
        const tokenId = this.constructTokenId(latitude, longitude);

        const farmland = (await this.options.farmlandStore.find({ tokenId }))[0];
        if (farmland) {
            throw new BadRequestError("Farmland already exists");
        }

        const farmer = (await this.options.farmerStore.find({ address: owner }))[0];
        if (!farmer) {
            throw new BadRequestError("farmer does not exist");
        }

        const cid = await this.options.ipfsStorer.store({
            altitude,
            country,
            description,
            imageData,
            imageName,
            kmlData,
            kmlName,
            latitude,
            longitude,
            name,
            produce,
            size
        });

        await this.options.farmlandRegistry.safeMint(owner, tokenId);
        await this.options.farmlandRegistry.setTokenURI(tokenId, cid);

        return { tokenId };
    }

    private constructTokenId(lat: number, long: number): string {
        const latFills = Math.abs(lat) < 10 ? "0" : "";
        const latSig = lat > 0 ? "1" : "2";
        const latString = latSig + latFills + lat.toString().replace("-", "").replace(".", "");

        const longFills = Math.abs(long) < 10 ? "00" : Math.abs(long) < 100 ? "0" : "";
        const longSig = long > 0 ? "1" : "2";
        const longString = longSig + longFills + long.toString().replace("-", "").replace(".", "");

        return latString + longString;
    }
}