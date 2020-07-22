import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import * as History from 'history';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const history = History.createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const LoginPage = loadable(() => import('../containers/Auth/LoginPage'));
const RegisterPage = loadable(() => import('../containers/Auth/RegisterPage'));
const ForgotPasswordPage = loadable(() => import('../containers/Auth/ForgotPasswordPage'));
const ResetPasswordPage = loadable(() => import('../containers/Auth/ResetPasswordPage'));

const ProfilePage = loadable(() => import('../containers/Account/ProfilePage'));

const ProjectsPage = loadable(() => import('../containers/ProjectsPage'));
const PlaylistsPage = loadable(() => import('../containers/PlaylistsPage'));
const PreviewPage = loadable(() => import('../containers/PreviewPage'));
const LtiPreviewPage = loadable(() => import('../containers/LtiPreviewPage'));
const PreviewPageShared = loadable(() => import('../containers/PreviewPageShared'));

const AppRouter = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={ProjectsPage} />

        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PublicRoute exact path="/forgot-password" component={ForgotPasswordPage} />
        <PublicRoute exact path="/reset-password" component={ResetPasswordPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />

        <PrivateRoute exact path="/account" component={ProfilePage} />

        <PrivateRoute
          exact
          path="/project/preview2/:projectId"
          component={PreviewPage}
        />

        <Route
          exact
          path="/project/shared/:projectId"
          component={PreviewPageShared}
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

        <Route
          exact
          path="/playlist/lti/preview/:playlistId"
          component={LtiPreviewPage}
          previewType="playlist"
        />

        <Route
          path="/playlist/lti/preview/:playlistId/resource/:resourceId"
          exact
          component={LtiPreviewPage}
          previewType="playlist"
        />

        <Route
          path="/playlist/shared/preview/:playlistId/resource/:resourceId"
          exact
          render={() => <LtiPreviewPage previewType="playlistShared" />}
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
      </Switch>
    </Router>
  );
};

export default AppRouter;
