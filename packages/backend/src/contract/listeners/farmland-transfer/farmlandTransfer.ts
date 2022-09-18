import { BlockchainInfoStore } from "../../../storage/blockchain/BlockchainInfoStore";
import { FarmlandStore } from "../../../storage/farmland/FarmlandStore";
import { BlockHeightService } from "../../common/BlockHeightService";
import { MintCheckerService } from "../../common/MintCheckerService";
import { ContractEventListener } from "../../ContractEventHandler";
import { FarmlandTransferService } from "./FarmlandTransferService";


export function createFarmlandTransferListener(): ContractEventListener {
    return {
        eventName: "Transfer",
        services: [
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new MintCheckerService({
                isMint: false
            }),
            new FarmlandTransferService({
                farmlandStore: FarmlandStore.get()
            })
        ]
    };
}