import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { FarmlandRegistry } from "../typechain";
import { deploy } from "../utils/deployer";
import { untilSettled } from "../utils/txHelper";


describe("FarmlandRegistry mint", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
    });


    it("Should mint a FARM token", async () => {
        const farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(alice.address, 1));
        
        const tokenOwner = await farmlandRegistry.ownerOf(1);
        expect(tokenOwner).to.equal(alice.address);
    });


    it("Should throw while trying to mint a FARM token with none contract owner account", async () => {
        let farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        farmlandRegistry = farmlandRegistry.connect(bob);

        await expect(
            farmlandRegistry.safeMint(alice.address, 1)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
});