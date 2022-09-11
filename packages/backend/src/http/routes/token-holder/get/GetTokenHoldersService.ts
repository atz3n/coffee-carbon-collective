
import { TokenHolder, ITokenHolderStore } from "../../../../storage/token-holder/ITokenHolderStore";
import { RouteService } from "../../../routerFactory";


interface GetTokenHoldersServiceOptions {
    tokenHolderStore: ITokenHolderStore;
}

interface Inputs {
    type?: "funder" | "farmer";
    address?: string;
}

interface Outputs {
    coinHolders: TokenHolder[];
}


export class GetTokenHoldersService implements RouteService {
    private readonly tokenHolderStore: ITokenHolderStore;


    constructor(options: GetTokenHoldersServiceOptions) {
        this.tokenHolderStore = options.tokenHolderStore;
    }


    public async run(inputs: Inputs): Promise<Outputs> {
        const tokenHolders = await this.tokenHolderStore.find(inputs);
        return { coinHolders: tokenHolders };
    }
}