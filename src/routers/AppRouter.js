import React, { useEffect } from 'react';
import {
  // Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import * as History from 'history';
import loadable from '@loadable/component';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import OpenRoute from './OpenRoute';

const history = History.createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});
const LoginPage = loadable(() => import('../containers/Auth/LoginPage'));
const ProjectShareTemplate = loadable(() => import('../containers/ProjectShareTemplate'));
const SubscribePage = loadable(() => import('../containers/Auth/SubscribePage'));
const RegisterPage = loadable(() => import('../containers/Auth/RegisterPage'));
const ForgotPasswordPage = loadable(() => import('../containers/Auth/ForgotPasswordPage'));
const ResetPasswordPage = loadable(() => import('../containers/Auth/ResetPasswordPage'));
const ConfirmEmailPage = loadable(() => import('../containers/Auth/ConfirmEmailPage'));
const NeafRegister = loadable(() => import('../containers/Auth/NeafRegistration'));
const NeafLogin = loadable(() => import('../containers/Auth/NeafLogin'));
const VevensityRegister = loadable(() => import('../containers/Auth/VevinsityRegistration'));
const VevensityLogin = loadable(() => import('../containers/Auth/VevinsityLogin'));

const ProfilePage = loadable(() => import('../containers/Account/ProfilePage'));
const ChangePasswordPage = loadable(() => import('../containers/Account/ChangePasswordPage'));
const DashboardPage = loadable(() => import('../containers/Dashboard'));
const NotificationPage = loadable(() => import('../containers/Notification'));

const ProjectsPage = loadable(() => import('../containers/Projects'));
const PlaylistsPage = loadable(() => import('../containers/Playlists'));
const PreviewPage = loadable(() => import('../containers/Preview'));
const LtiPreviewPage = loadable(() => import('../containers/LtiPreviewPage'));
const PreviewPageShared = loadable(() => import('../containers/PreviewPageShared'));
const SecureProjectPreview = loadable(() => import('../containers/SecureProjectPreview'));
const SearchResult = loadable(() => import('../containers/Search'));
// const LtiModel = loadable(() => import('../containers/LtiModel'));
// const TeamsPage = loadable(() => import('../containers/Teams'));
// const AddTeamProjectsPage = loadable(() => import('../containers/Teams/AddProjects'));
// const AddTeamProjectMemberPage = loadable(() => import('../containers/Teams/AddMembers'));
const GclassActivityPage = loadable(() => import('../containers/LMS/GoogleClassroom/GclassActivityPage'));
const ActivityCreate = loadable(() => import('../containers/CreateActivity'));
const EditActivity = loadable(() => import('../containers/EditActivity'));
const GclassSummaryPage = loadable(() => import('../containers/LMS/GoogleClassroom/GclassSummaryPage'));
const SearchPage = loadable(() => import('../containers/LMS/Canvas/DeepLinking/SearchPage'));
const LtiActivity = loadable(() => import('../containers/LMS/LTI/Activity'));

const AppRouter = (props) => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });

  if (window.location.href.includes('/shared') || window.location.href.includes('/lti')
    || window.location.href.includes('/embed') || window.location.href.includes('/register')
    || window.location.href.includes('/forgot-password') || window.location.href.includes('gclass/launch')) {
    document.body.classList.add('mobile-responsive');
  }

  const { user } = props;
  return (
    <Router history={history}>
      <Switch>
        <OpenRoute
          exact
          path="/projects/shared"
          component={ProjectShareTemplate}
        />
        <OpenRoute
          exact
          path="/project/:projectId/shared"
          component={PreviewPageShared}
        />
        <OpenRoute
          exact
          path="/project/:projectId/secure/shared"
          component={SecureProjectPreview}
        />
        <OpenRoute
          exact
          path="/lti-tools/activity/:activityId"
          component={LtiActivity}
        />
        <OpenRoute
          exact
          path="/activity/:activityId/shared"
          component={LtiPreviewPage}
          previewType="activityShared"
        />
        <OpenRoute
          exact
          path="/h5p/embed/:activityId"
          component={LtiPreviewPage}
          previewType="activitySharedEmbed"
        />
        <OpenRoute
          exact
          path="/lti/content/:lmsUrl/:ltiClientId/:redirectUrl"
          // component={LtiModel}
          component={SearchPage}
        />
        <OpenRoute
          exact
          path="/gclass/launch/:userId/:courseId/:activityId/:classworkId"
          component={GclassActivityPage}
        />
        <OpenRoute
          exact
          path="/gclass/summary/:userId/:courseId/:activityId/:gClassworkId/:submissionId"
          component={GclassSummaryPage}
        />
        <OpenRoute
          path="/playlist/:playlistId/activity/:activityId/preview/lti"
          exact
          component={LtiPreviewPage}
          previewType="playlist"
        />
        <OpenRoute
          exact
          path="/playlist/:playlistId/preview/lti"
          component={LtiPreviewPage}
          previewType="playlist"
        />
        <PrivateRoute
          exact
          path="/project/:projectId/playlist/:playlistId/activity/:activityId/preview"
          component={PreviewPage}
          previewType="playlist"
        />

        <OpenRoute
          exact
          path="/lti-tools/activity/:activityId"
          component={LtiActivity}
        />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/register" component={RegisterPage} />
        <PublicRoute exact path="/forgot-password" component={ForgotPasswordPage} />
        <PublicRoute exact path="/reset-password" component={ResetPasswordPage} />
        <PublicRoute exact path="/verify-email" component={ConfirmEmailPage} />
        <PublicRoute exact path="/neaf-register" component={NeafRegister} />
        <PublicRoute exact path="/neaf-login" component={NeafLogin} />
        <PublicRoute exact path="/nevada-register" component={VevensityRegister} />
        <PublicRoute exact path="/nevada-login" component={VevensityLogin} />
        <Route>
          {
           (user && !user.subscribed)
             ? <SubscribePage />
             : (
               <>
                 <Header />
                 <div className="main-content-wrapper">
                   <div className="sidebar-wrapper">
                     <Sidebar />
                   </div>
                   <Switch>
                     <PrivateRoute exact path="/" component={ProjectsPage} />
                     <PrivateRoute exact path="/account" component={ProfilePage} />
                     <PrivateRoute exact path="/change-password" component={ChangePasswordPage} />

                     <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                     <PrivateRoute exact path="/notification" component={NotificationPage} />

                     {/* <PrivateRoute exact path="/teams" component={TeamsPage} overview />
                     <PrivateRoute exact path="/teams/create-team" component={TeamsPage} creation />
                     <PrivateRoute exact path="/teams/:teamId" component={TeamsPage} teamShow />
                     <PrivateRoute exact path="/teams/:teamId/projects" component={TeamsPage} projectShow />
                     <PrivateRoute exact path="/teams/:teamId/channel" component={TeamsPage} channelShow />
                     <PrivateRoute exact path="/teams/:teamId/add-projects" component={AddTeamProjectsPage} />
                     <PrivateRoute exact path="/teams/:teamId/projects/:projectId/add-member" component={AddTeamProjectMemberPage} /> */}

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
                       path="/project/:projectId/playlist/:playlistId/activity/create"
                       component={ActivityCreate}
                       // openCreateResourcePopup
                     />
                     <PrivateRoute
                       exact
                       path="/project/:projectId/playlist/:playlistId/activity/:activityId/edit"
                       component={EditActivity}
                       openEditResourcePopup
                     />

                     <PrivateRoute
                       exact
                       path="/search"
                       component={SearchResult}
                     />
                     <Redirect to="/" />
                   </Switch>
                 </div>
               </>
             )
           }
        </Route>
      </Switch>
    </Router>
  );
};
AppRouter.propTypes = {
  user: PropTypes.object,
};
AppRouter.defaultProps = {
  user: null,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(AppRouter);
