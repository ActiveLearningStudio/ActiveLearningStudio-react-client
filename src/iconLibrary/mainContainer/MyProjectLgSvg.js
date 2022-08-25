/* eslint-disable react/prop-types */
import React from 'react';

const MyProjectLgSvg = ({ primaryColor }) => (
  <>
    <svg width="36" height="33" viewBox="0 0 36 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 7.4375V29.1875C2 30.1885 2.81149 31 3.8125 31H32.8125C33.8136 31 34.625 30.1885 34.625 29.1875V9.94715C34.625 8.94614 33.8136 8.13465 32.8125 8.13465H19.9856"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M19.9856 8.13465L14.9529 2.26544C14.783 2.09548 14.5525 2 14.3121 2H2.90625C2.40575 2 2 2.40575 2 2.90625V7.4375"
        stroke={primaryColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </>
);

export default MyProjectLgSvg;
