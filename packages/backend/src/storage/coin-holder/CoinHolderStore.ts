import { ICoinHolderStore } from "./ICoinHolderStore";


export class CoinHolderStore {
    private static store: ICoinHolderStore;


    public static init(store: ICoinHolderStore): void {
        this.store = store;
    }


    public static get(): ICoinHolderStore {
        if (!this.store) {
            throw new Error("CoinHolder store not initialized! Call init function first");
        }
        return this.store;
    }
}