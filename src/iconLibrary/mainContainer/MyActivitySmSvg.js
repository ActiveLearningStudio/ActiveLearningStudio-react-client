/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const MyActivitySmSvg = ({ primaryColor, className = '', onClick = () => {} }) => (
  <>
    <svg className={className} onClick={onClick} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.6 1H2.4C1.6268 1 1 1.6268 1 2.4V5.2C1 5.9732 1.6268 6.6 2.4 6.6H13.6C14.3732 6.6 15 5.9732 15 5.2V2.4C15 1.6268 14.3732 1 13.6 1Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6 9.40039H2.4C1.6268 9.40039 1 10.0272 1 10.8004V13.6004C1 14.3736 1.6268 15.0004 2.4 15.0004H13.6C14.3732 15.0004 15 14.3736 15 13.6004V10.8004C15 10.0272 14.3732 9.40039 13.6 9.40039Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.7998 3.79883H3.80925" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.7998 12.1992H3.80925" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default MyActivitySmSvg;
