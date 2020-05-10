import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import loadable from '@loadable/component'

import PublicRoute from "./PublicRoute";
import LoginPage from "./../containers/LoginPage";

// import PlaylistsPage from "../containers/PlaylistsPage";
import EditorPage from "./../containers/EditorPage";
import { TinyEditor } from "../containers/TinyEditor";
import PrivateRoute from "./PrivateRoute";
import H5PPreview from "../containers/H5PPreview";
import { LTIActivityPage } from "../containers/LTIActivityPage";
import { LTIPlaylistPage } from "../containers/LTIPlaylistPage";
import { LTIProgramPage } from "../containers/LTIProgramPage";
// import  ProjectsPage  from "../containers/ProjectsPage";
// import  PreviewPage  from "../containers/PreviewPage";

const history = createBrowserHistory();

const ProjectsPage = loadable(() => import('../containers/ProjectsPage'));
const PlaylistsPage = loadable(() => import('../containers/PlaylistsPage'));
const PreviewPage = loadable(() => import('../containers/PreviewPage'));


const AppRouter = () => (
  <Router history={history}>
    <Switch>

      <PrivateRoute path="/" exact component={ProjectsPage} />
      <PrivateRoute path="/project/preview2/:projectid" exact component={PreviewPage} />
      <PrivateRoute path="/resource/preview/:resourceid" exact component={PreviewPage}  previewType="resource" />
      <PrivateRoute path="/playlist/preview/:playlistid" exact component={PreviewPage}  previewType="playlist" />

      <PrivateRoute path="/project/create/:projectid" component={ProjectsPage} showEditProjectPopup={true} editMode={true} />
      <PrivateRoute path="/project/create" exact component={ProjectsPage} showCreateProjectPopup={true} editMode={false} />
      
      <PrivateRoute path="/project/:projectid/playlist/:playlistid/activity/create/:activityid" exact component={PlaylistsPage} openCreateResourcePopup={true} editResourcePopup = {true} />
      <PrivateRoute path="/project/:projectid" exact component={PlaylistsPage} />
      <PrivateRoute path="/project/:projectid/playlist/create" exact component={PlaylistsPage} openCreatePopup={true} />
      <PrivateRoute path="/project/:projectid/playlist/:playlistid/activity/create" exact component={PlaylistsPage}  openCreateResourcePopup={true} />
      <PrivateRoute path="/activities/:activityid" exact component={PlaylistsPage} />
      
      
      
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
