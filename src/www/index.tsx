import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from "react-router-dom";
import { AuthenticationProvider } from "@/ui/hooks/authentication.hook";
import { ApiClientProvider } from "@/ui/hooks/api-client.hook";
import { ApiClient } from "@/ui/client";
import { GenerateRoutes } from "./_routes";

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider value={{}}>
      <ApiClientProvider value={new ApiClient()}>
        <Router>
          <GenerateRoutes RedirectRoute={"/login"} />
        </Router>
      </ApiClientProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
