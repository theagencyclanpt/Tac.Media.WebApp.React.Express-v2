import express, { Application as express_Application } from "express";
import { IAuthenticationConfig, LogicError } from ".";
import { Configurations } from "./configurations";
import { ErrorHandler } from "./handlers/error.handler";

type addApplicationConfigurationArgment = (app: express_Application) => void;
type useConfigurationsArguments = (configProvider: Configurations) => void;

export class Application {
    private _express: express_Application = null;
    private _configurations: Configurations = null;

    constructor() {
        this._express = express();
        this._express.use(express.json({ limit: "150mb" }));
        this._express.use(express.urlencoded({ extended: true, limit: "150mb" }));
    }

    addStaticFiles(path: string) {
        return express.static(path);
    }

    addApplicationConfiguration(configuration: addApplicationConfigurationArgment): this {
        configuration(this._express);
        return this;
    }

    useErrorHandler(): this {
        this._express.use(ErrorHandler);
        return this;
    }

    useConfigurations(...configs: useConfigurationsArguments[]): this {
        if (!this._configurations) {
            this._configurations = new Configurations;
        }

        configs.forEach(config => {
            config(this._configurations);
        });

        return this;
    }

    useJWTAuthentication(jwtSecret: string, expiresIn?: string): this {

        if (!jwtSecret) {
            throw new LogicError("JWT Secret must be defined.");
        }

        if (expiresIn) {
            expiresIn = "1h"
        }

        const authConfigKey = "AUTH_CONFIG";
        let authConfig: IAuthenticationConfig = null;
        try {
            authConfig = this._configurations.get(authConfigKey);
        } catch (error) {
            console.log("Any auth config.");
        }

        if (authConfig) {

            if (authConfig.AuthenticationType) {
                throw new LogicError("The app all ready have a authentication method. " + authConfig.AuthenticationType)
            }

            this._configurations.removeByKey(authConfigKey);
            authConfig.JWTExpiresIn = expiresIn;
            authConfig.JWTSecret = jwtSecret;
            authConfig.AuthenticationType = "JWT";
        } else {
            authConfig = {
                JWTExpiresIn: expiresIn,
                JWTSecret: jwtSecret,
                AuthenticationType: "JWT"
            }
        }

        this.useConfigurations(
            config => config.add(authConfigKey, authConfig),
        );

        return this;
    }

    useControllers(controllers: any[]): this {
        controllers.forEach(controller => {
            const t = new controller;

            if (this._configurations) {
                t["__aplication__configurations"] = this._configurations;
            }

            t.Map(this._express);
        });

        return this;
    }

    listen(port: string): this {
        this._express.listen(port, () => {
            console.log(
                '\x1b[34m',
                `${String.fromCodePoint(
                    0x1f680
                )} Server has started running at http://localhost:${port}/ ${String.fromCodePoint(
                    0x1f680
                )}`
            );
        });
        return this;
    }
}