import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import { useDispatch } from 'react-redux';

import { saveFormDataInCreation } from 'store/actions/resource';

const MetaEducationLevelInputField = ({
  input: { value, ...input },
  defaultValue,
  resource,
  ...rest
}) => {
  const dispatch = useDispatch();
  return (
    <DropdownList
      {...input}
      {...rest}
      value={defaultValue || (value || '')}
      onChange={(values) => {
        dispatch(saveFormDataInCreation(
          {
            metaTitle: resource.metaTitle,
            metaSubject: resource.metaSubject,
            metaEducationLevels: values.name,
          },
        ));
      }}
    />
  );
};

MetaEducationLevelInputField.propTypes = {
  input: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  resource: PropTypes.object.isRequired,
};

MetaEducationLevelInputField.defaultProps = {
  defaultValue: null,
};

export default MetaEducationLevelInputField;
