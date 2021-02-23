import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import circleImg from 'assets/images/circle.png';

export default function Circle(props) {
  const { number, text } = props;
  return (
    <>
      <img className="circle-background" src={circleImg} alt="circle" />
      <div className="circle-number">
        {number}
      </div>
      <div className="circle-text">
        {text}
      </div>
    </>
  );
}
Circle.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string,
};

Circle.defaultProps = {
  number: null,
  text: null,
};
