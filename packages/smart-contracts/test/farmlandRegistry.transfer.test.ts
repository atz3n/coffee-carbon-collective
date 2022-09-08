import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { FarmlandRegistry } from "../typechain";
import { deploy } from "../utils/deployer";
import { untilSettled } from "../utils/txHelper";


describe("FarmlandRegistry transfer", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let charlie: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
        charlie = signers[2];
    });


    it("Should transfer a FARM token", async () => {
        const farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(bob.address, 1));
        
        await untilSettled(farmlandRegistry.transferFrom(bob.address, charlie.address, 1));
        
        const tokenOwner = await farmlandRegistry.ownerOf(1);
        expect(tokenOwner).to.equal(charlie.address);
    });


    it("Should throw while trying to transfer a FARM token with no contract owner account", async () => {
        let farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(bob.address, 1));
        
        farmlandRegistry = farmlandRegistry.connect(bob);

        await expect(
            farmlandRegistry.transferFrom(bob.address, charlie.address, 1)
        ).to.be.revertedWith("FarmlandRegistry: Only transferable by contract owner");
    });


    it("Should throw while trying to approve a FARM token", async () => {
        let farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(alice.address, 1));
        
        await expect(
            farmlandRegistry.approve(bob.address, 1)
        ).to.be.revertedWith("FarmlandRegistry: Not approvable");
        
        await expect(
            farmlandRegistry.setApprovalForAll(bob.address, true)
        ).to.be.revertedWith("FarmlandRegistry: Not approvable");
    });
});