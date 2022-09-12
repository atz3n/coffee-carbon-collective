import { EnvVars } from "../lib/EnvVars";
import { BlockchainInfoStore } from "../storage/blockchain/BlockchainInfoStore";
import { ContractEventHandler } from "./ContractEventHandler";
import { catchUpEvents } from "./eventCatchUpper";
import { createTokenMintListener } from "./listeners/token-mint/tokenMint";
import { createTokenTransferListener } from "./listeners/token-transfer/tokenTransfer";
import { createFarmlandMintListener } from "./listeners/farmland-mint/farmlandMint";
import { FarmlandRegistry } from "./interfaces/contracts/registry";
import { CarbonCreditToken } from "./interfaces/contracts/token";


export async function initContractListeners(farmlandRegistry: FarmlandRegistry, carbonCreditToken: CarbonCreditToken): Promise<void> {
    const registryEventListeners = [
        createFarmlandMintListener()
    ];

    const tokenEventListeners = [
        createTokenMintListener(),
        createTokenTransferListener()
    ];

    const blockchainInfoStore = BlockchainInfoStore.get();
    if (EnvVars.CATCH_UP_ALL_CONTRACT_EVENTS) {
        await blockchainInfoStore.upsert({ blockHeight: 0 });
    }

    const blockchainInfo = await blockchainInfoStore.get();
    if (blockchainInfo) {
        await catchUpEvents({
            fromBlockHeight: blockchainInfo.blockHeight + 1,
            contract: farmlandRegistry,
            eventSetups: registryEventListeners.map((listener) => {
                return { eventListener: listener };
            })
        });
        await catchUpEvents({
            fromBlockHeight: blockchainInfo.blockHeight + 1,
            contract: carbonCreditToken,
            eventSetups: tokenEventListeners.map((listener) => {
                return { eventListener: listener };
            })
        });
    }

    const registryEventHandler = new ContractEventHandler({ contract: farmlandRegistry });
    const tokenEventHandler = new ContractEventHandler({ contract: carbonCreditToken });

    await registryEventHandler.init();
    await tokenEventHandler.init();

    registryEventListeners.forEach(eventListener => registryEventHandler.add(eventListener));
    tokenEventListeners.forEach(eventListener => tokenEventHandler.add(eventListener));
}