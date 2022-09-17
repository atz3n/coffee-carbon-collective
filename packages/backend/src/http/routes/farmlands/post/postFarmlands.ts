import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { Contracts } from "../../../../contract/Contracts";
import { EnvVars } from "../../../../lib/EnvVars";
import { IpfsStorer } from "../../../../lib/IpfsStorer";
import { FarmerStore } from "../../../../storage/farmer/FarmerStore";
import { FarmlandStore } from "../../../../storage/farmland/FarmlandStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostFarmlandsService } from "./PostFarmlandsService";


export function createPostFarmlandsRouter(): Router {
    return createRouter({
        method: "post",
        route: "/farmlands",
        inputPath: "body",
        inputChecks: [
            body("owner").isString().withMessage(INVALID_INPUT_TEXT + "owner"),
            body("description").isString().withMessage(INVALID_INPUT_TEXT + "description"),
            body("imageName").isString().withMessage(INVALID_INPUT_TEXT + "imageName"),
            body("imageData").isString().withMessage(INVALID_INPUT_TEXT + "imageData"),
            body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("country").isString().withMessage(INVALID_INPUT_TEXT + "country"),
            body("produce").isString().withMessage(INVALID_INPUT_TEXT + "produce"),
            body("kmlName").isString().withMessage(INVALID_INPUT_TEXT + "kmlName"),
            body("kmlData").isString().withMessage(INVALID_INPUT_TEXT + "kmlData"),
            body("size").isNumeric().withMessage(INVALID_INPUT_TEXT + "size"),
            body("altitude").isNumeric().withMessage(INVALID_INPUT_TEXT + "altitude"),
            body("longitude").isNumeric().withMessage(INVALID_INPUT_TEXT + "longitude"),
            body("latitude").isNumeric().withMessage(INVALID_INPUT_TEXT + "latitude")
        ],
        middlewares: [ cleanseInputs ],
        service: new PostFarmlandsService({
            farmlandStore: FarmlandStore.get(),
            farmerStore: FarmerStore.get(),
            farmlandRegistry: Contracts.getFarmlandRegistry(),
            ipfsStorer: new IpfsStorer({
                authToken: EnvVars.NFT_STORAGE_TOKEN
            })
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody = {
        owner: request.body.owner,
        description: request.body.description,
        imageName: request.body.imageName,
        imageData: request.body.imageData,
        name: request.body.name,
        country: request.body.country,
        produce: request.body.produce,
        size: request.body.size,
        altitude: request.body.altitude,
        kmlImageName: request.body.kmlImageName,
        kmlImageData: request.body.kmlImageData,
        longitude: request.body.longitude,
        latitude: request.body.latitude
    };

    request.body = newBody;
    next();
}