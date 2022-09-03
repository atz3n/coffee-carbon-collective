import { FarmlandRegistry } from '../typechain';
import { deploy } from '../utils/deployer';


async function main(): Promise<void> {
    const farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
    console.log("FarmlandRegistry deployed to:", farmlandRegistry.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });