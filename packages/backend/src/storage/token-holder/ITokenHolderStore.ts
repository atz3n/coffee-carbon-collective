export type TokenHolderType = "farmer" | "funder";

export type TokenHolder = {
    type: TokenHolderType;
    address: string;
    amount: number;
}

export interface ITokenHolderStore {
    upsert(tokenHolder: TokenHolder): Promise<void>;
    find(params: {address?: string, type?: TokenHolderType}): Promise<TokenHolder[]>;
    delete(params: {address?: string}): Promise<void>;
}