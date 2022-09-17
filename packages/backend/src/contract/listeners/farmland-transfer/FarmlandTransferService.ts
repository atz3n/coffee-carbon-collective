import { BigNumber, Event } from "ethers";
import { IFarmlandStore } from "../../../storage/farmland/IFarmlandStore";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";


interface Options {
    farmlandStore: IFarmlandStore;
}


export class FarmlandTransferService implements ContractEventService {
    constructor(private readonly options: Options) {}


    async run(inputs: unknown[]): Promise<void> {
        const from = <string> inputs[0];
        const to = <string> inputs[1];
        const tokenId = (<BigNumber> inputs[2]).toString();
        const event = <Event> inputs[3];

        logger.event("Farmland transferred -> tokenId: " + tokenId + ", block: " + event.blockNumber + ", from: " + from + ", to: " + to,
            { metadata: { owner: to, blockNumber: event.blockNumber } }
        );

        try {
            const farmland = (await this.options.farmlandStore.find({ tokenId }))[0];
            farmland.owner = to;
            await this.options.farmlandStore.upsert(farmland);
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { owner: to, blockNumber: event.blockNumber } }
            );
        }
    }
}