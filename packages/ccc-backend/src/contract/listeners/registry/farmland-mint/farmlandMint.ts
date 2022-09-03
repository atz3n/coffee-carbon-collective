import { BlockchainInfoStore } from "../../../../storage/blockchain/BlockchainInfoStore";
import { FarmlandStore } from "../../../../storage/farmland/FarmlandStore";
import { BlockHeightService } from "../../../common/BlockHeightService";
import { MintCheckerService } from "../../../common/MintCheckerService";
import { ContractEventListener } from "../../../ContractEventHandler";
import { FarmlandMintService } from "./FarmlandMintService";


export function createFarmlandMintListener(): ContractEventListener {
    return {
        eventName: "Transfer",
        services: [
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new MintCheckerService({
                isMint: true
            }),
            new FarmlandMintService({
                farmlandStore: FarmlandStore.get()
            })
        ]
    };
}