/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./headingtext.scss";

const HeadingText = ({ text, color, className }) => {
  const currikiUtility = classNames("curriki-utility-headingText", className);
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <p>{text}</p>
    </div>
  );
};

HeadingText.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default HeadingText;
