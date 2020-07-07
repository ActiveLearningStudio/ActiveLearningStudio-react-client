import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';

const MetaSubjectsField = ({ input, ...rest }) => (
  <DropdownList {...input} {...rest} />
);

MetaSubjectsField.propTypes = {
  input: PropTypes.object.isRequired,
};

export default MetaSubjectsField;
