import { IResult, SigninRequest, SigninResponse } from "@/ui/client/models";
import { Axios } from "axios";

export class AuthenticationApiClient {
  private _axios: Axios;

  constructor(axios: Axios) {
    this._axios = axios;
    this._axios.defaults.baseURL = this._axios.defaults.baseURL + "/auth"
  }

  async Signin({ Username, Password }: SigninRequest): Promise<SigninResponse> {
    try {
      const response = await this._axios.post<IResult<string>>('/signin', {
        Username: Username,
        Password: Password
      });

      const resultValue = new SigninResponse();
      resultValue.Token = response.data.result;
      return resultValue;
    } catch (error) {
      console.error(error);
    }
  }
}