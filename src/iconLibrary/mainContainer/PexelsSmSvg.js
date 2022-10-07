/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const PexelsSmSvg = ({ primaryColor, className }) => (
  <>
    <svg className={className} width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 1H11.5C12.6046 1 13.5 1.89543 13.5 3V11C13.5 12.1046 12.6046 13 11.5 13H3.5C2.39543 13 1.5 12.1046 1.5 11V3C1.5 1.89543 2.39543 1 3.5 1H4.5"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5.49902 10.0831V4.58308C5.49902 4.44501 5.61095 4.33309 5.74902 4.33308L7.83236 4.33307C8.99902 4.33325 10.1657 4.70807 10.1657 6.58325C10.1657 7.95167 8.9791 8.38362 8.08196 8.4489C7.94426 8.45892 7.83236 8.57 7.83236 8.70807V10.0831C7.83236 10.2211 7.72043 10.3331 7.58236 10.3331H5.74902C5.61095 10.3331 5.49902 10.2211 5.49902 10.0831Z"
        stroke={primaryColor}
        strokeWidth="1.5"
      />
    </svg>
  </>
);

export default PexelsSmSvg;
