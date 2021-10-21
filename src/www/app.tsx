import React from 'react';
import {
  HashRouter as Router,
} from "react-router-dom";
import { AuthenticationProvider } from "@/ui/hooks/authentication.hook";
import { ApiClientProvider } from "@/ui/hooks/api-client.hook";
import { useLocalStorage } from "@/ui/hooks/persist.localstorage.hook";
import { ApiClient } from "@/ui/client";
import { GenerateRoutes } from "./_routes";

export function App(): JSX.Element {
  const [auth, setAuth] = useLocalStorage("auth", null);

  return (
    <AuthenticationProvider value={{
      Token: auth,
      SetToken: setAuth
    }}>
      <ApiClientProvider value={new ApiClient()}>
        <Router>
          <GenerateRoutes RedirectRoute={"/login"} />
        </Router>
      </ApiClientProvider>
    </AuthenticationProvider>
  );
}