import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from "react-router-dom";
import { AuthenticationProvider } from "@/ui/hooks/authentication.hook";
import { GenerateRoutes } from "./_routes";

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationProvider value={{}}>
      <Router>
        <GenerateRoutes RedirectRoute={"/login"} />
      </Router>
    </AuthenticationProvider>
  </React.StrictMode>,
  document.getElementById('app')
);
