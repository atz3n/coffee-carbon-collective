import { IFarmlandStore } from "../../../storage/farmland/IFarmlandStore";
import { logger } from "../../../utils/logger";
import { ContractEventService } from "../../ContractEventHandler";
import { BigNumber, Event } from "ethers";
import { IpfsRetriever } from "../../../lib/IpfsRetriever";


interface Options {
    farmlandStore: IFarmlandStore;
    ipfsRetriever: IpfsRetriever;
}


export class FarmlandUpdateService implements ContractEventService {
    constructor(private readonly options: Options) {}


    public async run(inputs: unknown[]): Promise<void> {
        const tokenId = (<BigNumber> inputs[0]).toString();
        const setter = <string> inputs[1];
        const tokenURI = <string> inputs[2];
        const event = <Event> inputs[3];

        logger.event("TokenURIUpdate Start -> tokenId: " + tokenId + ", block: " + event.blockNumber + ", setter: " + setter + ", URI: " + tokenURI,
            { metadata: { tokenId, blockNumber: event.blockNumber } }
        );

        try {
            const ipfsData = await this.options.ipfsRetriever.retrieve(tokenURI);
            let farmland = (await this.options.farmlandStore.find({ tokenId }))[0];
            farmland = { ...farmland, ...ipfsData };
            await this.options.farmlandStore.upsert(farmland);
        } catch (error) {
            logger.error((<Error> error).message,
                { metadata: { tokenId, blockNumber: event.blockNumber } }
            );
        }

        logger.event("TokenURIUpdate End -> tokenId: " + tokenId + ", block: " + event.blockNumber,
            { metadata: { tokenId, blockNumber: event.blockNumber } }
        );
    }
}