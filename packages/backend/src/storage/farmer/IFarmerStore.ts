export type Farmer = {
    address: string;
    farmlands: string[];
    name: string;
    email: string;
    uid: string;
}


export interface FindParams {
    email?: string;
    uid?: string;
}

export interface DeleteParams {
    uid: string;
}

export interface IFarmerStore {
    upsert(farmer: Farmer): Promise<void>;
    find(params: FindParams): Promise<Farmer[]>;
    delete(params: DeleteParams): Promise<void>;
}