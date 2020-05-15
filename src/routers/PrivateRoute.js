import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";



const PrivateRoute = ({ component: Component, id, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      {
        if(props.match.params.resourceid){
          id = props.match.params.resourceid;
        } else if(props.match.params.playlistid){
          id = props.match.params.playlistid;
        } else if(props.match.params.projectid){
          id = props.match.params.projectid;
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