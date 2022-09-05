import { CarbonCreditCoin } from '../typechain';
import { deploy } from '../utils/deployer';


async function main(): Promise<void> {
    const carbonCreditCoin = await deploy<CarbonCreditCoin>("CarbonCreditCoin");
    console.log("CarbonCreditCoin deployed to:", carbonCreditCoin.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });