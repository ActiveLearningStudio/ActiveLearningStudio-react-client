/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const UploadSmSvg = ({ primaryColor, className = '', onClick = () => {} }) => (
  <>
    <svg className={className} onClick={onClick} width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7V10.2C1 10.4122 1.15804 10.6157 1.43934 10.7657C1.72064 10.9157 2.10218 11 2.5 11H11.5C11.8978 11 12.2794 10.9157 12.5607 10.7657C12.842 10.6157 13 10.4122 13 10.2V7"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.6499 3.39999L7.0249 1L4.3999 3.39999" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 1V8.79997" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default UploadSmSvg;
