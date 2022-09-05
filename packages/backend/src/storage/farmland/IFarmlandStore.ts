export type Farmland = {
    owner: string;
    tokenId: number;
}

export interface IFarmlandStore {
    upsert(farmland: Farmland): Promise<void>;
    find(params: {tokenId?: number}): Promise<Farmland[]>;
    delete(params: {tokenId?: number}): Promise<void>;
}