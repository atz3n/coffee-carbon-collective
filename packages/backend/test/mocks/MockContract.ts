export type EventListener = (...args: unknown[]) => Promise<void>;

interface MockContractOptions {
    onCb?: (event: string, listener: EventListener) => void
}


export class MockContract {
    private readonly onCb?: (event: string, listener: EventListener) => void;
    public provider = {
        getBlockNumber: (): number => {
            return 1;
        }
    }

    constructor(options?: MockContractOptions) {
        this.onCb = options?.onCb;
    }


    public on(event: string, listener: EventListener): void {
        if (this.onCb) {
            this.onCb(event, listener);
        }
    }
}