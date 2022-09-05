import { EnvVars } from "../lib/EnvVars";
import { BlockchainInfoStore } from "../storage/blockchain/BlockchainInfoStore";
import { ContractEventHandler } from "./ContractEventHandler";
import { catchUpEvents } from "./eventCatchUpper";
import { CarbonCreditCoin } from "./interfaces/CarbonCreditCoin";
import { FarmlandRegistry } from "./interfaces/FarmlandRegistry";
import { createCoinMintListener } from "./listeners/coin-mint/coinMint";
import { createCoinTransferListener } from "./listeners/coin-transfer/coinTransfer";
import { createFarmlandMintListener } from "./listeners/farmland-mint/farmlandMint";


export async function initContractListeners(farmlandRegistry: FarmlandRegistry, carbonCreditCoin: CarbonCreditCoin): Promise<void> {
    const registryEventListeners = [
        createFarmlandMintListener()
    ];

    const coinEventListeners = [
        createCoinMintListener(),
        createCoinTransferListener()
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
            contract: carbonCreditCoin,
            eventSetups: coinEventListeners.map((listener) => {
                return { eventListener: listener };
            })
        });
    }

    const registryEventHandler = new ContractEventHandler({ contract: farmlandRegistry });
    const coinEventHandler = new ContractEventHandler({ contract: carbonCreditCoin });

    await registryEventHandler.init();
    await coinEventHandler.init();

    registryEventListeners.forEach(eventListener => registryEventHandler.add(eventListener));
    coinEventListeners.forEach(eventListener => coinEventHandler.add(eventListener));
}