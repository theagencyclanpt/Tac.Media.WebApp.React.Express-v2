import { Response, Request, NextFunction } from "express";
import { LogicError, UnauthorizedError } from '@/lib/entities';
import { Configurations } from "../configurations";
import JWT from "jsonwebtoken";

export function AuthorizeHandler(request: Request, response: Response, next: NextFunction, configurations: Configurations) {
    switch (configurations.get("AUTH_TYPE")) {
        case "JWT":
            JWTHandler(request, next, configurations);
            break;

        default:
            throw new LogicError("Authencation method not allowable.");
    }
}

function JWTHandler(request: Request, next: NextFunction, configurations: Configurations) {
    const token = request.headers['x-access-token'];
    if (!token) {
        console.log(configurations);
        throw new UnauthorizedError("Unauthorized");
    }

    JWT.verify(token, configurations.get("JWT_SECRET"), function (err, decoded) {
        if (err) {
            throw new UnauthorizedError("Unauthorized");
        }
        next();
    });
}