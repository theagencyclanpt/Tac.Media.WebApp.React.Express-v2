import React from 'react';
import { IAuthenticationContext } from "@/ui/interfaces";

const AuthenticationContext = React.createContext<IAuthenticationContext>({});

export const AuthenticationProvider = AuthenticationContext.Provider;

export const useAuthentication = (): IAuthenticationContext => React.useContext<IAuthenticationContext>(AuthenticationContext);