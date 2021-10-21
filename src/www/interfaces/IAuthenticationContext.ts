export interface IAuthenticationContext {
  Token?: string;
  SetToken: (token: string) => void;
}