import axios, { AxiosResponse } from "axios";


interface Options {
    gatewayUrls: string[];
    tries: number;
    tryDelayInSec: number;
}

interface Properties {
    country: string;
    produce: string;
    altitude: number;
    size: number;
    longitude: number;
    latitude: number;
    kml: string
}

export interface MetaData {
    name: string;
    description: string;
    image: string;
    properties: Properties;
}

export interface FullData {
    name: string;
    description: string;
    imageData: string;
    imageName: string;
    kmlName: string;
    kmlData: string;
    country: string;
    produce: string;
    altitude: number;
    size: number;
    longitude: number;
    latitude: number;
}


export class IpfsRetriever {
    constructor(private readonly options: Options) {}


    public async retrieve(cid: string): Promise<FullData> {
        const metaCid = this.cleanCid(cid);
        const metaData = await this.retrieveMetaData(metaCid);

        const imageCid = this.cleanCid(metaData.image);
        const imageData = await this.retrieveFile(imageCid);
        const imageName = await this.retrieveFileName(imageCid);

        const kmlCid = this.cleanCid(metaData.properties.kml);
        const kmlData = await this.retrieveFile(kmlCid);
        const kmlName = await this.retrieveFileName(kmlCid);

        const fullData = <FullData> {
            altitude: metaData.properties.altitude,
            country: metaData.properties.country,
            description: metaData.description,
            imageData,
            imageName,
            kmlData,
            kmlName,
            latitude: metaData.properties.latitude,
            longitude: metaData.properties.longitude,
            name: metaData.name,
            produce: metaData.properties.produce,
            size: metaData.properties.size
        };

        return fullData;
    }

    private cleanCid(cid: string): string {
        return cid.startsWith("ipfs://") ? cid.substring(7) : cid;
    }

    private async retrieveMetaData(cid: string): Promise<MetaData> {
        let metaData: MetaData;
        try {
            const metaResponse = await this.tryOften<AxiosResponse<MetaData>>((tryCounter) => {
                return axios.get(`${this.getGatewayUrl(tryCounter)}/${cid}`);
            });
            metaData = metaResponse.data;
        } catch (error) {
            throw new Error("Unable to fetch meta data");
        }
        this.checkMetaData(metaData);
        return metaData;
    }

    private async tryOften<T>(cb: (tryCounter: number) => Promise<T>): Promise<T> {
        for (let i = 1 ; i <= this.options.tries ; i++) {
            try {
                return await cb(i);
            } catch (error) {
                if (i >= this.options.tries) {
                    throw error;
                } else {
                    await this.sleep(this.options.tryDelayInSec);
                }
            }
        }
        return <T> {};
    }

    private async sleep(timeInSec: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, timeInSec * 1000));
    }

    private getGatewayUrl(counter: number): string {
        const gatewayIndex = (counter - 1) % this.options.gatewayUrls.length;
        return this.options.gatewayUrls[gatewayIndex];
    }

    private checkMetaData(metaData: MetaData): void {
        if ( !metaData.description || !metaData.image || !metaData.name) {
            throw new Error("Mailformed meta data");
        }
    }

    private async retrieveFile(cid: string): Promise<string> {
        let file: string;
        try {
            const fileResponse = await this.tryOften<AxiosResponse<string>>((tryCounter) => {
                return axios.get(`${this.getGatewayUrl(tryCounter)}/${cid}`, {
                    responseType: "arraybuffer"
                });
            });
            file = Buffer.from(fileResponse.data, "binary").toString("base64");
        } catch (error) {
            throw new Error("Unable to fetch image");
        }
        return file;
    }

    private async retrieveFileName(cid: string): Promise<string> {
        return cid.split("/").pop() || "";
    }
}