/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./headingthree.scss";

const HeadingThree = ({ text, color, className }) => {
  const currikiUtility = classNames("curriki-utility-headingThree", className);
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <h3>{text}</h3>
    </div>
  );
};

HeadingThree.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default HeadingThree;
