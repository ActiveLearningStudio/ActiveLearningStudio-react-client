/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./tabs.scss";

const Tabs = ({ text, color, className }) => {
  const currikiUtility = classNames("curriki-utility-tabs", className);
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <span className="tabs"></span>
      <div className="tab-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Tabs;
