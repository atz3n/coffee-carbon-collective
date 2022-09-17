import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../../contract/Contracts";
import { FarmerStore } from "../../../../../storage/farmer/FarmerStore";
import { FarmlandStore } from "../../../../../storage/farmland/FarmlandStore";
import { INVALID_INPUT_TEXT } from "../../../../constants";
import { createRouter } from "../../../../routerFactory";
import { PostFarmlandsOwnerService } from "./PatchtFarmlandsOwnerService";


export function createPatchFarmlandsOwnerRouter(): Router {
    return createRouter({
        method: "patch",
        route: "/farmlands/owner",
        inputPath: "body",
        inputChecks: [
            body("tokenId").isString().withMessage(INVALID_INPUT_TEXT + "tokenId"),
            body("owner").isString().withMessage(INVALID_INPUT_TEXT + "owner")
        ],
        middlewares: [ cleanseInputs ],
        service: new PostFarmlandsOwnerService({
            farmerStore: FarmerStore.get(),
            farmlandRegistry: Contracts.getFarmlandRegistry(),
            farmlandStore: FarmlandStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody = {
        owner: request.body.owner,
        tokenId: request.body.tokenId,
    };

    request.body = newBody;
    next();
}