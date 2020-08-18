import React from 'react';
import PropTypes from 'prop-types';

const TextareaField = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>
      <h2>{label}</h2>
    </label>
    <div>
      <textarea {...input} />
      {touched && (
        (error && <span className="validation-error">{error}</span>)
        || (warning && <span>{warning}</span>)
      )}
    </div>
  </div>
);

TextareaField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
};

TextareaField.defaultProps = {
  label: '',
};

export default TextareaField;
