/* eslint-disable react/prop-types */
import React from 'react';

const RequestedTagSmSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 13C10.3137 13 13 10.3137 13 7.00003C13 3.68632 10.3137 1.00003 7 1.00003C3.68629 1.00003 1 3.68632 1 7.00003C1 10.3137 3.68629 13 7 13Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 4.60009V7.00009" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 9.39995H7.00533" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default RequestedTagSmSvg;
