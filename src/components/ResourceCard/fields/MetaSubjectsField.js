import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';

const MetaSubjectsField = ({ input: { value, ...input }, defaultValue, ...rest }) => (
  <DropdownList {...input} {...rest} defaultValue={defaultValue || (value || '')} />
);

MetaSubjectsField.propTypes = {
  input: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
};

MetaSubjectsField.defaultProps = {
  defaultValue: null,
};

export default MetaSubjectsField;
