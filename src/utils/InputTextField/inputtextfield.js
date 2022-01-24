/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./inputtextfield.scss";

const InputTextField = ({ className, id, placeholder, value, onChange }) => {
  const currikiUtility = classNames(
    "curriki-utility-inputtextfield",
    className
  );
  return (
    <input
      className={currikiUtility}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

InputTextField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputTextField;
