/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./layoutcard.scss";
import Image from "assets/images/Group 648.png";

const LayoutCard = ({ image, text, color, className, onClick = () => {}, importImg }) => {
  const currikiUtility = classNames("curriki-utility-layoutcard", className);
  return (
    <div className={currikiUtility} style={{ color: color }} onClick={onClick}>
       {importImg ?
      <img src={image} />
      : <img style={{ width: '70px'}} src={global.config.resourceUrl+image} /> }
      <p>{text}</p>
    </div>
  );
};

LayoutCard.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default LayoutCard;
