export type Farmland = {
    owner: string;
    tokenId: string;
    description?: string;
    imageData?: string;
    imageName?: string;
    name?: string;
    country?: string;
    produce?: string;
    size?: number;
    altitude?: number;
    kmlData?: string;
    kmlName?: string;
    longitude?: number;
    latitude?: number;
}


export interface FindParams {
    owner?: string;
    tokenId?: string;
}

export interface DeleteParams {
    tokenId: string;
}

export interface IFarmlandStore {
    upsert(farmland: Farmland): Promise<void>;
    find(params: FindParams): Promise<Farmland[]>;
    delete(params: DeleteParams): Promise<void>;
}