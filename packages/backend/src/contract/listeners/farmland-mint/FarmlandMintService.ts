import { IFarmlandStore } from "../../../storage/farmland/IFarmlandStore";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";
import { Event } from "ethers";


interface Options {
    farmlandStore: IFarmlandStore;
}


export class FarmlandMintService implements ContractEventService {
    constructor(private readonly options: Options) {}


    public async run(inputs: unknown[]): Promise<void> {
        const to = <string> inputs[1];
        const tokenId = <string> "" + inputs[2];
        const event = <Event> inputs[3];

        logger.event("New farmland registered -> tokenId: " + tokenId + ", block: " + event.blockNumber + ", owner: " + to,
            { metadata: { tokenId, blockNumber: event.blockNumber } }
        );

        try {
            await this.options.farmlandStore.upsert({
                owner: to,
                tokenId
            });
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { tokenId, blockNumber: event.blockNumber } }
            );
        }
    }
}