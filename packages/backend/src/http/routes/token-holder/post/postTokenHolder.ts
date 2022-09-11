import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { TokenHolderStore } from "../../../../storage/token-holder/TokenHolderStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostTokenHolderService } from "./PostTokenHolderService";


export function createPostTokenHoldersRouter(): Router {
    return createRouter({
        method: "post",
        route: "/token-holders",
        inputPath: "body",
        inputChecks: [
            body("type").custom(isTokenHolderType).withMessage(INVALID_INPUT_TEXT + "type"),
            body("address").isEthereumAddress().withMessage(INVALID_INPUT_TEXT + "address")
        ],
        middlewares: [ cleanseInputs],
        service: new PostTokenHolderService({
            tokenHolderStore: TokenHolderStore.get(),
            tokenContract: Contracts.getCarbonCreditToken()
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
    const newBody = {
        address: request.body.address,
        type: request.body.type
    };

    request.body = newBody;
    next();
}