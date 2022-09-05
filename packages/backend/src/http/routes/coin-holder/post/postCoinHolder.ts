import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { CoinHolderStore } from "../../../../storage/coin-holder/CoinHolderStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostCoinHolderService } from "./PostCoinHolderService";


export function createPostCoinHoldersRouter(): Router {
    return createRouter({
        method: "post",
        route: "/coin-holders",
        inputPath: "body",
        inputChecks: [
            body("type").custom(isCoinHolderType).withMessage(INVALID_INPUT_TEXT + "type"),
            body("address").isEthereumAddress().withMessage(INVALID_INPUT_TEXT + "address")
        ],
        middlewares: [ cleanseInputs],
        service: new PostCoinHolderService({
            coinHolderStore: CoinHolderStore.get(),
            coinContract: Contracts.getCarbonCreditCoin()
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
    const newBody = {
        address: request.body.address,
        type: request.body.type
    };

    request.body = newBody;
    next();
}