import { BlockchainInfoStore } from "../../../../storage/blockchain/BlockchainInfoStore";
import { CoinHolderStore } from "../../../../storage/coin-holder/CoinHolderStore";
import { BlockHeightService } from "../../../common/BlockHeightService";
import { MintCheckerService } from "../../../common/MintCheckerService";
import { ContractEventListener } from "../../../ContractEventHandler";
import { CoinTransferService } from "./CoinTransferService";


export function createCoinTransferListener(): ContractEventListener {
    return {
        eventName: "Transfer",
        services: [
            new BlockHeightService({
                blockchainInfoStore: BlockchainInfoStore.get()
            }),
            new MintCheckerService({
                isMint: false
            }),
            new CoinTransferService({
                coinHolderStore: CoinHolderStore.get()
            })
        ]
    };
}