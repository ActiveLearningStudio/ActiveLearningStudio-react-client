import React, { useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import loadable from "@loadable/component";
import ReactGA from "react-ga";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});
const ProjectsPage = loadable(() => import("../containers/ProjectsPage"));
const PlaylistsPage = loadable(() => import("../containers/PlaylistsPage"));
const PreviewPage = loadable(() => import("../containers/PreviewPage"));
const Ltipreviewpage = loadable(() => import("../containers/Ltipreviewpage"));
const LoginPage = loadable(() => import("../containers/LoginPage"));
const PreviewPageShared = loadable(() =>
  import("../containers/PreviewPageShared")
);
const registration = loadable(() => import("../containers/Registration"));
const AppRouter = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  });
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/" exact component={ProjectsPage} />
        <PrivateRoute
          path="/project/preview2/:projectid"
          exact
          component={PreviewPage}
        />
        <Route
          path="/project/shared/:projectid"
          exact
          component={PreviewPageShared}
        />
        <Route path="/registration" exact component={registration} />
        <PrivateRoute
          path="/resource/preview/:resourceid"
          exact
          component={PreviewPage}
          previewType="resource"
        />
        <PrivateRoute
          path="/playlist/preview/:playlistid/resource/:resourceid"
          exact
          component={PreviewPage}
          previewType="playlist"
        />
        <Route
          path="/playlist/lti/preview/:playlistid"
          component={Ltipreviewpage}
          previewType="playlist"
          exact
        />

        <Route
          path="/shared/resource/:activityid"
          component={Ltipreviewpage}
          exact
        />

        <Route
          path="/shared/activity/:resourceid"
          exact
          render={() => <Ltipreviewpage previewType="activityshared" />}
        />

        <Route
          path="/playlist/lti/preview/:playlistid/resource/:resourceid"
          exact
          component={Ltipreviewpage}
          previewType="playlist"
        />

        <Route
          path="/playlist/shared/preview/:playlistid/resource/:resourceid"
          exact
          render={() => <Ltipreviewpage previewType="playlistshared" />}
        />

        <PrivateRoute
          path="/project/create"
          exact
          component={ProjectsPage}
          id="create-project"
          showCreateProjectPopup={true}
          editMode={false}
        />
        <PrivateRoute
          path="/project/create/:projectid"
          exact
          component={ProjectsPage}
          showEditProjectPopup={true}
          editMode={true}
        />

        <PrivateRoute
          path="/project/:projectid/playlist/:playlistid/activity/create/:activityid"
          exact
          component={PlaylistsPage}
          openEditResourcePopup={true}
        />
        <PrivateRoute
          path="/project/:projectid"
          exact
          component={PlaylistsPage}
        />
        <PrivateRoute
          path="/project/:projectid/playlist/create"
          exact
          component={PlaylistsPage}
          openCreatePopup={true}
        />
        <PrivateRoute
          path="/project/:projectid/playlist/:playlistid/activity/create"
          exact
          component={PlaylistsPage}
          openCreateResourcePopup={true}
        />
        <PrivateRoute
          path="/activities/:activityid"
          exact
          component={PlaylistsPage}
        />

        <PublicRoute path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
