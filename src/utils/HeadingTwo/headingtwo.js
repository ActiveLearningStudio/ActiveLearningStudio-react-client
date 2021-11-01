/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./headingtwo.scss";

const HeadingTwo = ({ text, color, className }) => {
  const currikiUtility = classNames("curriki-utility-headingTwo", className);
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <h2>{text}</h2>
    </div>
  );
};

HeadingTwo.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default HeadingTwo;
