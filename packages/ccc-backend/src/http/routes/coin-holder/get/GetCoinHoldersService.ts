
import { CoinHolder, ICoinHolderStore } from "../../../../storage/coin-holder/ICoinHolderStore";
import { RouteService } from "../../../routerFactory";


interface GetCoinHoldersServiceOptions {
    coinHolderStore: ICoinHolderStore;
}

interface Inputs {
    type?: "funder" | "farmer";
    address?: string;
}

interface Outputs {
    coinHolders: CoinHolder[];
}


export class GetCoinHoldersService implements RouteService {
    private readonly coinHolderStore: ICoinHolderStore;


    constructor(options: GetCoinHoldersServiceOptions) {
        this.coinHolderStore = options.coinHolderStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const coinHolders = await this.coinHolderStore.find(inputs);
        return { coinHolders };
    }
}