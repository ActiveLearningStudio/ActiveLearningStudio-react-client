/* eslint-disable react/prop-types */
import React from 'react';

const MyProjectSvg = ({ primaryColor }) => (
  <>
    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.875 4.375V17.875C1.875 18.4963 2.37869 19 3 19H21C21.6213 19 22.125 18.4963 22.125 17.875V5.93271C22.125 5.3114 21.6213 4.80771 21 4.80771H13.0385"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.0385 4.80771L9.9147 1.16476C9.80929 1.05927 9.66619 1 9.517 1H2.4375C2.12684 1 1.875 1.25184 1.875 1.5625V4.375"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </>
);

export default MyProjectSvg;
