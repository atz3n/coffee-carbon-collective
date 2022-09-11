import { initContractListeners } from "../../src/contract";
import { MintCheckerService } from "../../src/contract/common/MintCheckerService";
import { FarmlandRegistry } from "../../src/contract/interfaces/registry";
import { CarbonCreditToken } from "../../src/contract/interfaces/token";
import { BlockchainInfoStore } from "../../src/storage/blockchain/BlockchainInfoStore";
import { BlockchainInfoStoreInMemory } from "../../src/storage/blockchain/BlockchainInfoStoreInMemory";
import { TokenHolderStore } from "../../src/storage/token-holder/TokenHolderStore";
import { TokenHolderStoreInMemory } from "../../src/storage/token-holder/TokenHolderStoreInMemory";
import { config } from "../config";
import { TOKEN_HOLDER_ALICE } from "../data";
import { MockContract, EventListener } from "../mocks/MockContract";


// mock CarbonCreditTokens contract
let tokenMintListener = <EventListener> {};
// TODO: find a more robust solution to catch the token mint listener.
//       With the approach below (using a counter), we have to rely on
//       the element order of the tokenEventListeners array in src/contract/index.ts
let transferListenerCounter = 1;
const mockContract = new MockContract({
    onCb: (event: string, listener: EventListener): void => {
        if (event === "Transfer" && transferListenerCounter === 1) {
            transferListenerCounter++;
            tokenMintListener = listener;
        }
    }
});

// mock event
const event = {
    blockNumber: 10
};


if (!config.skipTests.includes("newProduct")) {
    const blockchainInfo =  <BlockchainInfoStoreInMemory> BlockchainInfoStore.get();
    const tokenHolderStore = <TokenHolderStoreInMemory> TokenHolderStore.get();

    beforeEach(async () => {
        blockchainInfo.clear();
        tokenHolderStore.clear();
    });


    it("should successfully process a token minting event", async () => {
        await initContractListeners(
            <FarmlandRegistry> <unknown> new MockContract(),
            <CarbonCreditToken> <unknown> mockContract
        );
        await tokenMintListener(MintCheckerService.ZERO_ADDRESS, TOKEN_HOLDER_ALICE.address, 1000, event);

        TOKEN_HOLDER_ALICE.amount = 1000;
        const tokenHolder = tokenHolderStore.store[0];
        expect(tokenHolder).toEqual(TOKEN_HOLDER_ALICE);
    });
} else {
    test("dummy", () => {
        expect(true).toBeTruthy();
    });
}