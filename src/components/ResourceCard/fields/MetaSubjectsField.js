import React from 'react';
import PropTypes from 'prop-types';
import DropdownList from 'react-widgets/lib/DropdownList';
import { useDispatch } from 'react-redux';

import { saveFormDataInCreation } from 'store/actions/resource';

const MetaSubjectsField = ({
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
        // console.log(values.value);
        dispatch(saveFormDataInCreation(
          {
            metaTitle: resource.metaTitle,
            metaSubject: values.value,
            metaEducationLevels: resource.metaEducationLevels,
          },
        ));
      }}
    />
  );
};

MetaSubjectsField.propTypes = {
  input: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  resource: PropTypes.object.isRequired,
};

MetaSubjectsField.defaultProps = {
  defaultValue: null,
};

export default MetaSubjectsField;
