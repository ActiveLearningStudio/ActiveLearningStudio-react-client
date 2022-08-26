/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const PlusSmSvg = ({ primaryColor, className = '', onClick = () => {} }) => (
  <>
    <svg className={className} onClick={onClick} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5C1.00573 5 6.33572 5.00005 9 5.00008" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 9C5 8.99427 5 3.66428 5 1" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default PlusSmSvg;
