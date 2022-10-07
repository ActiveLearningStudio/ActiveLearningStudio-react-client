/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const ManageMdSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.00037 1.17188H11.667C12.0207 1.17188 12.3598 1.31235 12.6098 1.5624C12.8599 1.81245 13.0004 2.15159 13.0004 2.50521V11.8385C13.0004 12.1922 12.8599 12.5313 12.6098 12.7814C12.3598 13.0314 12.0207 13.1719 11.667 13.1719H9.00037"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.66687 10.5065L9.0002 7.17318L5.66687 3.83984" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.99963 7.17188H0.999634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </>
);

export default ManageMdSvg;
