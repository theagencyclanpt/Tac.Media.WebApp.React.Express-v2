import { useAuthentication } from '@/ui/hooks/authentication.hook';
import React from 'react';

export function LoginPage(): JSX.Element {
  const auth = useAuthentication();

  function onLogin() {
    auth.UserId = 123;
  }

  return (
    <div>
      <button onClick={onLogin}>Login</button>
    </div>
  );
}
