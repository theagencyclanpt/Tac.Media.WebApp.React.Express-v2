import { Response, Request, NextFunction } from "express";
import { LogicError, UnauthorizedError } from '@/lib/entities';
import { Configurations } from "../configurations";
import { BaseController } from "../base.controller";
import JWT from "jsonwebtoken";

export function AuthorizeHandler(request: Request, response: Response, next: NextFunction, configurations: Configurations, context: BaseController) {
    switch (configurations.get("AUTH_TYPE")) {
        case "JWT":
            JWTHandler(request, next, configurations, context);
            break;

        default:
            throw new LogicError("Authencation method not allowable.");
    }
}

function JWTHandler(request: Request, next: NextFunction, configurations: Configurations, context: BaseController) {
    const token = request.headers['x-access-token'];
    if (!token) {
        console.log(configurations);
        throw new UnauthorizedError("Unauthorized");
    }

    JWT.verify(token, configurations.get("JWT_SECRET"), function (err, decoded) {
        context.User = {
            Token: token,
            UserId: decoded.userId
        };
        if (err) {
            throw new UnauthorizedError("Unauthorized");
        }
        next();
    });
}