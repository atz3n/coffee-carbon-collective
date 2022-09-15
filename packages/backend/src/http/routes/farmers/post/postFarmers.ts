import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { FarmerStore } from "../../../../storage/farmer/FarmerStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { PostFarmersService } from "./PostFarmersService";


export function createPostFarmersRouter(): Router {
    return createRouter({
        method: "post",
        route: "/farmers",
        inputPath: "body",
        inputChecks: [
            body("address").isEthereumAddress().withMessage(INVALID_INPUT_TEXT + "address"),
            body("name").isString().withMessage(INVALID_INPUT_TEXT + "name"),
            body("email").isEmail().withMessage(INVALID_INPUT_TEXT + "email")
        ],
        middlewares: [ cleanseInputs],
        service: new PostFarmersService({
            farmerStore: FarmerStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newBody = {
        address: request.body.address,
        name: request.body.name,
        email: request.body.email
    };

    request.body = newBody;
    next();
}