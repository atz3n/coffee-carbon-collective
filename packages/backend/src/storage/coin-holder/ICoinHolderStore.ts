export type CoinHolderType = "farmer" | "funder";

export type CoinHolder = {
    type: CoinHolderType;
    address: string;
    amount: number;
}

export interface ICoinHolderStore {
    upsert(coinHolder: CoinHolder): Promise<void>;
    find(params: {address?: string, type?: CoinHolderType}): Promise<CoinHolder[]>;
    delete(params: {address?: string}): Promise<void>;
}