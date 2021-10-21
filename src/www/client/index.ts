import axios, { Axios } from "axios";
import { AuthenticationApiClient } from "./authentication.api.client";

//TODO: create error handler for client side
export class ApiClient {
  private _axios: Axios;

  constructor() {
    this._axios = axios;
    this._axios.defaults.baseURL = "/api"

    this.Authentication = new AuthenticationApiClient(this._axios);
  }

  public Authentication: AuthenticationApiClient;
}