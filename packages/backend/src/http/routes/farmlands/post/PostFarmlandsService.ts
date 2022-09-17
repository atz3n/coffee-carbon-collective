import { BadRequestError } from "@atz3n/express-utils";
import { FarmlandRegistry } from "../../../../contract/interfaces/contracts/registry";
import { IpfsStorer } from "../../../../lib/IpfsStorer";
import { IFarmlandStore } from "../../../../storage/farmland/IFarmlandStore";
import { RouteService } from "../../../routerFactory";


interface Options {
    farmlandStore: IFarmlandStore;
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


export class PostFarmlandService implements RouteService {
    constructor(private readonly options: Options) {}


    public async run(inputs: Inputs): Promise<void> {
        const { owner, name, description, imageName, imageData, country, size,
            produce, altitude, kmlData, kmlName, longitude, latitude } = inputs;
        const tokenId = this.constructTokenId(latitude, longitude);

        const _farmland = (await this.options.farmlandStore.find({ tokenId }))[0];
        if (_farmland) {
            throw new BadRequestError("Farmland already exists");
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