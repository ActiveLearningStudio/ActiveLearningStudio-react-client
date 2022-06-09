/* eslint-disable */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const AppRouter = (props) => {
  return (
    <Switch>
      <Route path="/branding" />
      <Route path="/lti-sso" />
      <Route path="/org/:organization/terms-policy-content/:content" />
      <Route path="/canvas-lti-sso" />
      <Route path="/sso/dologin/:ssodata" />
      <Route path="/projects/shared" />
      <Route path="/project/:projectId/preview" />
      <Route path="/project/:projectId/shared" />
      <Route path="/project/:projectId/secure/shared" />
      <Route path="/opensearch" />
      <Route path="/lti-tools/activity/:activityId" />
      <Route path="/activity/:activityId/preview" />
      <Route path="/activity/:activityId/shared" />
      <Route path="/h5p/embed/:activityId" />
      <Route path="/lti/content/:lmsUrl/:ltiClientId/:redirectUrl" />
      <Route path="/gclass/launch/:userId/:courseId/:activityId/:classworkId" />
      <Route path="/gclass/summary/:userId/:courseId/:activityId/:gClassworkId/:submissionId" />
      <Route path="/genericlms/:lmsName/lmsurl/:lmsUrl/client/:lmsClientId/lmscourse/:lmsCourseId/lmsunit/:lmsUnitId/activity/:activityId" />
      <Route path="/lti/summary" />
      <Route path="/playlist/:playlistId/activity/:activityId/preview/lti" />
      <Route path="/playlist/:playlistId/activity/:activityId/preview" />
      <Route path="/playlist/:playlistId/preview" />
      <Route path="/project/:projectId/playlist/:playlistId/shared" />
      <Route path="/playlist/:playlistId/preview/lti" />
      <Route path="/org/:organization/project/:projectId/playlist/:playlistId/activity/:activityId/preview" />

      <Route path="/lti-tools/activity/:activityId" />
      <Route path="/login" />
      <Route path="/login/:organization" />
      <Route path="/register" />
      <Route path="/register/:organization" />
      <Route path="/forgot-password" />
      <Route path="/forgot-password/:organization" />
      <Route path="/reset-password" />
      <Route path="/verify-email" />
      <Route path="/neaf-register" />
      <Route path="/neaf-login" />
      <Route path="/nevada-register" />
      <Route path="/nevada-login" />

      <Route path="/org/:organization/account" />
      <Route path="/org/:organization/change-password" />

      <Route path="/org/:organization/dashboard" />

      <Route path="/org/:organization/notification" />
      <Route path="/org/:organization/admin" />
      <Route path="/org/:organization/teams" />
      <Route path="/org/:organization/teams/team-detail" />
      <Route path="/org/:organization/teams/add-projects" />
      <Route path="/org/:organization/teams/:teamId" />
      <Route path="/org/:organization/teams/:teamId/add-projects" />
      <Route path="/org/:organization/video" />
      <Route path="/org/:organization/instance-admin" />

      <Route path="/org/:organization/project/create" />
      <Route path="/org/:organization/project/:projectId" />
      <Route path="/org/:organization/project/:projectId/preview" />
      <Route path="/org/:organization/project/:projectId/edit" />

      <Route path="/org/:organization/project/:projectId/playlist/:playlistId/activity/create" />
      <Route path="/org/:organization/project/:projectId/playlist/:playlistId/activity/:activityId/edit" />

      <Route path="/org/:organization/search" />
      <Route path="/org/:organization/manage" />
      <Route path="/org/:organization" />
    </Switch>
  );
};
export default AppRouter;
