import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import PublicRoute from "./PublicRoute";
import LoginPage from "./../containers/LoginPage";

import HomePage from "./../containers/HomePage";
import EditorPage from "./../containers/EditorPage";
import { TinyEditor } from "../containers/TinyEditor";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/playlist/create" render={(props) => <HomePage {...props} openCreatePopup={true} />} />
      <Route path="/playlist/editor/create/question" render={(props) => {
          //do your console log or temporary testing stuff here
          return <HomePage {...props} />
      }} />
      <Route path="/playlist/editor/create" exact component={HomePage} />
      <Route path="/playlist/editor/create/description" exact component={HomePage} />
      <Route path="/playlist/editor" exact component={EditorPage} />
      <Route path="/tiny" exact component={TinyEditor} />
      <PublicRoute path="/signin" component={LoginPage} />
    </Switch>
  </Router>
);

export default AppRouter;
