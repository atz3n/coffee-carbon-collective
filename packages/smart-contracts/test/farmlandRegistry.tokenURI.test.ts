import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { FarmlandRegistry } from "../typechain";
import { deploy } from "../utils/deployer";
import { untilSettled } from "../utils/txHelper";


describe("FarmlandRegistry tokenURI", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
    });


    it("Should set a token URI", async () => {
        const dummyTokenURI = "hello world";
        const farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(bob.address, 1));
        
        await untilSettled(farmlandRegistry.setTokenURI(1, dummyTokenURI));
        const tokenURI = await farmlandRegistry.tokenURI(1);

        expect(tokenURI).to.equal(dummyTokenURI);
    });

    
    it("Should throw while trying to set a token URI with none contract owner account", async () => {
        const dummyTokenURI = "hello world";
        let farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
        await untilSettled(farmlandRegistry.safeMint(bob.address, 1));
        farmlandRegistry = farmlandRegistry.connect(bob);

        await expect(
            farmlandRegistry.setTokenURI(1, dummyTokenURI)
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });


    it("Should emit an event while setting the tokenURI", async () => {
        const dummyTokenURI = "hello world";
        let farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");

        await untilSettled(farmlandRegistry.safeMint(alice.address, 1));
        await expect(
            farmlandRegistry.setTokenURI(1, dummyTokenURI)
        ).to.emit(farmlandRegistry, 'TokenURIUpdate').withArgs(1, alice.address, dummyTokenURI);
    });
});