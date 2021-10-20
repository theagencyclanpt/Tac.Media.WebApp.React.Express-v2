import { Response, Request, NextFunction } from "express";
import { LogicError, UnauthorizedError } from '@/lib/entities';
import { BaseController } from "../base.controller";
import JWT from "jsonwebtoken";

export function AuthorizeHandler(request: Request, response: Response, next: NextFunction, context: BaseController) {
    switch (context.getConfigurations().get("AUTH_TYPE")) {
        case "JWT":
            JWTHandler(request, next, context);
            break;

        default:
            throw new LogicError("Authencation method not allowable.");
    }
}

function JWTHandler(request: Request, next: NextFunction, context: BaseController) {
    const token = request.headers['x-access-token'];
    if (!token) {
        throw new UnauthorizedError("Unauthorized");
    }

    JWT.verify(token, context.getConfigurations().get("JWT_SECRET"), function (err, decoded) {
        if (err) {
            throw new UnauthorizedError("Unauthorized");
        }
        context.User = {
            Token: token,
            UserId: decoded.userId
        };
        next();
    });
}