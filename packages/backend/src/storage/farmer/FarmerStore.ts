import { IFarmerStore } from "./IFarmerStore";


export class FarmerStore {
    private static store: IFarmerStore;


    public static init(store: IFarmerStore): void {
        this.store = store;
    }


    public static get(): IFarmerStore {
        if (!this.store) {
            throw new Error("Farmer store not initialized! Call init function first");
        }
        return this.store;
    }
}