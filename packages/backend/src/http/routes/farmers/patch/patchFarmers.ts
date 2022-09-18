import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { FarmerStore } from "../../../../storage/farmer/FarmerStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PatchFarmersService } from "./PatchFarmersService";


export function createPatchFarmersRouter(): Router {
    return createRouter({
        method: "patch",
        route: "/farmers",
        inputPath: "body",
        inputChecks: [
            body("uid").isString().withMessage(INVALID_INPUT_TEXT + "uid"),
            body("name").optional().isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("email").optional().isEmail().withMessage(INVALID_INPUT_TEXT + "email")
        ],
        middlewares: [ cleanseInputs ],
        service: new PatchFarmersService({
            farmerStore: FarmerStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newBody = <any> {
        uid: request.body.uid
    };
    if (request.body.name) {
        newBody.name = request.body.name;
    }
    if (request.body.email) {
        newBody.email = request.body.email;
    }

    request.body = newBody;
    next();
}