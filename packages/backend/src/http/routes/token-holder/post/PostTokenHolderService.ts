import { BadRequestError } from "@atz3n/express-utils";
import { CarbonCreditToken } from "../../../../contract/interfaces/contracts/token";
import { TokenHolderType, ITokenHolderStore } from "../../../../storage/token-holder/ITokenHolderStore";
import { RouteService } from "../../../routerFactory";


interface PostTokenHolderServiceOptions {
    tokenHolderStore: ITokenHolderStore;
    tokenContract: CarbonCreditToken;
}

interface Inputs {
    address: string;
    type: TokenHolderType
}


export class PostTokenHolderService implements RouteService {
    private readonly tokenHolderStore: ITokenHolderStore;
    private readonly tokenContract: CarbonCreditToken;


    constructor(options: PostTokenHolderServiceOptions) {
        this.tokenHolderStore = options.tokenHolderStore;
        this.tokenContract = options.tokenContract;
    }


    public async run(inputs: Inputs): Promise<void> {
        const { address, type } = inputs;

        const tokenHolder = (await this.tokenHolderStore.find({ address }))[0];
        if (tokenHolder) {
            throw new BadRequestError("Address already exists");
        }

        const tokenHolderBalance = (await this.tokenContract.balanceOf(address)).toNumber();
        await this.tokenHolderStore.upsert({
            address,
            type,
            amount: tokenHolderBalance
        });
    }
}