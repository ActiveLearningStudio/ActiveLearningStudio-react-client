/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const MyInteractiveVideoLgSvg = ({ primaryColor }) => (
  <>
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1.5" width="20" height="12" rx="2" stroke={primaryColor} strokeWidth="2" />
      <path d="M1 18.5H21" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="18.5" r="2" fill="white" stroke={primaryColor} strokeWidth="2" />
      <path
        d="M9 9.66667V5.43426C9 5.03491 9.44507 4.79672 9.77735 5.01823L13.3044 7.36957C13.619 7.5793 13.5959 8.04885 13.2623 8.22677L9.73529 10.1078C9.40224 10.2855 9 10.0441 9 9.66667Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
);

export default MyInteractiveVideoLgSvg;
