export class SigninRequest {
  public Username: string;
  public Password: string;


  constructor(Username: string, Password: string) {
    this.Username = Username
    this.Password = Password
  }
}