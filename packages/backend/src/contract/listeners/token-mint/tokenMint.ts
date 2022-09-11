import { BlockchainInfoStore } from "../../../storage/blockchain/BlockchainInfoStore";
import { TokenHolderStore } from "../../../storage/token-holder/TokenHolderStore";
import { BlockHeightService } from "../../common/BlockHeightService";
import { MintCheckerService } from "../../common/MintCheckerService";
import { ContractEventListener } from "../../ContractEventHandler";
import { TokenMintService } from "./TokenMintService";


export function createTokenMintListener(): ContractEventListener {
    return {
        eventName: "Transfer",
        services: [
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new MintCheckerService({
                isMint: true
            }),
            new TokenMintService({
                tokenHolderStore: TokenHolderStore.get()
            })
        ]
    };
}