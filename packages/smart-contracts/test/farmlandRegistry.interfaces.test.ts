import { expect } from "chai";
import { FarmlandRegistry } from "../typechain";
import { deploy } from "../utils/deployer";


describe("FarmlandRegistry interfaces", function () {
    let farmlandRegistry: FarmlandRegistry;

    const IERC165_ID = "0x01ffc9a7";
    const IERC721_ID = "0x80ac58cd";
    const IERC721Enumerable_ID = "0x780e9d63";
    const IERC721Metadata_ID = "0x5b5e139f";
    

    this.beforeAll(async () => {
        farmlandRegistry = await deploy<FarmlandRegistry>("FarmlandRegistry");
    });


    it("Should support IERC165", async () => {
        expect(await farmlandRegistry.supportsInterface(IERC165_ID)).to.equal(true);
    });


    it("Should support IERC721", async () => {
        expect(await farmlandRegistry.supportsInterface(IERC721_ID)).to.equal(true);
    });


    it("Should support IERC721Enumerable", async () => {
        expect(await farmlandRegistry.supportsInterface(IERC721Enumerable_ID)).to.equal(true);
    });


    it("Should support IERC721Metadata", async () => {
        expect(await farmlandRegistry.supportsInterface(IERC721Metadata_ID)).to.equal(true);
    });
});