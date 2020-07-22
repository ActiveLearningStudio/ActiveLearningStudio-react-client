import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>
      <h2>{label}</h2>
    </label>
    <div>
      <input {...input} type={type} />
      {touched
      && ((error && <span className="validation-error">{error}</span>)
        || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

InputField.defaultProps = {};

export default InputField;
