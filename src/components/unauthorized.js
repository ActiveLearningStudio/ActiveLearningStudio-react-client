import React from "react";
import std from "../images/terms.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LoadHP } from "./../actions/playlist";
import { withRouter } from "react-router-dom";
function Unauthorized(props) {
  return (
    <div className="box-unathorized">
      <img src={std} alt="" />
      <h3>{props.text}</h3>
      {props.showbutton && (
        <Link
          to="/"
          onClick={() => {
            props.LoadHP("loading...");
          }}
        >
          {" "}
          Go Back to Projects
        </Link>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  LoadHP: (show) => dispatch(LoadHP(show)),
});

const mapStateToProps = (state) => {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Unauthorized)
);
