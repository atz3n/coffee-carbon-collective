import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CarbonCreditToken, FarmlandRegistry } from "../../typechain";
import { deploy } from "../../utils/deployer";
import { untilSettled } from "../../utils/txHelper";


describe("CarbonCreditToken mint", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
    });


    it("Should mint a CCT token", async () => {
        const carbonCreditToken = await deploy<CarbonCreditToken>("CarbonCreditToken");
        await untilSettled(carbonCreditToken.mint(alice.address, 1));
        
        const balance = await carbonCreditToken.balanceOf(alice.address);
        expect(balance.toNumber()).to.equal(1);
    });
});