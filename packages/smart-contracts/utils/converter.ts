import { BigNumber, ethers } from "ethers";


export function weiToEth(wei: BigNumber): number {
    return parseFloat(ethers.utils.formatEther(wei));
}


export function ethToWei(eth: number): BigNumber {
    return ethers.utils.parseEther(eth.toString());
}