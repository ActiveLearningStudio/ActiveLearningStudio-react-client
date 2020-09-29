import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveFormDataInCreation } from 'store/actions/resource';

const MetaTitleInputField = ({
  input: { value, ...input },
  label,
  type,
  defaultValue,
  meta: { touched, error, warning },
  saveFormData,
}) => (
  <div>
    <label>
      <h2>{label}</h2>
    </label>
    <div>
      <input
        {...input}
        type={type}
        defaultValue={defaultValue || (value || '')}
        onChange={(e) => saveFormData({ metaTitle: e.target.value })}
      />
      {touched && ((error && <span className="validation-error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

MetaTitleInputField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  saveFormData: PropTypes.func.isRequired,
};

MetaTitleInputField.defaultProps = {
  defaultValue: null,
};

const mapDispatchToProps = (dispatch) => ({
  saveFormData: (formData) => dispatch(saveFormDataInCreation(formData)),
});

export default connect(null, mapDispatchToProps)(MetaTitleInputField);
