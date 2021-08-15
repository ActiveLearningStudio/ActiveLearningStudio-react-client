/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./topheading.scss";
import imageSvg from "../../assets/images/svg/Vector.svg";

const TopHeading = ({ description, image, heading, color }) => {
  const currikiUtility = classNames("curriki-utility-TopHeading");
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <p>{description}</p>
      <div className="curriki-imageHeading">
        <img src={image} alt="" />
        <h1>{heading}</h1>
      </div>
    </div>
  );
};

TopHeading.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  heading: PropTypes.string,
  color: PropTypes.string,
};

export default TopHeading;
