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
const AdminPanel = loadable(() => import('../containers/Admin'));
const LtiLogin = loadable(() => import('../containers/Auth/LtiLogin'));
const ProfilePage = loadable(() => import('../containers/Account/ProfilePage'));
const ChangePasswordPage = loadable(() => import('../containers/Account/ChangePasswordPage'));
// const DashboardPage = loadable(() => import('../containers/Dashboard'));
const NotificationPage = loadable(() => import('../containers/Notification'));

const ProjectsPage = loadable(() => import('../containers/Projects'));
const PlaylistsPage = loadable(() => import('../containers/Playlists'));
const PreviewPage = loadable(() => import('../containers/Preview'));
const LtiPreviewPage = loadable(() => import('../containers/LtiPreviewPage'));
const PreviewPageShared = loadable(() => import('../containers/PreviewPageShared'));
const SecureProjectPreview = loadable(() => import('../containers/SecureProjectPreview'));
const SearchResult = loadable(() => import('../containers/Search'));
const Searchnetlify = loadable(() => import('../containers/Search/SearchNetlify'));
// const LtiModel = loadable(() => import('../containers/LtiModel'));
const TeamsPage = loadable(() => import('../containers/Teams'));
const AddTeamProjectsPage = loadable(() => import('../containers/Teams/AddProjects'));
const AddTeamProjectMemberPage = loadable(() => import('../containers/Teams/AddMembers'));
// const GroupsPage = loadable(() => import('../containers/Groups'));
// const AddGroupProjectsPage = loadable(() => import('../containers/Groups/AddProjects'));
// const AddGroupProjectMemberPage = loadable(() => import('../containers/Groups/AddMembers'));
const GclassActivityPage = loadable(() => import('../containers/LMS/GoogleClassroom/GclassActivityPage'));
const GenericLMSActivityPage = loadable(() => import('../containers/LMS/Generic/GenericLMSActivityPage'));
const ActivityCreate = loadable(() => import('../containers/CreateActivity'));
const EditActivity = loadable(() => import('../containers/EditActivity'));
const GclassSummaryPage = loadable(() => import('../containers/LMS/GoogleClassroom/GclassSummaryPage'));
const CanvasSummaryPage = loadable(() => import('../containers/LMS/Canvas/CanvasSummaryPage'));
const SearchPage = loadable(() => import('../containers/LMS/Canvas/DeepLinking/SearchPage'));
const LtiActivity = loadable(() => import('../containers/LMS/LTI/Activity'));
const ManageOrganization = loadable(() => import('../containers/ManageOrganization'));
const SSOLogin = loadable(() => import('../containers/Auth/SSOLogin'));
const AppRouter = (props) => {
  const SelectedOrganization = localStorage.getItem('current_org');
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });

  if (window.location.href.includes('/shared') || window.location.href.includes('/lti')
    || window.location.href.includes('/embed') || window.location.href.includes('/register')
    || window.location.href.includes('/forgot-password') || window.location.href.includes('gclass/launch')
    || window.location.href.includes('/opensearch')) {
    document.body.classList.add('mobile-responsive');
  }

  const { user } = props;
  return (
    <Router history={history}>
      <Switch>
        <OpenRoute
          exact
          path="/studio/lti-sso"
          component={LtiLogin}
        />
        <OpenRoute exact path="/studio/sso/dologin/:ssodata" component={SSOLogin} />
        <OpenRoute
          exact
          path="/studio/projects/shared"
          component={ProjectShareTemplate}
        />
        <OpenRoute
          exact
          path="/studio/project/:projectId/shared"
          component={PreviewPageShared}
        />
        <OpenRoute
          exact
          path="/studio/project/:projectId/secure/shared"
          component={SecureProjectPreview}
        />
        <OpenRoute
          exact
          path="/studio/opensearch"
          component={Searchnetlify}
        />
        <OpenRoute
          exact
          path="/lti-tools/activity/:activityId"
          component={LtiActivity}
        />
        <OpenRoute
          exact
          path="/studio/activity/:activityId/shared"
          component={LtiPreviewPage}
          previewType="activityShared"
        />
        <OpenRoute
          exact
          path="/studio/h5p/embed/:activityId"
          component={LtiPreviewPage}
          previewType="activitySharedEmbed"
        />
        <OpenRoute
          exact
          path="/studio/lti/content/:lmsUrl/:ltiClientId/:redirectUrl"
          // component={LtiModel}
          component={SearchPage}
        />
        <OpenRoute
          exact
          path="/studio/gclass/launch/:userId/:courseId/:activityId/:classworkId"
          component={GclassActivityPage}
        />
        <OpenRoute
          exact
          path="/studio/gclass/summary/:userId/:courseId/:activityId/:gClassworkId/:submissionId"
          component={GclassSummaryPage}
        />
        <OpenRoute
          exact
          path="/studio/genericlms/:lmsName/lmsurl/:lmsUrl/client/:lmsClientId/lmscourse/:lmsCourseId/lmsunit/:lmsUnitId/activity/:activityId"
          component={GenericLMSActivityPage}
        />
        <OpenRoute
          exact
          path="/studio/lti/summary"
          component={CanvasSummaryPage}
        />
        <OpenRoute
          path="/studio/playlist/:playlistId/activity/:activityId/preview/lti"
          exact
          component={LtiPreviewPage}
          previewType="playlist"
        />
        <OpenRoute
          exact
          path="/studio/playlist/:playlistId/preview/lti"
          component={LtiPreviewPage}
          previewType="playlist"
        />
        <PrivateRoute
          exact
          path="/studio/org/:organization/project/:projectId/playlist/:playlistId/activity/:activityId/preview"
          component={PreviewPage}
          previewType="playlist"
        />

        <OpenRoute
          exact
          path="/studio/lti-tools/activity/:activityId"
          component={LtiActivity}
        />
        <PublicRoute exact path="/studio/login" component={LoginPage} />
        <PublicRoute exact path="/studio/login/:organization" component={LoginPage} />
        <PublicRoute exact path="/studio/register" component={RegisterPage} />
        <PublicRoute exact path="/studio/register/:organization" component={RegisterPage} />
        <PublicRoute exact path="/studio/forgot-password" component={ForgotPasswordPage} />
        <PublicRoute exact path="/studio/forgot-password/:organization" component={ForgotPasswordPage} />
        <PublicRoute exact path="/studio/reset-password" component={ResetPasswordPage} />
        <PublicRoute exact path="/studio/verify-email" component={ConfirmEmailPage} />
        <PublicRoute exact path="/studio/neaf-register" component={NeafRegister} />
        <PublicRoute exact path="/studio/neaf-login" component={NeafLogin} />
        <PublicRoute exact path="/studio/nevada-register" component={VevensityRegister} />
        <PublicRoute exact path="/studio/nevada-login" component={VevensityLogin} />
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
                     <PrivateRoute exact path="/studio/org/:organization/account" component={ProfilePage} />
                     <PrivateRoute exact path="/studio/org/:organization/change-password" component={ChangePasswordPage} />

                     {/* <PrivateRoute exact path="/studio/org/:organization/dashboard" component={DashboardPage} /> */}
                     <PrivateRoute exact path="/studio/org/:organization/notification" component={NotificationPage} />
                     <PrivateRoute exact path="/studio/org/:organization/admin" component={AdminPanel} />
                     <PrivateRoute exact path="/studio/org/:organization/teams" component={TeamsPage} overview />
                     <PrivateRoute exact path="/studio/org/:organization/teams/create-team" component={TeamsPage} creation />
                     <PrivateRoute exact path="/studio/org/:organization/teams/:teamId" component={TeamsPage} teamShow />
                     <PrivateRoute exact path="/studio/org/:organization/teams/:teamId/edit" component={TeamsPage} editMode />
                     <PrivateRoute exact path="/studio/org/:organization/teams/:teamId/projects" component={TeamsPage} projectShow />
                     <PrivateRoute exact path="/studio/org/:organization/teams/:teamId/channel" component={TeamsPage} channelShow />
                     <PrivateRoute exact path="/studio/org/:organization/teams/:teamId/add-projects" component={AddTeamProjectsPage} />
                     <PrivateRoute exact path="/studio/org/:organization/teams/:teamId/projects/:projectId/add-member" component={AddTeamProjectMemberPage} />

                     {/* <PrivateRoute exact path="/org/:organization/groups" component={GroupsPage} overview />
                     <PrivateRoute exact path="/org/:organization/groups/create-group" component={GroupsPage} creation />
                     <PrivateRoute exact path="/org/:organization/groups/:groupId" component={GroupsPage} groupShow />
                     <PrivateRoute exact path="/org/:organization/groups/:groupId/edit" component={GroupsPage} editMode />
                     <PrivateRoute exact path="/org/:organization/groups/:groupId/projects" component={GroupsPage} projectShow />
                     <PrivateRoute exact path="/org/:organization/groups/:groupId/channel" component={GroupsPage} channelShow />
                     <PrivateRoute exact path="/org/:organization/groups/:groupId/add-projects" component={AddGroupProjectsPage} />
                     <PrivateRoute exact path="/org/:organization/groups/:groupId/projects/:projectId/add-member" component={AddGroupProjectMemberPage} /> */}

                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/create"
                       component={ProjectsPage}
                       showCreateProjectPopup
                       editMode={false}
                     />
                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/:projectId"
                       component={PlaylistsPage}
                     />
                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/:projectId/preview"
                       component={PreviewPage}
                     />
                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/:projectId/edit"
                       component={ProjectsPage}
                       showEditProjectPopup
                       editMode
                     />

                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/:projectId/playlist/create"
                       component={PlaylistsPage}
                       openCreatePopup
                     />
                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/:projectId/playlist/:playlistId/activity/create"
                       component={ActivityCreate}
                       // openCreateResourcePopup
                     />
                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/project/:projectId/playlist/:playlistId/activity/:activityId/edit"
                       component={EditActivity}
                       openEditResourcePopup
                     />

                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/search"
                       component={SearchResult}
                     />
                     <PrivateRoute
                       exact
                       path="/studio/org/:organization/manage"
                       component={ManageOrganization}
                     />
                     <PrivateRoute exact path="/studio/org/:organization" component={ProjectsPage} />
                     <Redirect to={`/studio/org/${SelectedOrganization || 'currikistudio'}`} />
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
