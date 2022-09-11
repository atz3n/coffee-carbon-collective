import { Event } from "ethers";
import { ITokenHolderStore } from "../../../storage/token-holder/ITokenHolderStore";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";


interface TokenMintServiceOptions {
    tokenHolderStore: ITokenHolderStore;
}


export class TokenMintService implements ContractEventService {
    private readonly tokenHolderStore: ITokenHolderStore;


    constructor(options: TokenMintServiceOptions) {
        this.tokenHolderStore = options.tokenHolderStore;
    }


    async run(inputs: unknown[]): Promise<void> {
        const to = <string> inputs[1];
        const amount = <number> inputs[2];
        const event = <Event> inputs[3];

        logger.event("New tokens minted -> amount: " + amount + ", block: " + event.blockNumber + ", owner: " + to,
            { metadata: { owner: to, blockNumber: event.blockNumber } }
        );

        try {
            let tokenHolderBalance = amount;
            const tokenHolder = (await this.tokenHolderStore.find({ address: to }))[0];
            if (tokenHolder) {
                tokenHolderBalance += tokenHolder.amount;
            }
            await this.tokenHolderStore.upsert({
                address: to,
                amount: tokenHolderBalance,
                type: "farmer"
            });
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );
        }
    }
}