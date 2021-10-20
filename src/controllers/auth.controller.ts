import { BaseController } from "@/lib/base.controller";
import { Controller, InjectConfiguration, Post, RequestBody } from "@/lib/decorators";
import JWT from "jsonwebtoken";
import { SigninRequest } from "@/model/SigninRequest";
import { IAuthenticationConfig, LogicError } from "@/lib/entities";
import { UserConfig } from "@/models";
@Controller("/auth")
export class AuthController extends BaseController {

  @InjectConfiguration("AUTH_CONFIG")
  private _authConfig: IAuthenticationConfig;

  @InjectConfiguration("SUPER_ADMIN")
  private _superUser: UserConfig;

  @Post("/signin")
  Signin(@RequestBody { Username, Password }: SigninRequest): string {

    if (Username !== this._superUser.Username) {
      throw new LogicError("Invalid credentials.");
    }

    const token = JWT.sign({ userId: Date.now() }, this._authConfig.JWTSecret, {
      expiresIn: this._authConfig.JWTExpiresIn
    });
    return token;
  }
}