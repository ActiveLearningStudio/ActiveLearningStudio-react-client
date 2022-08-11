/* eslint-disable react/prop-types */
import React from 'react';

const BackToSmSvg = ({ primaryColor }) => (
  <>
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 5L1 5" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 1L1 5L5 9" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default BackToSmSvg;
