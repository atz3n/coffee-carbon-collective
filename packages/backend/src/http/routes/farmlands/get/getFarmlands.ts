import { NextFunction, Request, Response, Router } from "express";
import { query } from "express-validator";
import { FarmlandStore } from "../../../../storage/farmland/FarmlandStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { GetFarmlandsService } from "./GetFarmlandsService";


export function createGetFarmlandsRouter(): Router {
    return createRouter({
        method: "get",
        route: "/farmlands",
        inputPath: "query",
        inputChecks: [
            query("owner").optional().isEmail().withMessage(INVALID_INPUT_TEXT + "owner"),
            query("tokenId").optional().isEmail().withMessage(INVALID_INPUT_TEXT + "tokenId")
        ],
        middlewares: [ cleanseInputs ],
        service: new GetFarmlandsService({
            farmlandStore: FarmlandStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newQuery = <any> {};
    if (request.query.owner) {
        newQuery.owner = request.query.owner;
    }
    if (request.query.tokenId) {
        newQuery.tokenId = request.query.tokenId;
    }

    request.query = newQuery;
    next();
}