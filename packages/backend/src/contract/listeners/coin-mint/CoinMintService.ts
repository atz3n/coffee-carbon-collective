import { Event } from "ethers";
import { ICoinHolderStore } from "../../../storage/coin-holder/ICoinHolderStore";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";


interface CoinMintServiceOptions {
    coinHolderStore: ICoinHolderStore;
}


export class CoinMintService implements ContractEventService {
    private readonly coinHolderStore: ICoinHolderStore;


    constructor(options: CoinMintServiceOptions) {
        this.coinHolderStore = options.coinHolderStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const to = <string> inputs[1];
        const amount = <number> inputs[2];
        const event = <Event> inputs[3];

        logger.event("New coins minted -> amount: " + amount + ", block: " + event.blockNumber + ", owner: " + to,
            { metadata: { owner: to, blockNumber: event.blockNumber } }
        );

        try {
            let coinHolderBalance = amount;
            const coinHolder = (await this.coinHolderStore.find({ address: to }))[0];
            if (coinHolder) {
                coinHolderBalance += coinHolder.amount;
            }
            await this.coinHolderStore.upsert({
                address: to,
                amount: coinHolderBalance,
                type: "farmer"
            });
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );
        }
    }
}