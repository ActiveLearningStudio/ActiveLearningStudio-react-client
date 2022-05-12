/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./topheading.scss";
import imageSvg from "../../assets/images/svg/Vector.svg";

const TopHeading = ({
  description,
  image,
  heading,
  color,
  className,
  svgImage,
}) => {
  const currikiUtility = classNames("curriki-utility-TopHeading", className);
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <p>{description}</p>
      <div className="curriki-imageHeading">
        {/* {image && <img src={image} alt="" />} */}
        {svgImage && svgImage}

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
  className: PropTypes.string,
};

export default TopHeading;
