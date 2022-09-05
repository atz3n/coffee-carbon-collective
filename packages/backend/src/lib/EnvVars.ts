import dotenv from "dotenv";


export enum RUN_CONTEXT {
    PRODUCTION,
    DEVELOPMENT,
    TEST
}


export class EnvVars {
    private static isInitialized = false;

    public static RUN_CONTEXT = RUN_CONTEXT.PRODUCTION;
    public static PORT = 0;
    public static ALLOWED_ORIGINS: string[] = [];
    public static MONGO_DB_URL = "";
    public static MAX_REQUESTS_PER_15_MIN = 0;
    public static RPC_URL = "";
    public static WS_RPC_CONNECTION_CHECK_INTERVAL_SEC = 0;
    public static WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC = 0;
    public static WS_RPC_KEEP_ALIVE_INTERVAL_SEC = 0;
    public static WS_RPC_RECONNECT_DELAY_SEC = 0;
    public static CATCH_UP_ALL_CONTRACT_EVENTS = false;
    public static FARMLAND_REGISTRY_CONTRACT_ADDRESS = "";
    public static CARBON_CREDIT_COIN_CONTRACT_ADDRESS = "";


    public static load(): void {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = true;

        this.set_RUN_CONTEXT();
        this.set_ALLOWED_ORIGINS();

        this.setVar("MONGO_DB_URL", (envVar) => {
            this.MONGO_DB_URL = String(envVar);
        }, "");
        this.setVar("PORT", (envVar) => {
            this.PORT = Number(envVar);
        }, 3000);
        this.setVar("MAX_REQUESTS_PER_15_MIN", (envVar) => {
            this.MAX_REQUESTS_PER_15_MIN = Number(envVar);
        }, 1000);
        this.setVar("RPC_URL", (envVar) => {
            this.RPC_URL = String(envVar);
        });
        this.setVar("WS_RPC_CONNECTION_CHECK_INTERVAL_SEC", (envVar) => {
            this.WS_RPC_CONNECTION_CHECK_INTERVAL_SEC = Number(envVar);
        }, 15);
        this.setVar("WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC", (envVar) => {
            this.WS_RPC_CONNECTION_CHECK_TIMEOUT_SEC = Number(envVar);
        }, 20);
        this.setVar("WS_RPC_KEEP_ALIVE_INTERVAL_SEC", (envVar) => {
            this.WS_RPC_KEEP_ALIVE_INTERVAL_SEC = Number(envVar);
        }, 5 * 60);
        this.setVar("WS_RPC_RECONNECT_DELAY_SEC", (envVar) => {
            this.WS_RPC_RECONNECT_DELAY_SEC = Number(envVar);
        }, 2);
        this.setVar("CATCH_UP_ALL_CONTRACT_EVENTS", (envVar) => {
            this.CATCH_UP_ALL_CONTRACT_EVENTS = this.Boolean(envVar);
        }, false);
        this.setVar("FARMLAND_REGISTRY_CONTRACT_ADDRESS", (envVar) => {
            this.FARMLAND_REGISTRY_CONTRACT_ADDRESS = String(envVar);
        });
        this.setVar("CARBON_CREDIT_COIN_CONTRACT_ADDRESS", (envVar) => {
            this.CARBON_CREDIT_COIN_CONTRACT_ADDRESS = String(envVar);
        });
    }

    private static set_RUN_CONTEXT(): void {
        if (process.env.RUN_CONTEXT === "development") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config();
        } else if (process.env.RUN_CONTEXT === "development1") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config({ path: __dirname + "/../../dev1.env" });
        } else if (process.env.RUN_CONTEXT === "development2") {
            this.RUN_CONTEXT = RUN_CONTEXT.DEVELOPMENT;
            dotenv.config({ path: __dirname + "/../../dev2.env" });
        } else if (process.env.RUN_CONTEXT === "test") {
            this.RUN_CONTEXT = RUN_CONTEXT.TEST;
            dotenv.config({ path: __dirname + "/../../test/test.env" });
        } else {
            dotenv.config();
        }
    }

    private static set_ALLOWED_ORIGINS(): void {
        if (!process.env.ALLOWED_ORIGINS) {
            this.ALLOWED_ORIGINS = [];
        } else {
            this.ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim());
        }
    }

    private static setVar(envVarName: string, cb: (variable: unknown) => void, defaultVar?: unknown): void {
        if (process.env[envVarName]) {
            cb(process.env[envVarName]);
        } else if (defaultVar !== undefined) {
            cb(defaultVar);
        } else {
            throw new Error(`${envVarName} must be defined`);
        }
    }

    private static Boolean(value: unknown): boolean {
        return value === true ? true : value === "true";
    }
}

EnvVars.load();