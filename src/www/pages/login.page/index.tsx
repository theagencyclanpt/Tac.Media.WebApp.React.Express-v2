import React from 'react';
import { useAuthentication } from '@/ui/hooks/authentication.hook';
import { useApiClient } from '@/ui/hooks/api-client.hook';
import { SigninRequest } from '@/ui/client/models';

export function LoginPage(): JSX.Element {
  const auth = useAuthentication();
  const apiClient = useApiClient();

  async function onLogin() {
    const result = await apiClient.Authentication.Signin(new SigninRequest("admin", "teste123"));
    auth.SetToken(result.Token);
  }

  return (
    <div>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}
