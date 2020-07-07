import React from 'react';
import PropTypes from 'prop-types';

const ResourceActivityTypeField = ({
  input,
  type,
  meta: { touched, error, warning },
}) => (
  <>
    <input {...input} type={type} />
    {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span>{warning}</span>))}
  </>
);

ResourceActivityTypeField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default ResourceActivityTypeField;
