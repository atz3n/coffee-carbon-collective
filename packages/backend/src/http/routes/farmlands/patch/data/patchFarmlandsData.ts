import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../../contract/Contracts";
import { EnvVars } from "../../../../../lib/EnvVars";
import { IpfsStorer } from "../../../../../lib/IpfsStorer";
import { FarmlandStore } from "../../../../../storage/farmland/FarmlandStore";
import { INVALID_INPUT_TEXT } from "../../../../constants";
import { createRouter } from "../../../../routerFactory";
import { PatchFarmlandsDataService } from "./PatchFarmlandsDataService";


export function createPatchFarmlandsDataRouter(): Router {
    return createRouter({
        method: "patch",
        route: "/farmlands/data",
        inputPath: "body",
        inputChecks: [
            body("tokenId").isString().withMessage(INVALID_INPUT_TEXT + "tokenId"),
            body("description").optional().isString().withMessage(INVALID_INPUT_TEXT + "description"),
            body("imageName").optional().isString().withMessage(INVALID_INPUT_TEXT + "imageName"),
            body("imageData").optional().isString().withMessage(INVALID_INPUT_TEXT + "imageData"),
            body("name").optional().isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("country").optional().isString().withMessage(INVALID_INPUT_TEXT + "country"),
            body("produce").optional().isString().withMessage(INVALID_INPUT_TEXT + "produce"),
            body("kmlName").optional().isString().withMessage(INVALID_INPUT_TEXT + "kmlName"),
            body("kmlData").optional().isString().withMessage(INVALID_INPUT_TEXT + "kmlData"),
            body("size").optional().isNumeric().withMessage(INVALID_INPUT_TEXT + "size")
        ],
        middlewares: [ cleanseInputs ],
        service: new PatchFarmlandsDataService({
            farmlandRegistry: Contracts.getFarmlandRegistry(),
            farmlandStore: FarmlandStore.get(),
            ipfsStorer: new IpfsStorer({
                authToken: EnvVars.NFT_STORAGE_TOKEN
            })
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newBody = <any> {
        tokenId: request.body.tokenId,
    };
    if (request.body.description) {
        newBody.description = request.body.description;
    }
    if (request.body.imageName) {
        newBody.imageName = request.body.imageName;
    }
    if (request.body.imageData) {
        newBody.imageData = request.body.imageData;
    }
    if (request.body.name) {
        newBody.name = request.body.name;
    }
    if (request.body.country) {
        newBody.country = request.body.country;
    }
    if (request.body.produce) {
        newBody.produce = request.body.produce;
    }
    if (request.body.kmlName) {
        newBody.kmlName = request.body.kmlName;
    }
    if (request.body.kmlData) {
        newBody.kmlData = request.body.kmlData;
    }
    if (request.body.size) {
        newBody.size = request.body.size;
    }

    request.body = newBody;
    next();
}