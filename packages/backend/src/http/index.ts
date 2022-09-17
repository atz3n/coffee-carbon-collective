import { errorHandler, NotFoundError, validateOrigin } from "@atz3n/express-utils";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { createServer, Server } from "http";
import { EnvVars } from "../lib/EnvVars";
import { logErrors } from "./middlewares/errorLogging";
import { logHttp } from "./middlewares/httpLogging";
import { createGetFarmersRouter } from "./routes/farmers/get/getFarmers";
import { createPatchFarmersRouter } from "./routes/farmers/patch/patchFarmers";
import { createPostFarmersRouter } from "./routes/farmers/post/postFarmers";
import { createGetFarmlandsRouter } from "./routes/farmlands/get/getFarmlands";
import { createPostFarmlandRouter } from "./routes/farmlands/post/postFarmlands";


export function initHttpServer(): Server {
    const httpServer = express();

    httpServer.use(logHttp);
    httpServer.use(helmet());
    httpServer.use(cors());
    httpServer.use(json({ limit: "50mb" }));
    httpServer.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: EnvVars.MAX_REQUESTS_PER_15_MIN,
        standardHeaders: true
    }));
    httpServer.use(validateOrigin(EnvVars.ALLOWED_ORIGINS));

    httpServer.use(createPostFarmersRouter());
    httpServer.use(createGetFarmersRouter());
    httpServer.use(createPatchFarmersRouter());
    httpServer.use(createGetFarmlandsRouter());
    httpServer.use(createPostFarmlandRouter());

    httpServer.all("*", (request, response) => {
        throw new NotFoundError();
    });

    httpServer.use(logErrors);
    httpServer.use(errorHandler);

    return createServer(httpServer);
}