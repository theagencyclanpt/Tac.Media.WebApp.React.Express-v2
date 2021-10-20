import { BaseController } from "@/lib/base.controller";
import { Controller, InjectConfiguration, Post } from "@/lib/decorators";
import JWT from "jsonwebtoken";

@Controller("/auth")
export class AuthController extends BaseController {

  @InjectConfiguration("JWT_SECRET")
  private _jwtSecret: string;

  @InjectConfiguration("JWT_EXPIRES_IN")
  private _jwtExpiresIn: string;

  @Post("/signin")
  GetGroupBannerConfiguration(): string {
    const token = JWT.sign({ userId: 1 }, this._jwtSecret, {
      expiresIn: this._jwtExpiresIn
    });
    return token;
  }
}