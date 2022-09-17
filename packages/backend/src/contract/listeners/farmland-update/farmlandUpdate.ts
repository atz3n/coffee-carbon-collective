import { EnvVars } from "../../../lib/EnvVars";
import { IpfsRetriever } from "../../../lib/IpfsRetriever";
import { BlockchainInfoStore } from "../../../storage/blockchain/BlockchainInfoStore";
import { FarmlandStore } from "../../../storage/farmland/FarmlandStore";
import { BlockHeightService } from "../../common/BlockHeightService";
import { ContractEventListener } from "../../ContractEventHandler";
import { FarmlandUpdateService } from "./FarmlandUpdateService";


export function createFarmlandUpdateListener(): ContractEventListener {
    return {
        eventName: "TokenURIUpdate",
        services: [
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new FarmlandUpdateService({
                farmlandStore: FarmlandStore.get(),
                ipfsRetriever: new IpfsRetriever({
                    gatewayUrls: EnvVars.IPFS_GATEWAY_URLS,
                    tries: EnvVars.IPFS_RETRIEVAL_TRIES,
                    tryDelayInSec: EnvVars.IPFS_RETRIEVAL_TRY_DELAY
                })
            })
        ]
    };
}