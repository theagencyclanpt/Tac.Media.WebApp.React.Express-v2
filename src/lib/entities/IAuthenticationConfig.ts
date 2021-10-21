export type AuthenticationType = "JWT";

export interface IAuthenticationConfig {
  JWTSecret: string,
  JWTExpiresIn: string,
  AuthenticationType: AuthenticationType
}