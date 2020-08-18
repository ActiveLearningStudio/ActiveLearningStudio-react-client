import React from 'react';
import PropTypes from 'prop-types';

function Error(props) {
  const { error } = props;

  if (!error) {
    return null;
  }

  let message = '';

  if (typeof error === 'string') {
    message = error;
  }

  if (typeof error === 'object') {
    if (error.errors && error.errors.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      message = error.errors[0];
    }

    if (error.message) {
      message = error.message;
    } else if (error.error) {
      message = error.error;
    }
  }

  return (
    <p className="error-msg alert alert-danger" role="alert">
      {message}
    </p>
  );
}

Error.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

Error.defaultProps = {
  error: null,
};

export default Error;
