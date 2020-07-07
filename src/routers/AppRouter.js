import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import * as History from 'history';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';

import LoginPage from 'containers/Auth/LoginPage';
import RegisterPage from 'containers/Auth/RegisterPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const history = History.createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const ProjectsPage = loadable(() => import('../containers/ProjectsPage'));
const PlaylistsPage = loadable(() => import('../containers/PlaylistsPage'));
const PreviewPage = loadable(() => import('../containers/PreviewPage'));
const LtiPreviewPage = loadable(() => import('../containers/LtiPreviewPage'));
// const LoginPage = loadable(() => import('../containers/Auth/LoginPage'));
// const RegisterPage = loadable(() => import('../containers/Auth/RegisterPage'));

const AppRouter = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={ProjectsPage} />

        <PrivateRoute
          exact
          path="/project/preview2/:projectId"
          component={PreviewPage}
        />

        <PrivateRoute
          exact
          path="/resource/preview/:resourceId"
          component={PreviewPage}
          previewType="resource"
        />

        <PrivateRoute
          exact
          path="/playlist/preview/:playlistId/resource/:resourceId"
          component={PreviewPage}
          previewType="playlist"
        />

        <PrivateRoute
          exact
          path="/playlist/lti/preview/:playlistId"
          component={LtiPreviewPage}
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
          path="/project/create/:projectId"
          component={ProjectsPage}
          showEditProjectPopup
          editMode
        />
        <PrivateRoute
          exact
          path="/project/:projectId"
          component={PlaylistsPage}
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/create"
          component={PlaylistsPage}
          openCreatePopup
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/activity/create"
          component={PlaylistsPage}
          openCreateResourcePopup
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/activity/create/:activityId"
          component={PlaylistsPage}
          openEditResourcePopup
        />

        <PrivateRoute
          exact
          path="/activities/:activityId"
          component={PlaylistsPage}
        />

        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
