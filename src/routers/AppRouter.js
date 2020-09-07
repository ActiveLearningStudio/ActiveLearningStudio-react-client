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
const DashboardPage = loadable(() => import('../containers/Dashboard'));

const ProjectsPage = loadable(() => import('../containers/Projects'));
const PlaylistsPage = loadable(() => import('../containers/Playlists'));
const PreviewPage = loadable(() => import('../containers/Preview'));
const LtiPreviewPage = loadable(() => import('../containers/LtiPreviewPage'));
const PreviewPageShared = loadable(() => import('../containers/PreviewPageShared'));
const SearchResult = loadable(() => import('../containers/Search'));
const LtiModel = loadable(() => import('../containers/LtiModel'));

const AppRouter = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/projects" component={ProjectsPage} />

        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PublicRoute exact path="/forgot-password" component={ForgotPasswordPage} />
        <PublicRoute exact path="/reset-password" component={ResetPasswordPage} />
        <PublicRoute exact path="/verify-email" component={ConfirmEmailPage} />

        <PrivateRoute exact path="/account" component={ProfilePage} />

        <PrivateRoute exact path="/" component={DashboardPage} />
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
          path="/project/:projectId/shared"
          component={PreviewPageShared}
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
        {/*
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/preview/lti"
          component={LtiPreviewPage}
          previewType="playlist"
        />
        */}

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
          path="/project/:projectId/playlist/:playlistId/activity/:activityId/preview"
          component={PreviewPage}
          previewType="playlist"
        />
        {/*
        <PrivateRoute
          path="/project/:projectId/playlist/:playlistId/activity/:activityId/preview/lti"
          exact
          component={LtiPreviewPage}
          previewType="playlist"
        />
        */}
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/activity/:activityId/preview/shared"
          component={LtiPreviewPage}
          previewType="playlistShared"
        />

        <PrivateRoute
          exact
          path="/activities/:activityId"
          component={PlaylistsPage}
        />
        <PrivateRoute
          exact
          path="/activities/:activityId/preview"
          component={PreviewPage}
          previewType="activity"
        />
        {/*
        <PrivateRoute
          exact
          path="/activities/:activityId/preview/lti"
          component={LtiPreviewPage}
          previewType="activitySharedLti"
        />
        */}
        <OpenRoute
          exact
          path="/activity/:activityId/shared"
          component={LtiPreviewPage}
          previewType="activityShared"
        />
         <OpenRoute
          exact
          path="/lti/content/:lms_url/:lti_client_id/:redirect_url"
          component={LtiModel}
        />

        <PrivateRoute
          exact
          path="/search"
          component={SearchResult}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
