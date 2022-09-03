import { Event } from "ethers";
import { ICoinHolderStore } from "../../../../storage/coin-holder/ICoinHolderStore";
import { logger } from "../../../../utils/logger";
import { ContractEventService } from "../../../ContractEventHandler";


interface CoinTransferServiceOptions {
    coinHolderStore: ICoinHolderStore;
}


export class CoinTransferService implements ContractEventService {
    private readonly coinHolderStore: ICoinHolderStore;


    constructor(options: CoinTransferServiceOptions) {
        this.coinHolderStore = options.coinHolderStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const from = <string> inputs[0];
        const to = <string> inputs[1];
        const amount = <number> inputs[2];
        const event = <Event> inputs[3];

        try {
            const fromCoinHolder = (await this.coinHolderStore.find({ address: from }))[0];
            const toCoinHolder = (await this.coinHolderStore.find({ address: to }))[0];
            if (!fromCoinHolder && !toCoinHolder) {
                return;
            }

            logger.event("New coins transferred -> amount: " + amount + ", block: " + event.blockNumber + ", from: " + from + ", to: " + to,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );


            if (fromCoinHolder) {
                fromCoinHolder.amount -= amount;
                await this.coinHolderStore.upsert(fromCoinHolder);
            }

            if (toCoinHolder) {
                toCoinHolder.amount += amount;
                await this.coinHolderStore.upsert(fromCoinHolder);
            }
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );
        }
    }
}