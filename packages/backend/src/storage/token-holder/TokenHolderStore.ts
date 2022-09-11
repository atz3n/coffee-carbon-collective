import { ITokenHolderStore } from "./ITokenHolderStore";


export class TokenHolderStore {
    private static store: ITokenHolderStore;


    public static init(store: ITokenHolderStore): void {
        this.store = store;
    }


    public static get(): ITokenHolderStore {
        if (!this.store) {
            throw new Error("TokenHolder store not initialized! Call init function first");
        }
        return this.store;
    }
}