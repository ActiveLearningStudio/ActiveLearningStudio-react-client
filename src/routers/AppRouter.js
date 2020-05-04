import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import PublicRoute from "./PublicRoute";
import LoginPage from "./../containers/LoginPage";

import PlaylistsPage from "../containers/PlaylistsPage";
import EditorPage from "./../containers/EditorPage";
import { TinyEditor } from "../containers/TinyEditor";
import PrivateRoute from "./PrivateRoute";
import H5PPreview from "../containers/H5PPreview";
import { LTIActivityPage } from "../containers/LTIActivityPage";
import { LTIPlaylistPage } from "../containers/LTIPlaylistPage";
import { LTIProgramPage } from "../containers/LTIProgramPage";
import  ProjectsPage  from "../containers/ProjectsPage";
import  PreviewPage  from "../containers/PreviewPage";

const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>

      <PrivateRoute path="/" exact component={ProjectsPage} />
      <PrivateRoute path="/project/preview2/:projectid" component={PreviewPage} />
      <PrivateRoute path="/resource/preview/:resourceid" component={PreviewPage}  previewType="resource" />
      <PrivateRoute path="/playlist/preview/:playlistid" component={PreviewPage}  previewType="playlist" />

      <PrivateRoute path="/project/create" component={ProjectsPage} showCreateProjectPopup={true} />
      <PrivateRoute path="/project/:projectid" exact component={PlaylistsPage} />
      <PrivateRoute path="/project/:projectid/playlist/create" component={PlaylistsPage} openCreatePopup={true} />
      <PrivateRoute path="/project/:projectid/playlist/:playlistid/activity/create" exact component={PlaylistsPage}  openCreateResourcePopup={true} />
      <PrivateRoute path="/activities/:activityid" component={PlaylistsPage} />
      
      
      
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
