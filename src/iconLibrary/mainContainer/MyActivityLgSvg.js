/* eslint-disable react/prop-types */
import React from 'react';

const MyActivityLgSvg = ({ primaryColor }) => (
  <>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.2 2H4.8C3.2536 2 2 3.2536 2 4.8V10.4C2 11.9464 3.2536 13.2 4.8 13.2H27.2C28.7464 13.2 30 11.9464 30 10.4V4.8C30 3.2536 28.7464 2 27.2 2Z"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.2 18.8H4.8C3.2536 18.8 2 20.0536 2 21.6V27.2C2 28.7464 3.2536 30 4.8 30H27.2C28.7464 30 30 28.7464 30 27.2V21.6C30 20.0536 28.7464 18.8 27.2 18.8Z"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.6001 7.59967H7.6148" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.6001 24.3997H7.6148" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default MyActivityLgSvg;
