import { BaseController } from "@/lib/base.controller";
import { Controller, InjectConfiguration, Post, RequestBody } from "@/lib/decorators";
import JWT from "jsonwebtoken";
import { SigninRequest } from "@/model/SigninRequest";
import { IAuthenticationConfig } from "@/lib/entities";

@Controller("/auth")
export class AuthController extends BaseController {

  @InjectConfiguration("AUTH_CONFIG")
  private _authConfig: IAuthenticationConfig;

  @Post("/signin")
  Signin(@RequestBody { Username, Password }: SigninRequest): string {
    const token = JWT.sign({ userId: Date.now() }, this._authConfig.JWTSecret, {
      expiresIn: this._authConfig.JWTExpiresIn
    });
    return token;
  }
}