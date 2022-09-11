import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { signTypedMessage } from "eth-sig-util";
import { fromRpcSig } from "ethereumjs-util";
import { BigNumber, Wallet } from "ethers";
import { ethers } from "hardhat";
import { CarbonCreditToken } from "../typechain";
import { deploy } from "../utils/deployer";
import { untilSettled } from "../utils/txHelper";


const MAX_UINT256 = BigNumber.from('2').pow(BigNumber.from('256')).sub(BigNumber.from('1'));

describe("CarbonCreditToken permit", function() {
    let alice: SignerWithAddress;
    let bob = new Wallet("0x3e812b67b497110e5558fd5b287dc2080388c4c953c915dae89ccca374a56b9e");
    let charlie: SignerWithAddress;

    this.beforeAll(async () => {
        const signers = await ethers.getSigners();
        alice = signers[0];
        charlie = signers[2];
    });


    it("Should permit to handle CCT tokens", async () => {
        const carbonCreditToken = await deploy<CarbonCreditToken>("CarbonCreditToken");
        await untilSettled(carbonCreditToken.mint(bob.address, 42));
        
        const nonce = (await carbonCreditToken.nonces(bob.address)).toNumber();
        const chainId = 31337
        // const chainId = (await ethers.getDefaultProvider().getNetwork()).chainId
        const data = buildData({
            chainId,
            contractAddress: carbonCreditToken.address,
            name: "CarbonCreditToken",
            nonce,
            owner: bob.address,
            spender: charlie.address,
            value: "9",
            version: "1"
        });
        const signature = signTypedMessage(Buffer.from(bob.privateKey.substring(2), "hex"), { data });
        const { v, r, s } = fromRpcSig(signature);
        // TODO: make test running
        // await carbonCreditToken.permit(bob.address, charlie.address, 42, MAX_UINT256, v, r, s);
        // const allowance = await carbonCreditToken.allowance(bob.address, charlie.address);
        // expect(allowance.toNumber()).to.be.equal(42);
    });
});


function buildData(params: {
    name: string;
    chainId: any;
    version: string;
    contractAddress: string;
    deadline?: string;
    owner: string;
    spender: string;
    value: string;
    nonce: number;
}) {
    let { name, chainId, version, contractAddress, deadline, owner, spender, value, nonce } = params;
    deadline = deadline || MAX_UINT256.toHexString();

    const EIP712Domain = [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
    ];
    
    const Permit = [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
    ];

    return ({
        primaryType: <"Permit" | "EIP712Domain"> 'Permit',
        types: { EIP712Domain, Permit },
        domain: { name, version, chainId, verifyingContract: contractAddress },
        message: { owner, spender, value, nonce, deadline },
    });
}