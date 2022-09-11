import { BlockchainInfoStore } from "../../../storage/blockchain/BlockchainInfoStore";
import { TokenHolderStore } from "../../../storage/token-holder/TokenHolderStore";
import { BlockHeightService } from "../../common/BlockHeightService";
import { MintCheckerService } from "../../common/MintCheckerService";
import { ContractEventListener } from "../../ContractEventHandler";
import { TokenTransferService } from "./TokenTransferService";


export function createTokenTransferListener(): ContractEventListener {
    return {
        eventName: "Transfer",
        services: [
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new MintCheckerService({
                isMint: false
            }),
            new TokenTransferService({
                tokenHolderStore: TokenHolderStore.get()
            })
        ]
    };
}