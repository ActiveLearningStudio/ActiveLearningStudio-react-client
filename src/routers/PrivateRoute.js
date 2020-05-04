import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";



const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      {
        let id = '';
        if(props.match.params.resourceid){
          id = props.match.params.resourceid;
        } else {
          if(props.match.params.playlistid){
            id = props.match.params.playlistid;
          }
        }
        
        return (
          isAuthenticated ? (
            <div>
              <Component {...props} {...rest} key={id} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        )
      }
    }
  />
);

const mapStateToProps = state => {
  return ({
    isAuthenticated: !!state.auth.id
  });
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));