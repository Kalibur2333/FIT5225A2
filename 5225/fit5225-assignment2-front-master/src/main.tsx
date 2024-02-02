import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';

import Login from './pages/login/Login';
import LoginSuccess from './pages/login/LoginSuccess';

// localStorage.clear();

// React fragment or tsx component
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/loginSuccess" component={LoginSuccess} />
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={() =>
            localStorage.getItem('access-token') ? (
              <Home />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
