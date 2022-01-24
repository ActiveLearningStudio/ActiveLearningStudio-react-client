/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./tabs.scss";

const Tabs = ({ text, color, tabActive = false, className }) => {
  const currikiUtility = classNames("curriki-utility-tabs", className);
  const currikiUtility_tabs = classNames(
    tabActive ? "tabs activeTabs" : "tabs"
  );
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <span className={currikiUtility_tabs}></span>
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
  tabActive: PropTypes.bool,
};

export default Tabs;
