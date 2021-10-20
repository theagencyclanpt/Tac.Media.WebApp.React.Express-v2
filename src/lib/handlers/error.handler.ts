import { Response, Request, NextFunction } from "express";
import { ValidationError, LogicError, UnauthorizedError } from '@/lib/entities';

export function ErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    if (error instanceof ValidationError) {
        response.status(error.HTTP_STATUS_CODE).json({
            Title: error.message,
            Values: error.Values
        });

        return;
    } else if (error instanceof LogicError) {
        console.log("LOGIC ERROR");

        response.status(error.HTTP_STATUS_CODE).json({
            Message: error.message
        });

        return;
    } else if (error instanceof UnauthorizedError) {
        response.status(error.HTTP_STATUS_CODE).json({
            Message: error.message
        });

        return;
    }

    response.status(500).json({
        Message: "Ocorreu algum erro desconhecido. Contacte a equipa de suporte."
    });
}