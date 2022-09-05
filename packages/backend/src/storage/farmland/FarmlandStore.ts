import { IFarmlandStore } from "./IFarmlandStore";


export class FarmlandStore {
    private static store: IFarmlandStore;


    public static init(store: IFarmlandStore): void {
        this.store = store;
    }


    public static get(): IFarmlandStore {
        if (!this.store) {
            throw new Error("Farmland store not initialized! Call init function first");
        }
        return this.store;
    }
}