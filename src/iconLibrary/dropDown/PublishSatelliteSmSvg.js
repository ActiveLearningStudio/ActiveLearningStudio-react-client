/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

const PublishSatelliteSmSvg = ({ primaryColor, className = '' }) => (
  <>
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5287 4.19531L11.8047 2.47131C11.6797 2.34633 11.5101 2.27612 11.3334 2.27612C11.1566 2.27612 10.987 2.34633 10.862 2.47131L7.13802 6.19531C7.01304 6.32033 6.94283 6.48987 6.94283 6.66665C6.94283 6.84342 7.01304 7.01296 7.13802 7.13798L8.86202 8.86198C8.98704 8.98696 9.15658 9.05717 9.33335 9.05717C9.51013 9.05717 9.67967 8.98696 9.80469 8.86198L13.5287 5.13798C13.6537 5.01296 13.7239 4.84342 13.7239 4.66665C13.7239 4.48987 13.6537 4.32033 13.5287 4.19531V4.19531Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8L7 9M6.33333 11.3333C5.89131 11.3333 5.46738 11.1577 5.15482 10.8452C4.84226 10.5326 4.66667 10.1087 4.66667 9.66667M6 14C4.93913 14 3.92172 13.5786 3.17157 12.8284C2.42143 12.0783 2 11.0609 2 10M12 6.66667L14 8.66667L12 10.6667L10 8.66667L12 6.66667ZM9.33333 4L7.33333 2L5.33333 4L7.33333 6L9.33333 4Z"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </>
);

export default PublishSatelliteSmSvg;
