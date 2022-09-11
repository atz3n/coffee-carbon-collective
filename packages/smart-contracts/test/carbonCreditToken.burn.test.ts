import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CarbonCreditToken } from "../typechain";
import { deploy } from "../utils/deployer";
import { untilSettled } from "../utils/txHelper";


describe("CarbonCreditToken burn", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let charlie: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
        charlie = signers[2];
    });


    it("Should burn a CCT token", async () => {
        const carbonCreditToken = await deploy<CarbonCreditToken>("CarbonCreditToken");
        await untilSettled(carbonCreditToken.mint(alice.address, 1));
        
        await untilSettled(carbonCreditToken.burn(1));
        const balance = await carbonCreditToken.balanceOf(bob.address)
        expect(balance.toNumber()).to.equal(0);
    });
});