import { CarbonCreditCoin } from "./interfaces/CarbonCreditCoin";
import { FarmlandRegistry } from "./interfaces/FarmlandRegistry";


interface InitParams {
    farmlandRegistry: FarmlandRegistry;
    carbonCreditCoins: CarbonCreditCoin;
}


export class Contracts {
    private static farmlandRegistry: FarmlandRegistry;
    private static carbonCreditCoin: CarbonCreditCoin;


    public static init(params: InitParams) {
        this.farmlandRegistry = params.farmlandRegistry;
        this.carbonCreditCoin = params.carbonCreditCoins;
    }


    public static getFarmlandRegistry(): FarmlandRegistry {
        if (!this.farmlandRegistry) {
            throw new Error("FarmlandRegistry not found");
        }
        return this.farmlandRegistry;
    }


    public static getCarbonCreditCoin(): CarbonCreditCoin {
        if (!this.carbonCreditCoin) {
            throw new Error("CarbonCreditCoins not found");
        }
        return this.carbonCreditCoin;
    }
}