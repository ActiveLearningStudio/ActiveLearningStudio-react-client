import React from "react";
import { Router, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import loadable from '@loadable/component'

import PublicRoute from "./PublicRoute";
import LoginPage from "./../containers/LoginPage";



import PrivateRoute from "./PrivateRoute";


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
      
      <PrivateRoute path="/project/:projectid/playlist/:playlistid/activity/create/:activityid" exact component={PlaylistsPage} openEditResourcePopup={true}/>
      <PrivateRoute path="/project/:projectid" exact component={PlaylistsPage} />
      <PrivateRoute path="/project/:projectid/playlist/create" exact component={PlaylistsPage} openCreatePopup={true} />
      <PrivateRoute path="/project/:projectid/playlist/:playlistid/activity/create" exact component={PlaylistsPage}  openCreateResourcePopup={true} />
      <PrivateRoute path="/activities/:activityid" exact component={PlaylistsPage} />
      
      <PublicRoute path="/login" component={LoginPage} />
    </Switch>
  </Router>
);

export default AppRouter;
