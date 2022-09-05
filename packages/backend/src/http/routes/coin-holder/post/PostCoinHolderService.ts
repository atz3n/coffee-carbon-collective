import { BadRequestError } from "@atz3n/express-utils";
import { CarbonCreditCoin } from "../../../../contract/interfaces/CarbonCreditCoin";
import { CoinHolderType, ICoinHolderStore } from "../../../../storage/coin-holder/ICoinHolderStore";
import { RouteService } from "../../../routerFactory";


interface PostCoinHolderServiceOptions {
    coinHolderStore: ICoinHolderStore;
    coinContract: CarbonCreditCoin;
}

interface Inputs {
    address: string;
    type: CoinHolderType
}


export class PostCoinHolderService implements RouteService {
    private readonly coinHolderStore: ICoinHolderStore;
    private readonly coinContract: CarbonCreditCoin;


    constructor(options: PostCoinHolderServiceOptions) {
        this.coinHolderStore = options.coinHolderStore;
        this.coinContract = options.coinContract;
    }


    public async run(inputs: Inputs): Promise<void> {
        const { address, type } = inputs;

        const coinHolder = (await this.coinHolderStore.find({ address }))[0];
        if (coinHolder) {
            throw new BadRequestError("Address already exists");
        }

        const coinHolderBalance = (await this.coinContract.balanceOf(address)).toNumber();
        await this.coinHolderStore.upsert({
            address,
            type,
            amount: coinHolderBalance
        });
    }
}