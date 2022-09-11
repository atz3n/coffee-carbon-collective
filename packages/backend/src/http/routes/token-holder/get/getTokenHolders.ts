import { NextFunction, Request, Response, Router } from "express";
import { query } from "express-validator";
import { TokenHolderStore } from "../../../../storage/token-holder/TokenHolderStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { GetTokenHoldersService } from "./GetTokenHoldersService";


export function createGetTokenHolderRouter(): Router {
    return createRouter({
        method: "get",
        route: "/token-holders",
        inputPath: "query",
        inputChecks: [
            query("type").optional().custom(isTokenHolderType).withMessage(INVALID_INPUT_TEXT + "type"),
            query("address").optional().isEthereumAddress().withMessage(INVALID_INPUT_TEXT + "address")
        ],
        middlewares: [ cleanseInputs ],
        service: new GetTokenHoldersService({
            tokenHolderStore: TokenHolderStore.get()
        })
    });
}

function isTokenHolderType(value: string): boolean {
    if (value) {
        return value === "funder" || value === "farmer";
    }
    return true;
}

function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newQuery: {
        type?: string;
        address?: string;
    } = {};

    if (request.query.type) {
        newQuery.type = <string> request.query.type;
    }

    if (request.query.address) {
        newQuery.address = <string> request.query.address;
    }

    request.query = newQuery;
    next();
}