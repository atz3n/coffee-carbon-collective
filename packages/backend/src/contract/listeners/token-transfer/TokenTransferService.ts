import { Event } from "ethers";
import { ITokenHolderStore } from "../../../storage/token-holder/ITokenHolderStore";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";


interface TokenTransferServiceOptions {
    tokenHolderStore: ITokenHolderStore;
}


export class TokenTransferService implements ContractEventService {
    private readonly tokenHolderStore: ITokenHolderStore;


    constructor(options: TokenTransferServiceOptions) {
        this.tokenHolderStore = options.tokenHolderStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const from = <string> inputs[0];
        const to = <string> inputs[1];
        const amount = <number> inputs[2];
        const event = <Event> inputs[3];

        try {
            const fromTokenHolder = (await this.tokenHolderStore.find({ address: from }))[0];
            const toTokenHolder = (await this.tokenHolderStore.find({ address: to }))[0];
            if (!fromTokenHolder && !toTokenHolder) {
                return;
            }

            logger.event("Tokens transferred -> amount: " + amount + ", block: " + event.blockNumber + ", from: " + from + ", to: " + to,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );


            if (fromTokenHolder) {
                fromTokenHolder.amount -= amount;
                await this.tokenHolderStore.upsert(fromTokenHolder);
            }

            if (toTokenHolder) {
                toTokenHolder.amount += amount;
                await this.tokenHolderStore.upsert(fromTokenHolder);
            }
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );
        }
    }
}