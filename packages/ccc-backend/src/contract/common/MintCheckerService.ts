import { ContractEventService, ContractEventServiceCode } from "../ContractEventHandler";


interface MintCheckerServiceOptions {
    isMint: boolean
}


export class MintCheckerService implements ContractEventService {
    public static readonly ZERO_ADDRESS="0x0000000000000000000000000000000000000000";
    private readonly isMint: boolean;


    constructor(options: MintCheckerServiceOptions) {
        this.isMint = options.isMint;
    }


    public async run(inputs: unknown[]): Promise<ContractEventServiceCode> {
        const from = <string> inputs[0];
        if (this.isMint && from !== MintCheckerService.ZERO_ADDRESS) {
            return ContractEventServiceCode.STOP;
        }
        if (!this.isMint && from === MintCheckerService.ZERO_ADDRESS) {
            return ContractEventServiceCode.STOP;
        }

        return ContractEventServiceCode.CONTINUE;
    }
}