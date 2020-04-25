import React from "react";
import { BrowserRouter, HashRouter as Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import PublicRoute from "./PublicRoute";
import LoginPage from "./../containers/LoginPage";

import HomePage from "./../containers/HomePage";
import EditorPage from "./../containers/EditorPage";
import { TinyEditor } from "../containers/TinyEditor";
import PrivateRoute from "./PrivateRoute";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/" exact component={HomePage} />
      <Route path="/playlist/create" render={(props) => <HomePage {...props} openCreatePopup={true} />} />
      {/* <Route path="/playlist/activity/create/question" render={(props) => {
          //do your console log or temporary testing stuff here
          return <HomePage {...props} />
      }} /> */}
      <Route path="/playlist/activity/create/:id" exact component={HomePage} />
      {/* <Route path="/playlist/activity/create/description" exact component={HomePage} /> */}
      {/* <Route path="/playlist/activity" exact component={EditorPage} /> */}
      <Route path="/tiny" exact component={TinyEditor} />
      <PublicRoute path="/login" component={LoginPage} />
    </Switch>
  </Router>
);

export default AppRouter;
