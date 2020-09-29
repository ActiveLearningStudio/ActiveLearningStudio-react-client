import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';

const MetaEducationLevelInputField = ({ input: { value, ...input }, defaultValue, ...rest }) => (
  <DropdownList {...input} {...rest} defaultValue={defaultValue || (value || '')} />
);

MetaEducationLevelInputField.propTypes = {
  input: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};

MetaEducationLevelInputField.defaultProps = {
  defaultValue: null,
};

export default MetaEducationLevelInputField;
