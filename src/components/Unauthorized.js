import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import std from 'assets/images/terms.png';
import { LoadHP } from 'store/actions/playlist';

function Unauthorized(props) {
  const { text, showButton, loadHP } = props;

  return (
    <div className="whole-authorized">
      <div className="box-unauthorized">
        <img src={std} alt="" />

        <h3>{text}</h3>

        {showButton ? (
          <Link
            to="/studio"
            onClick={() => {
              loadHP('Loading...');
            }}
          >
            {' '}
            Go Back to Projects
          </Link>
        ) : (
          <Link
            to="/studio"
            onClick={() => {
              loadHP('Loading...');
            }}
          >
            {' '}
            Go Back
          </Link>
        )}
      </div>
    </div>
  );
}

Unauthorized.propTypes = {
  text: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  loadHP: PropTypes.func.isRequired,
};

Unauthorized.defaultProps = {
  showButton: false,
};

const mapDispatchToProps = (dispatch) => ({
  loadHP: (show) => dispatch(LoadHP(show)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(Unauthorized),
);
