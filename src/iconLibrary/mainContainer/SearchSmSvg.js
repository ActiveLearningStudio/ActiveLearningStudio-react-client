/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const SearchSmSvg = ({ primaryColor, onClick = () => {}, style = {} }) => (
  <>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick} style={style}>
      <path
        d="M7.22222 13.4444C10.6587 13.4444 13.4444 10.6587 13.4444 7.22222C13.4444 3.78578 10.6587 1 7.22222 1C3.78578 1 1 3.78578 1 7.22222C1 10.6587 3.78578 13.4444 7.22222 13.4444Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 14.9999L11.6167 11.6166" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default SearchSmSvg;
