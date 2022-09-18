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
            query("email").optional().isEmail().withMessage(INVALID_INPUT_TEXT + "email"),
            query("uid").optional().isString().withMessage(INVALID_INPUT_TEXT + "uid"),
            query("address").optional().isString().withMessage(INVALID_INPUT_TEXT + "address")
        ],
        middlewares: [ cleanseInputs],
        service: new GetFarmersService({
            farmerStore: FarmerStore.get()
        })
    });
}


function cleanseInputs(request: Request, response: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newQuery = <any> {};
    if (request.query.email) {
        newQuery.email = request.query.email;
    }
    if (request.query.uid) {
        newQuery.uid = request.query.uid;
    }
    if (request.query.address) {
        newQuery.uid = request.query.uid;
    }

    request.query = newQuery;
    next();
}