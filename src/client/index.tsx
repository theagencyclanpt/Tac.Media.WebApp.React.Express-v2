import React from 'react';
import ReactDOM from 'react-dom';
import Pages from "./pages";
import {
  HashRouter as Router,
  Route,
} from "react-router-dom";

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function GenerateRoutes() {
  const child: JSX.Element[] = [];
  Pages.map((page, index) => {
    child.push(
      (<Route path={page.route} exact key={index} component={page.component} />)
    );
  });

  return (<>
    {child}
  </>);
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GenerateRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById('app')
);
