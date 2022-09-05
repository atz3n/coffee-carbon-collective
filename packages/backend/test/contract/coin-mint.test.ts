import { initContractListeners } from "../../src/contract";
import { MintCheckerService } from "../../src/contract/common/MintCheckerService";
import { CarbonCreditCoin } from "../../src/contract/interfaces/CarbonCreditCoin";
import { FarmlandRegistry } from "../../src/contract/interfaces/FarmlandRegistry";
import { BlockchainInfoStore } from "../../src/storage/blockchain/BlockchainInfoStore";
import { BlockchainInfoStoreInMemory } from "../../src/storage/blockchain/BlockchainInfoStoreInMemory";
import { CoinHolderStore } from "../../src/storage/coin-holder/CoinHolderStore";
import { CoinHolderStoreInMemory } from "../../src/storage/coin-holder/CoinHolderStoreInMemory";
import { config } from "../config";
import { COIN_HOLDER_ALICE } from "../data";
import { MockContract, EventListener } from "../mocks/MockContract";


// mock CarbonCreditCoins contract
let coinMintListener = <EventListener> {};
// TODO: find a more robust solution to catch the coin mint listener.
//       With the approach below (using a counter), we have to rely on
//       the element order of the coinEventListeners array in src/contract/index.ts
let transferListenerCounter = 1;
const mockContract = new MockContract({
    onCb: (event: string, listener: EventListener): void => {
        if (event === "Transfer" && transferListenerCounter === 1) {
            transferListenerCounter++;
            coinMintListener = listener;
        }
    }
});

// mock event
const event = {
    blockNumber: 10
};


if (!config.skipTests.includes("newProduct")) {
    const blockchainInfo =  <BlockchainInfoStoreInMemory> BlockchainInfoStore.get();
    const coinHolderStore = <CoinHolderStoreInMemory> CoinHolderStore.get();

    beforeEach(async () => {
        blockchainInfo.clear();
        coinHolderStore.clear();
    });


    it("should successfully process a coin minting event", async () => {
        await initContractListeners(
            <FarmlandRegistry> <unknown> new MockContract(),
            <CarbonCreditCoin> <unknown> mockContract
        );
        await coinMintListener(MintCheckerService.ZERO_ADDRESS, COIN_HOLDER_ALICE.address, 1000, event);

        COIN_HOLDER_ALICE.amount = 1000;
        const coinHolder = coinHolderStore.store[0];
        expect(coinHolder).toEqual(COIN_HOLDER_ALICE);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}