/* eslint-disable react/prop-types */
import React from 'react';

const HeaderHambergSvg = ({ primaryColor }) => (
  <>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12.5H20" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 6.5H20" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18.5H20" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default HeaderHambergSvg;
