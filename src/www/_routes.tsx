/* eslint-disable react/display-name */
import React from 'react';
import {
  Redirect,
  Route
} from "react-router-dom";
import { useAuthentication } from "@/ui/hooks/authentication.hook";
import Pages from "./pages";

export interface GenerateRoutesProps {
  RedirectRoute: string;
}

export function GenerateRoutes({ RedirectRoute }: GenerateRoutesProps): JSX.Element {
  const routes: JSX.Element[] = [];

  Pages.map((page, index) => {
    routes.push(
      (<Route path={page.route} exact key={index} component={() => {
        const auth = useAuthentication();
        if (page.isProtected && !auth.Token) {
          return <Redirect to={{ pathname: RedirectRoute }} />;
        } else {
          return page.component;
        }
      }} />)
    );
  });

  return (<>
    {routes}
  </>);
}
