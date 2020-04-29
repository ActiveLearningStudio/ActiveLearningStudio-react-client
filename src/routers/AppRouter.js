import React from "react";
import { BrowserRouter, HashRouter as Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import PublicRoute from "./PublicRoute";
import LoginPage from "./../containers/LoginPage";

import HomePage from "./../containers/HomePage";
import EditorPage from "./../containers/EditorPage";
import { TinyEditor } from "../containers/TinyEditor";
import PrivateRoute from "./PrivateRoute";
import H5PPreview from "../containers/H5PPreview";
import { LTIActivityPage } from "../containers/LTIActivityPage";
import { LTIPlaylistPage } from "../containers/LTIPlaylistPage";
import { LTIProgramPage } from "../containers/LTIProgramPage";
import  ProjectsPage  from "../containers/ProjectsPage";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/" exact component={ProjectsPage} />
      <Route path="/project/preview/:projectid" render={(props) => <ProjectsPage {...props} showPreview={props.match.params.projectid} />} />
      <Route path="/project/create" render={(props) => <ProjectsPage {...props} showCreateProjectPopup={true} />} />
      <Route path="/project/:projectid" exact component={HomePage} />
      <Route path="/project/:projectid/playlist/create" render={(props) => <HomePage {...props} openCreatePopup={true} />} />
      <Route path="/project/:projectid/playlist/:playlistid/activity/create" exact render={(props) => <HomePage {...props} openCreateResourcePopup={true} />} />

      
      
      
      <Route path="/lti-activity/:id/:launchid" exact component={LTIActivityPage} />
      <Route path="/lti-playlist/:id/:launchid" exact component={LTIPlaylistPage} />
      <Route path="/lti-program/:id/:launchid" exact component={LTIProgramPage} />
      <Route path="/tiny" exact component={TinyEditor} />
      <Route path="/h5p-preview" exact component={H5PPreview} />
      <PublicRoute path="/login" component={LoginPage} />
    </Switch>
  </Router>
);

export default AppRouter;
