import { NextFunction, Request, Response, Router } from "express";
import { query } from "express-validator";
import { FarmerStore } from "../../../../storage/farmer/FarmerStore";
import { INVALID_INPUT_TEXT } from "../../../constants";
import { createRouter } from "../../../routerFactory";
import { GetFarmersService } from "./GetFarmersService";


export function createGetFarmersRouter(): Router {
    return createRouter({
        method: "get",
        route: "/farmers",
        inputPath: "query",
        inputChecks: [
            query("email").isEmail().withMessage(INVALID_INPUT_TEXT + "email")
        ],
        middlewares: [ cleanseInputs],
        service: new GetFarmersService({
            farmerStore: FarmerStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    const newQuery = {
        email: request.query.email
    };

    request.query = newQuery;
    next();
}