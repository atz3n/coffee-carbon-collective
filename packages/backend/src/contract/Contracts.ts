import { FarmlandRegistry } from "./interfaces/contracts/registry";
import { CarbonCreditToken } from "./interfaces/contracts/token";


interface InitParams {
    farmlandRegistry: FarmlandRegistry;
    carbonCreditToken: CarbonCreditToken;
}


export class Contracts {
    private static farmlandRegistry: FarmlandRegistry;
    private static carbonCreditToken: CarbonCreditToken;


    public static init(params: InitParams) {
        this.farmlandRegistry = params.farmlandRegistry;
        this.carbonCreditToken = params.carbonCreditToken;
    }


    public static getFarmlandRegistry(): FarmlandRegistry {
        if (!this.farmlandRegistry) {
            throw new Error("FarmlandRegistry not found");
        }
        return this.farmlandRegistry;
    }


    public static getCarbonCreditToken(): CarbonCreditToken {
        if (!this.carbonCreditToken) {
            throw new Error("CarbonCreditToken not found");
        }
        return this.carbonCreditToken;
    }
}