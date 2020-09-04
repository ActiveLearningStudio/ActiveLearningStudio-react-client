import React, { useEffect } from 'react';
import {
  // Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import * as History from 'history';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import OpenRoute from './OpenRouter';

const history = History.createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const LoginPage = loadable(() => import('../containers/Auth/LoginPage'));
const RegisterPage = loadable(() => import('../containers/Auth/RegisterPage'));
const ForgotPasswordPage = loadable(() => import('../containers/Auth/ForgotPasswordPage'));
const ResetPasswordPage = loadable(() => import('../containers/Auth/ResetPasswordPage'));
const ConfirmEmailPage = loadable(() => import('../containers/Auth/ConfirmEmailPage'));

const ProfilePage = loadable(() => import('../containers/Account/ProfilePage'));

const ProjectsPage = loadable(() => import('../containers/Projects'));
const PlaylistsPage = loadable(() => import('../containers/Playlists'));
const PreviewPage = loadable(() => import('../containers/Preview'));
// const LtiPreviewPage = loadable(() => import('../containers/LtiPreviewPage'));
// const PreviewPageShared = loadable(() => import('../containers/PreviewPageShared'));
const SearchResult = loadable(() => import('../containers/Search'));

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
        <PublicRoute exact path="/verify-email" component={ConfirmEmailPage} />

        <PrivateRoute exact path="/account" component={ProfilePage} />

        {/*
        <Route
          exact
          path="/project/shared/:projectId"
          component={PreviewPageShared}
        />
        <PrivateRoute
          exact
          path="/activity/:activityId/preview"
          component={PreviewPage}
          previewType="resource"
        />
        <Route
          exact
          path="/playlist/lti/preview/:playlistId"
          component={LtiPreviewPage}
          previewType="playlist"
        />
        <Route
          path="/shared/activity/:activityId"
          component={LtiPreviewPage}
          exact
        />
        <Route
          path="/shared/activity/:activityId"
          exact
          render={() => <LtiPreviewPage previewType="activityShared" />}
        />
        <Route
          path="/playlist/lti/preview/:playlistId/activity/:activityId"
          exact
          component={LtiPreviewPage}
          previewType="playlist"
        />
        <Route
          path="/playlist/shared/preview/:playlistId/activity/:activityId"
          exact
          render={() => <LtiPreviewPage previewType="playlistShared" />}
        />
        */}

        <PrivateRoute
          exact
          path="/project/create"
          component={ProjectsPage}
          showCreateProjectPopup
          editMode={false}
        />
        <PrivateRoute
          exact
          path="/project/:projectId"
          component={PlaylistsPage}
        />
        <PrivateRoute
          exact
          path="/project/:projectId/preview"
          component={PreviewPage}
        />
        <PrivateRoute
          exact
          path="/project/:projectId/edit"
          component={ProjectsPage}
          showEditProjectPopup
          editMode
        />

        <PrivateRoute
          exact
          path="/project/:projectId/playlist/create"
          component={PlaylistsPage}
          openCreatePopup
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/preview"
          component={PreviewPage}
          previewType="playlist"
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/activity/create"
          component={PlaylistsPage}
          openCreateResourcePopup
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/activity/:activityId/edit"
          component={PlaylistsPage}
          openEditResourcePopup
        />

        <PrivateRoute
          exact
          path="/activities/:activityId"
          component={PlaylistsPage}
        />
        <PrivateRoute
          exact
          path="/playlist/:playlistId/activity/:activityId/preview"
          component={PreviewPage}
          previewType="resource"
        />
        <PrivateRoute
          exact
          path="/search"
          component={SearchResult}
        />
        <OpenRoute
          path="/shared/activity/:activityId"
          exact
          previewType="activityShared"
          component={PreviewPage}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
