import { NextFunction, Request, Response, Router } from "express";
import { query } from "express-validator";
import { CoinHolderStore } from "../../../../storage/coin-holder/CoinHolderStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { GetCoinHoldersService } from "./GetCoinHoldersService";


export function createGetCoinHolderRouter(): Router {
    return createRouter({
        method: "get",
        route: "/coin-holders",
        inputPath: "query",
        inputChecks: [
            query("type").optional().custom(isCoinHolderType).withMessage(INVALID_INPUT_TEXT + "type"),
            query("address").optional().isEthereumAddress().withMessage(INVALID_INPUT_TEXT + "address")
        ],
        middlewares: [ cleanseInputs ],
        service: new GetCoinHoldersService({
            coinHolderStore: CoinHolderStore.get()
        })
    });
}

function isCoinHolderType(value: string): boolean {
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