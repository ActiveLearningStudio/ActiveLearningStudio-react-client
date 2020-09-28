import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';

const MetaEducationLevelInputField = ({ input, ...rest }) => (
  <DropdownList {...input} {...rest} value={input.value || rest.defaultValue} />
);

MetaEducationLevelInputField.propTypes = {
  input: PropTypes.object.isRequired,
};

export default MetaEducationLevelInputField;
