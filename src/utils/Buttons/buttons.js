/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./buttons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Buttons = ({
  text,
  type,
  className,
  primary,
  secondary,
  defaultgrey,
  defaultwhite,
  icon,
  width,
  height,
  radius,
  disabled,
  hover,
  onClick = () => {},
}) => {
  const btnCurriki = classNames(
    "curriki-utility",
    primary && "curriki-theme-primary-button",
    secondary && "curriki-theme-secondary-button",
    defaultgrey && "curriki-theme-defaultgrey-button",
    defaultwhite && "curriki-theme-defaultwhite-button",
    hover && "curriki-theme-hover",
    className
  );

  const btnCurrikiStyle = {
    height: height ? height : null,
    width: width ? width : null,
    borderRadius: radius ? radius : null,
  };

  return (
    <button
      className={btnCurriki}
      type={type}
      style={btnCurrikiStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <FontAwesomeIcon icon={icon} className="curriki_btn-mr-2" />}
      {text}
    </button>
  );
};

Buttons.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  defaultgrey: PropTypes.bool,
  defaultwhite: PropTypes.bool,
  icon: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
};
export default Buttons;
