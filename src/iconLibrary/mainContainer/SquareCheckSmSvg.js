/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

const SquareCheckSmSvg = ({ primaryColor }) => (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.1745 1H2.84115C2.10477 1 1.50781 1.59695 1.50781 2.33333V11.6667C1.50781 12.403 2.10477 13 2.84115 13H12.1745C12.9109 13 13.5078 12.403 13.5078 11.6667V2.33333C13.5078 1.59695 12.9109 1 12.1745 1Z"
      fill={primaryColor}
      stroke={primaryColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10.4942 5.5L6.89418 9.1L5.25781 7.46364" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SquareCheckSmSvg;
