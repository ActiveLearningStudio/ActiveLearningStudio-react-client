/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const MyInteractiveVideoSvg = ({ primaryColor }) => (
  <>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="white" />
      <rect x="2" y="2.5" width="20" height="12" rx="2" stroke={primaryColor} strokeWidth="2" />
      <path d="M2 19.5H22" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="19.5" r="2" fill="white" stroke={primaryColor} strokeWidth="2" />
      <path
        d="M10 10.6667V6.43426C10 6.03491 10.4451 5.79672 10.7774 6.01823L14.3044 8.36957C14.619 8.5793 14.5959 9.04885 14.2623 9.22677L10.7353 11.1078C10.4022 11.2855 10 11.0441 10 10.6667Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
);

export default MyInteractiveVideoSvg;
