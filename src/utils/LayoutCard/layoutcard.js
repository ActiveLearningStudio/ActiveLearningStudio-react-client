/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './layoutcard.scss';
import Image from 'assets/images/Group 648.png';

const LayoutCard = ({ image, text, color, className, onClick = () => {}, importImg, btnTextOne, btnTextTwo }) => {
  const currikiUtility = classNames('curriki-utility-layoutcard', className);
  return (
    <div className={currikiUtility} style={{ color: color }} onClick={onClick}>
      {importImg ? <img src={image} /> : <img style={{ maxWidth: '50px', minHeight: '56px' }} src={global.config.resourceUrl + image} />}
      <p>{text}</p>
      <div className="card-btn">
        <button className="btn">{btnTextOne}</button>
        <button className="btn">{btnTextTwo}</button>
      </div>
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
