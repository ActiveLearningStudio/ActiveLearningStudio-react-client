import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";



const PublicRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.id
});

export default connect(mapStateToProps)(PublicRoute);
