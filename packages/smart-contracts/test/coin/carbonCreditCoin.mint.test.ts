import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { CarbonCreditCoin } from "../../typechain";
import { deploy } from "../../utils/deployer";
import { untilSettled } from "../../utils/txHelper";


describe("CarbonCreditCoin mint", function() {
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        bob = signers[1];
    });


    it("Should mint a CCC Token", async () => {
        const carbonCreditCoin = await deploy<CarbonCreditCoin>("CarbonCreditCoin");
        await untilSettled(carbonCreditCoin.mint(alice.address, 1));
        
        const balance = await carbonCreditCoin.balanceOf(alice.address);
        expect(balance.toNumber()).to.equal(1);
    });
});