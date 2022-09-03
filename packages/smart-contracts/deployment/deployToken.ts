import { CarbonCreditToken, FarmlandRegistry } from '../typechain';
import { deploy } from '../utils/deployer';


async function main(): Promise<void> {
    const carbonCreditToken = await deploy<CarbonCreditToken>("CarbonCreditToken");
    console.log("CarbonCreditToken deployed to:", carbonCreditToken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });