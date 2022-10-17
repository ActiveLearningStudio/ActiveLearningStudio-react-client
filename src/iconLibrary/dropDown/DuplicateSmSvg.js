/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const DuplicateSmSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.8002 5.20001H6.4002C5.73745 5.20001 5.2002 5.73727 5.2002 6.40001V11.8C5.2002 12.4628 5.73745 13 6.4002 13H11.8002C12.4629 13 13.0002 12.4628 13.0002 11.8V6.40001C13.0002 5.73727 12.4629 5.20001 11.8002 5.20001Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.8 8.8H2.2C1.88174 8.8 1.57652 8.67357 1.35147 8.44853C1.12643 8.22348 1 7.91826 1 7.6V2.2C1 1.88174 1.12643 1.57652 1.35147 1.35147C1.57652 1.12643 1.88174 1 2.2 1H7.6C7.91826 1 8.22348 1.12643 8.44853 1.35147C8.67357 1.57652 8.8 1.88174 8.8 2.2V2.8"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

export default DuplicateSmSvg;
