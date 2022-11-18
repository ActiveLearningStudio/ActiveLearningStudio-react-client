/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from 'react';

const CloseSmSvg = ({ primaryColor, onClick = () => {}, style = {}, className = '' }) => (
  <svg className={className} onClick={onClick} style={style} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 1L1 15" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 1L15 15" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CloseSmSvg;
