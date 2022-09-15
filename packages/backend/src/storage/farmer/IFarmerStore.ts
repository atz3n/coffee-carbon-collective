export type Farmer = {
    address: string;
    farmlands: string[];
    name: string;
    email: string;
}


export interface FindParams {
    email: string;
}

export interface DeleteParams {
    email: string;
}

export interface IFarmerStore {
    upsert(farmer: Farmer): Promise<void>;
    find(params: FindParams): Promise<Farmer[]>;
    delete(params: DeleteParams): Promise<void>;
}