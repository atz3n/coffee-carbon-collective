import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { FarmlandRegistry } from "../typechain";
import { deploy } from "../utils/deployer";
import { untilSettled } from "../utils/txHelper";


describe("FarmlandRegistry burn", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let charlie: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
        charlie = signers[2];
    });


    it("Should burn a FARM token", async () => {
        const farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(bob.address, 1));
        
        await untilSettled(farmlandRegistry.burn(1));
        await expect(
            farmlandRegistry.ownerOf(1)
        ).to.be.revertedWith("ERC721: invalid token ID");
    });

    
    it("Should throw while trying to burn a FARM token with none contract owner account", async () => {
        let farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(bob.address, 1));
        farmlandRegistry = farmlandRegistry.connect(charlie);

        await expect(
            farmlandRegistry.burn(1)
        ).to.be.revertedWith("FarmlandRegistry: Only transferable by contract owner");
    });
});