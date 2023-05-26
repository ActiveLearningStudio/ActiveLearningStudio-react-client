/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./layoutcard.scss";
import Image from "assets/images/Group 648.png";

const LayoutCard = ({
  activity,
  setActiveType,
  setModalShow,
  setCurrentActivity,
  image,
  text,
  color,
  className,
  onClick = () => {},
  importImg,
  btnTextOne,
  btnTextTwo,
}) => {
  const currikiUtility = classNames(
    "curriki-utility-layoutcard",
    className
  );
  return (
    <div className={currikiUtility} style={{ color: color }}>
      <div onClick={onClick} className="layoutcard_about">
        {importImg ? (
          <img src={image} />
        ) : (
          <img
            style={{ maxWidth: "50px", minHeight: "56px" }}
            src={global.config.resourceUrl + image}
          />
        )}
        <p>{text}</p>
      </div>
      {btnTextOne && (
        <div className="card-btn">
          <button
            onClick={() => {
              setCurrentActivity(activity);
              setActiveType("demo");
              setModalShow(true);
            }}
            className="btn"
          >
            {btnTextOne}
          </button>
          <button
            onClick={() => {
              setCurrentActivity(activity);
              setActiveType("video");
              setModalShow(true);
            }}
            className="btn"
          >
            {btnTextTwo}
          </button>
        </div>
      )}
    </div>
  );
};

LayoutCard.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  btnTextOne: PropTypes.string,
  btnTextTwo: PropTypes.string,
};

export default LayoutCard;
