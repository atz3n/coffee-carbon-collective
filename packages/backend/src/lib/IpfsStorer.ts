import { File, NFTStorage } from "nft.storage";


interface Options {
    authToken: string;
}

interface StoreParams {
    name: string;
    imageName: string;
    imageData: string;
    description: string;
    country: string;
    size: number;
    produce: string;
    altitude: number;
    kmlData: string;
    kmlName: string;
    longitude: number;
    latitude: number;
}


export class IpfsStorer {
    private readonly client: NFTStorage;


    constructor(options: Options) {
        this.client = new NFTStorage({ token: options.authToken || "" });
    }


    public async store(params: StoreParams): Promise<string> {
        const { name, description, imageName, imageData, country, size,
            produce, altitude, kmlData, kmlName, longitude, latitude } = params;

        const imageFile = this.createFile(imageName, imageData, "image");
        const kmlFile = this.createFile(kmlName, kmlData, "application");

        const metadata = await this.client.store({
            name,
            description,
            image: imageFile,
            properties: {
                country,
                kml: kmlFile,
                produce,
                altitude,
                size,
                longitude,
                latitude
            }
        });

        return metadata.url;
    }

    private createFile(name: string, data: string, type: string): File {
        const buffer = Buffer.from(data, "base64");
        const subtype = name.split(".").slice(-1)[0];
        const file = new File(
            [ buffer ],
            name,
            { type: `${type}/${subtype}` }
        );
        return file;
    }
}