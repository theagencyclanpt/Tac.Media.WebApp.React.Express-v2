import React from 'react';
import { ApiClient } from "@/ui/client";

const ApiClientContext = React.createContext<ApiClient>(new ApiClient());

export const ApiClientProvider = ApiClientContext.Provider;

export const useApiClient = (): ApiClient => React.useContext<ApiClient>(ApiClientContext);