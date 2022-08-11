/* eslint-disable react/prop-types */
import React from 'react';

const PreviewSmSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

export default PreviewSmSvg;
