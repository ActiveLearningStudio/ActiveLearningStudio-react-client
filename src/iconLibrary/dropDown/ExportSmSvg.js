/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const ExportSmSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.99902 13H2.33236C1.97873 13 1.6396 12.8595 1.38955 12.6095C1.1395 12.3594 0.999023 12.0203 0.999023 11.6667V2.33333C0.999023 1.97971 1.1395 1.64057 1.38955 1.39052C1.6396 1.14048 1.97873 1 2.33236 1H4.99902"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.54395 10.4137L13.0008 6.95686L9.54395 3.5" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.0645 7H5.06445" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default ExportSmSvg;
