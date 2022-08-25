/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React from 'react';

const SearchInputMdSvg = ({ primaryColor, onClick = () => {}, className, style }) => (
  <>
    <svg className={className} style={style} onClick={onClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19.0004 18.9999L14.6504 14.6499" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default SearchInputMdSvg;
