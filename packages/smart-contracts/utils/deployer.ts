import { ContractFactory } from "ethers";
import { ethers } from "hardhat";


export async function deploy<T>(contractName: string, ...args: Array<any>): Promise<T> {
    const contractFactory = <ContractFactory> await ethers.getContractFactory(contractName);
    const contract = await contractFactory.deploy(args);
    await contract.deployed();
    return <T> <unknown> contract;
};