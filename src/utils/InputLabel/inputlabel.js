/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./inputlabel.scss";

const InputLabel = ({ text, color, className, id, children }) => {
  const currikiUtility = classNames("curriki-utility-inputlabel", className);
  return (
    <label className={currikiUtility} style={{ color: color }} id={id}>
      {text}
      {children}
    </label>
  );
};

InputLabel.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default InputLabel;
