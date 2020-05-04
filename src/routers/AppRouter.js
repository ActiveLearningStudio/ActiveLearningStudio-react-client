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
      <PrivateRoute path="/project/preview/:projectid" render={(props) => <ProjectsPage {...props} showPreview={props.match.params.projectid} />} />
      <PrivateRoute path="/project/preview2/:projectid" render={(props) => <PreviewPage {...props} />} />

      <PrivateRoute path="/resource/preview/:resourceid" render={(props) => <PreviewPage {...props} key={props.match.params.resourceid} previewType="resource" />} />
      <PrivateRoute path="/playlist/preview/:playlistid" render={(props) => <PreviewPage {...props} previewType="playlist" />} />

      <PrivateRoute path="/project/create" render={(props) => <ProjectsPage {...props} showCreateProjectPopup={true} />} />
      <PrivateRoute path="/project/:projectid" exact component={PlaylistsPage} />
      <PrivateRoute path="/project/:projectid/playlist/create" render={(props) => <PlaylistsPage {...props} openCreatePopup={true} />} />
      <PrivateRoute path="/project/:projectid/playlist/:playlistid/activity/create" exact render={(props) => <PlaylistsPage {...props} openCreateResourcePopup={true} />} />
      <PrivateRoute path="/activities/:activityid" render={(props) => <PlaylistsPage {...props} />} />
      
      
      
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
