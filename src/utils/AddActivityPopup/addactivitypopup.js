/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./addactivitypopup.scss";
import Buttons from "utils/Buttons/buttons";
import HeadingThree from "utils/HeadingThree/headingthree";

const AddActivityPopup = ({ className }) => {
  const currikiUtility = classNames("curriki-utility-popup", className);
  return (
    <div className={currikiUtility}>
      <div className="add-activty-inner">
        <div className="add-activty-project-detail">
          <div className="add-activty-project-name">
            <HeadingThree text="Project:" color="#084892" />
            <span>Design, Art & History</span>
          </div>
          <div
            className="add-activty-project-name"
            style={{ marginTop: "14px" }}
          >
            <HeadingThree text="Adding Activities:" color="#084892" />
            <span>“My first activity created”</span>
          </div>
        </div>
        <div className="add-activty-btn">
          <Buttons
            primary={true}
            text="Add Activity"
            width="193px"
            height="42px"
            hover={true}
          />
        </div>
      </div>
    </div>
  );
};

AddActivityPopup.propTypes = {
  className: PropTypes.string,
};

export default AddActivityPopup;
