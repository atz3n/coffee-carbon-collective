export type BlockchainInfo = {
    blockHeight: number;
    id?: string;
}

export interface IBlockchainInfoStore {
    upsert(blockchainInfo: BlockchainInfo): Promise<void>;
    get(): Promise<BlockchainInfo | undefined>;
}