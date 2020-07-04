import React from 'react';
import { Router, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import { history } from 'store';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const ProjectsPage = loadable(() => import('../containers/ProjectsPage'));
const PlaylistsPage = loadable(() => import('../containers/PlaylistsPage'));
const PreviewPage = loadable(() => import('../containers/PreviewPage'));
const LoginPage = loadable(() => import('../containers/Auth/LoginPage'));
const RegisterPage = loadable(() => import('../containers/Auth/RegisterPage'));

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/" exact component={ProjectsPage} />

      <PrivateRoute
        exact
        path="/project/preview2/:projectid"
        component={PreviewPage}
      />
      <PrivateRoute
        exact
        path="/resource/preview/:resourceid"
        component={PreviewPage}
        previewType="resource"
      />
      <PrivateRoute
        exact
        path="/playlist/preview/:playlistid/resource/:resourceid"
        component={PreviewPage}
        previewType="playlist"
      />

      <PrivateRoute
        exact
        path="/project/create"
        component={ProjectsPage}
        id="create-project"
        showCreateProjectPopup
        editMode={false}
      />
      <PrivateRoute
        exact
        path="/project/create/:projectid"
        component={ProjectsPage}
        showEditProjectPopup
        editMode
      />

      <PrivateRoute
        exact
        path="/project/:projectid"
        component={PlaylistsPage}
      />
      <PrivateRoute
        exact
        path="/project/:projectid/playlist/create"
        component={PlaylistsPage}
        openCreatePopup
      />
      <PrivateRoute
        exact
        path="/project/:projectid/playlist/:playlistid/activity/create/:activityid"
        component={PlaylistsPage}
        openEditResourcePopup
      />
      <PrivateRoute
        exact
        path="/project/:projectid/playlist/:playlistid/activity/create"
        component={PlaylistsPage}
        openCreateResourcePopup
      />

      <PrivateRoute exact path="/activities/:activityid" component={PlaylistsPage} />

      <PublicRoute exact path="/login" component={LoginPage} />
      <PublicRoute exact path="/register" component={RegisterPage} />
    </Switch>
  </Router>
);

export default AppRouter;
