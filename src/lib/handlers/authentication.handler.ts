import { Response, Request, NextFunction } from "express";
import { IAuthenticationConfig, LogicError, UnauthorizedError } from '@/lib/entities';
import { BaseController } from "../base.controller";
import JWT from "jsonwebtoken";

export function AuthorizeHandler(request: Request, response: Response, next: NextFunction, context: BaseController) {
    const authenticationConfig = context.getConfigurations().get("AUTH_CONFIG") as IAuthenticationConfig;

    switch (authenticationConfig.AuthenticationType) {
        case "JWT":
            JWTHandler(request, next, context, authenticationConfig);
            break;

        default:
            throw new LogicError("Authencation method not allowable.");
    }
}

function JWTHandler(request: Request, next: NextFunction, context: BaseController, authenticationConfig: IAuthenticationConfig) {
    const token = request.headers['x-access-token'];
    if (!token) {
        throw new UnauthorizedError("Unauthorized");
    }

    JWT.verify(token, authenticationConfig.JWTSecret, function (err, decoded) {
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